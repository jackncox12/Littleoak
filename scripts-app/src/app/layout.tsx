import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parent by Design — Parenting Script Library",
  description:
    "Exact scripts and frameworks for the hardest parenting moments. Meltdowns, bedtime, screen time, difficult conversations — structured, tested, and ready to use.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-slate-900" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold text-slate-900 tracking-tight">
              Parent by Design
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/library" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Scripts
              </Link>
              <Link href="/favourites" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Saved
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium bg-emerald-600 text-white px-3.5 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Go Pro
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-100 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <span>© 2025 Parent by Design</span>
            <div className="flex gap-6">
              <Link href="/library" className="hover:text-slate-600 transition-colors">Scripts</Link>
              <Link href="/pricing" className="hover:text-slate-600 transition-colors">Pricing</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
