#!/usr/bin/env python3
"""
Littleoak Prospector — Find and enrich waste management leads.

Usage examples:
  python main.py search --query "restaurants" --location "Manchester, UK" --radius 10
  python main.py search --query "construction companies" --location "Birmingham, UK" --max 40
  python main.py search --query "industrial manufacturers" --location "Leeds, UK" --no-scrape
"""

import os
import sys
import logging
import click
from dotenv import load_dotenv

from scraper import search_businesses, build_prospect, BUSINESS_TYPE_KEYWORDS
from exporter import export

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)


@click.group()
def cli():
    """Littleoak Prospector — waste industry lead generation tool."""
    pass


@cli.command()
@click.option("--query", "-q", required=True, help='Search query e.g. "restaurants" or "construction companies"')
@click.option("--location", "-l", required=True, help='Location e.g. "Manchester, UK" or "SW1A 1AA"')
@click.option("--radius", "-r", default=10, show_default=True, help="Search radius in km")
@click.option("--max", "max_results", default=40, show_default=True, help="Max number of prospects to fetch")
@click.option("--output", "-o", default="output", show_default=True, help="Output directory for exports")
@click.option("--no-scrape", is_flag=True, default=False, help="Skip website scraping (faster, less data)")
@click.option("--api-key", envvar="GOOGLE_PLACES_API_KEY", help="Google Places API key (or set GOOGLE_PLACES_API_KEY env var)")
def search(query, location, radius, max_results, output, no_scrape, api_key):
    """Search for businesses and export as a prospect list."""
    if not api_key:
        click.echo(
            "ERROR: Google Places API key required.\n"
            "Set GOOGLE_PLACES_API_KEY in your .env file or pass --api-key.",
            err=True,
        )
        sys.exit(1)

    click.echo(f"\nSearching for: '{query}' near {location} (radius: {radius}km, max: {max_results})")
    click.echo("=" * 60)

    try:
        places = search_businesses(api_key, query, location, radius, max_results)
    except Exception as e:
        click.echo(f"ERROR during search: {e}", err=True)
        sys.exit(1)

    if not places:
        click.echo("No businesses found. Try a broader query or larger radius.")
        return

    click.echo(f"Found {len(places)} businesses. Enriching data...")
    if not no_scrape:
        click.echo("(Website scraping enabled — this may take a few minutes)")

    prospects = []
    with click.progressbar(places, label="Processing") as bar:
        for place in bar:
            try:
                prospect = build_prospect(api_key, place, scrape=not no_scrape)
                prospects.append(prospect)
            except Exception as e:
                name = place.get("name", "unknown")
                logger.debug(f"Skipped {name}: {e}")

    if not prospects:
        click.echo("No prospects could be built from results.")
        return

    # Sanitise query for filename
    safe_query = query.replace(" ", "_").replace("/", "-")[:30]
    safe_location = location.split(",")[0].strip().replace(" ", "_")[:20]
    prefix = f"{safe_query}_{safe_location}"

    try:
        paths = export(prospects, output_dir=output, prefix=prefix)
    except Exception as e:
        click.echo(f"ERROR during export: {e}", err=True)
        sys.exit(1)

    click.echo(f"\nDone! Exported {len(prospects)} prospects:")
    click.echo(f"  Excel: {paths['excel']}")
    click.echo(f"  CSV:   {paths['csv']}")


@cli.command()
def types():
    """List available business type keywords."""
    click.echo("\nBusiness type keyword groups:\n")
    for category, keywords in BUSINESS_TYPE_KEYWORDS.items():
        click.echo(f"  {category.upper()}")
        click.echo(f"    Keywords: {', '.join(keywords)}\n")


if __name__ == "__main__":
    cli()
