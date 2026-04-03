import Link from "next/link";
import { ArrowRight, BookOpen, Lock, Star, Zap } from "lucide-react";
import { scripts } from "@/data/scripts";
import { ScriptCard } from "@/components/ScriptCard";

const freeScripts = scripts.filter((s) => !s.isPremium).slice(0, 3);

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-950 text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/40 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Zap className="h-3.5 w-3.5" />
            Exact words. Real situations. No fluff.
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
            Stop winging it.<br />
            <span className="text-emerald-400">Use the script.</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            A library of word-for-word parenting scripts for the moments when you
            don&apos;t know what to say — meltdowns, bedtime battles, screen time
            fights, difficult conversations, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/library"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Browse free scripts <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              See Pro plan
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-b border-slate-100 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>4.8 average rating</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-slate-400" />
            <span>10 situations covered</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-slate-400" />
            <span>Free scripts, no account needed</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-4">How it works</h2>
          <p className="text-center text-slate-500 mb-14 max-w-xl mx-auto">
            Each script is structured around a real situation — not generic advice.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Find your situation",
                desc: "Search by situation, age group, or category. Each script maps to a specific moment — not a vague theme.",
              },
              {
                step: "02",
                title: "Read the exact script",
                desc: "Word-for-word dialogue with notes on tone, timing, and why each step works. No interpretation needed.",
              },
              {
                step: "03",
                title: "Understand why it works",
                desc: "Every script includes the psychology behind it and the most common mistake parents make in that moment.",
              },
            ].map((item) => (
              <div key={item.step} className="relative pl-14">
                <span className="absolute left-0 top-0 text-4xl font-black text-slate-100 leading-none select-none">
                  {item.step}
                </span>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free scripts preview */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Free scripts</h2>
              <p className="text-slate-500 mt-1 text-sm">No account required. Start here.</p>
            </div>
            <Link
              href="/library"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {freeScripts.map((script) => (
              <ScriptCard key={script.id} script={script} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/library" className="text-sm font-medium text-emerald-700">
              View all scripts →
            </Link>
          </div>
        </div>
      </section>

      {/* Pro CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto bg-slate-950 rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Unlock all scripts</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Pro gives you full access to every script — including the full
            step-by-step dialogue, notes, and the &quot;why it works&quot; breakdown.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              See pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-500 mt-4">Cancel anytime.</p>
        </div>
      </section>
    </div>
  );
}
