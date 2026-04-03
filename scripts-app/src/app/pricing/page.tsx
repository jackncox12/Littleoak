import Link from "next/link";
import { Check, Lock } from "lucide-react";

const FREE_FEATURES = [
  "2 free scripts (fully unlocked)",
  "Preview first 2 steps of all scripts",
  "Search & filter by age / situation",
  "Save favourites (local)",
];

const PRO_FEATURES = [
  "Every script — fully unlocked",
  "Word-for-word dialogue for every step",
  '"Why it works" breakdown for each script',
  '"Common mistake" for each script',
  "Copy to clipboard for any script",
  "New scripts added monthly",
  "Cancel anytime",
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Simple pricing</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Free to start. Upgrade when you want full access to every script.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Free */}
        <div className="border border-slate-200 rounded-2xl p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-500 mb-1">Free</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900">£0</span>
              <span className="text-slate-400">/month</span>
            </div>
          </div>
          <Link
            href="/library"
            className="block w-full text-center font-medium border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl transition-colors text-sm mb-8"
          >
            Browse free scripts
          </Link>
          <ul className="space-y-3">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                <Check className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="border-2 border-emerald-600 rounded-2xl p-8 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most popular
            </span>
          </div>
          <div className="mb-6">
            <p className="text-sm font-semibold text-emerald-700 mb-1">Pro</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900">£7</span>
              <span className="text-slate-400">/month</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">or £59/year (save 30%)</p>
          </div>
          <form action="/api/checkout" method="POST">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm mb-8 flex items-center justify-center gap-2"
            >
              <Lock className="h-4 w-4" /> Get Pro access
            </button>
          </form>
          <ul className="space-y-3">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-sm text-slate-400 mt-10">
        Payments secured by Stripe. Cancel from your account at any time.
      </p>
    </div>
  );
}
