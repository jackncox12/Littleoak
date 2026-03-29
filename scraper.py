"""Business discovery and website scraping."""

import re
import time
import logging
import requests
import googlemaps
import tldextract
from bs4 import BeautifulSoup
from typing import Optional

logger = logging.getLogger(__name__)

# Known waste/recycling company names to detect current providers
WASTE_PROVIDERS = [
    "biffa", "veolia", "suez", "grundon", "ds smith", "waste management",
    "cleanaway", "republic services", "stericycle", "enviro", "skip",
    "waste king", "initial", "rentokil", "clearabee", "any junk",
    "countrystyle", "viridor", "severn trent", "bywaters", "paper round",
    "collection", "recycling", "rubbish", "disposal", "wheelie bin",
]

BUSINESS_TYPE_KEYWORDS = {
    "restaurant": ["restaurant", "cafe", "hotel", "hospitality", "food service", "bar", "pub"],
    "construction": ["construction", "builder", "contractor", "developer", "demolition"],
    "retail": ["retail", "shop", "store", "supermarket", "warehouse", "office"],
    "industrial": ["factory", "manufacturer", "industrial", "processing", "plant", "logistics"],
}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}


def search_businesses(
    api_key: str,
    query: str,
    location: str,
    radius_km: int = 10,
    max_results: int = 60,
) -> list[dict]:
    """Search for businesses using Google Places API."""
    gmaps = googlemaps.Client(key=api_key)

    # Geocode the location string to lat/lng
    geocode = gmaps.geocode(location)
    if not geocode:
        raise ValueError(f"Could not geocode location: {location}")

    lat_lng = geocode[0]["geometry"]["location"]
    logger.info(f"Searching '{query}' near {location} ({lat_lng}) within {radius_km}km")

    results = []
    next_page_token = None

    while len(results) < max_results:
        kwargs = {
            "query": query,
            "location": lat_lng,
            "radius": radius_km * 1000,
        }
        if next_page_token:
            kwargs["page_token"] = next_page_token
            time.sleep(2)  # Required delay before using page token

        response = gmaps.places(**kwargs)
        batch = response.get("results", [])
        results.extend(batch)

        next_page_token = response.get("next_page_token")
        if not next_page_token or len(results) >= max_results:
            break

    return results[:max_results]


def get_place_details(api_key: str, place_id: str) -> dict:
    """Fetch detailed info for a place including website, phone, opening hours."""
    gmaps = googlemaps.Client(key=api_key)
    fields = [
        "name", "formatted_address", "formatted_phone_number",
        "website", "business_status", "rating", "user_ratings_total",
        "types", "url",
    ]
    result = gmaps.place(place_id=place_id, fields=fields)
    return result.get("result", {})


def scrape_website(url: str, timeout: int = 10) -> dict:
    """
    Scrape a business website for contact info and waste provider clues.
    Returns dict with emails, phones, contact_names, waste_provider_hints.
    """
    data = {
        "emails": [],
        "phones": [],
        "contact_names": [],
        "waste_provider_hints": [],
        "linkedin_url": None,
    }

    try:
        resp = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        resp.raise_for_status()
    except requests.RequestException as e:
        logger.debug(f"Failed to fetch {url}: {e}")
        return data

    soup = BeautifulSoup(resp.text, "lxml")
    text = soup.get_text(separator=" ", strip=True).lower()
    full_text = soup.get_text(separator=" ", strip=True)

    # --- Emails ---
    email_pattern = r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
    raw_emails = re.findall(email_pattern, full_text)
    # Filter out common non-contact emails
    skip_domains = {"sentry.io", "example.com", "wixpress.com", "squarespace.com"}
    emails = [
        e.lower() for e in raw_emails
        if not any(d in e.lower() for d in skip_domains)
    ]
    data["emails"] = list(dict.fromkeys(emails))[:5]

    # --- Phone numbers (UK + international) ---
    phone_pattern = r"(?:\+44|0)[\s\-]?(?:\d[\s\-]?){9,11}"
    phones = re.findall(phone_pattern, full_text)
    data["phones"] = [re.sub(r"[\s\-]", "", p) for p in phones][:3]

    # --- LinkedIn ---
    for a in soup.find_all("a", href=True):
        if "linkedin.com/in/" in a["href"] or "linkedin.com/company/" in a["href"]:
            data["linkedin_url"] = a["href"].split("?")[0]
            break

    # --- Decision maker / contact names ---
    # Look for common title patterns near names
    title_pattern = r"(?:managing director|md|ceo|owner|director|manager|founder)[:\s]+([A-Z][a-z]+ [A-Z][a-z]+)"
    matches = re.findall(title_pattern, full_text, re.IGNORECASE)
    data["contact_names"] = list(dict.fromkeys(matches))[:3]

    # --- Waste provider hints ---
    hints = [p for p in WASTE_PROVIDERS if p in text]
    data["waste_provider_hints"] = hints[:5]

    return data


def estimate_company_size(details: dict) -> str:
    """Rough size estimate from ratings count and business type."""
    ratings = details.get("user_ratings_total", 0) or 0
    types = details.get("types", [])

    if any(t in types for t in ["lodging", "hospital", "university"]):
        return "Large"
    if ratings > 500:
        return "Medium-Large"
    if ratings > 100:
        return "Medium"
    if ratings > 20:
        return "Small-Medium"
    return "Small"


def build_prospect(api_key: str, place: dict, scrape: bool = True) -> dict:
    """Combine Places data + website scraping into a single prospect record."""
    place_id = place.get("place_id", "")
    details = get_place_details(api_key, place_id) if place_id else {}

    website = details.get("website", "")
    web_data = scrape_website(website) if (scrape and website) else {}

    return {
        "business_name": details.get("name") or place.get("name", ""),
        "address": details.get("formatted_address") or place.get("formatted_address", ""),
        "phone": details.get("formatted_phone_number") or (
            web_data.get("phones", [""])[0] if web_data.get("phones") else ""
        ),
        "website": website,
        "emails": "; ".join(web_data.get("emails", [])),
        "contact_name": "; ".join(web_data.get("contact_names", [])),
        "linkedin": web_data.get("linkedin_url") or "",
        "estimated_size": estimate_company_size(details),
        "google_rating": details.get("rating", ""),
        "rating_count": details.get("user_ratings_total", ""),
        "current_waste_provider_hints": "; ".join(web_data.get("waste_provider_hints", [])),
        "google_maps_url": details.get("url", ""),
        "business_types": "; ".join(details.get("types", [])),
        "status": details.get("business_status", ""),
    }
