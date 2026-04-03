import { notFound } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft, Star, Bookmark, AlertTriangle, CheckCircle } from "lucide-react";
import { scripts } from "@/data/scripts";
import { Badge } from "@/components/ui/badge";
import { FavouriteButton } from "@/components/FavouriteButton";
import { CopyButton } from "@/components/CopyButton";

export async function generateStaticParams() {
  return scripts.map((s) => ({ slug: s.slug }));
}

export default async function ScriptPage(props: PageProps<"/library/[slug]">) {
  const { slug } = await props.params;
  const script = scripts.find((s) => s.slug === slug);

  if (!script) notFound();

  // For MVP: free users see preview only, pro users see all
  // We'll treat everyone as free for now — Stripe integration unlocks this
  const isPro = false;
  const showFull = !script.isPremium || isPro;

  const categoryLabel: Record<string, string> = {
    meltdowns: "Meltdowns",
    bedtime: "Bedtime",
    "screen-time": "Screen time",
    discipline: "Discipline",
    emotions: "Big emotions",
    "sibling-conflict": "Sibling conflict",
    "morning-routine": "Morning routine",
    "difficult-conversations": "Difficult conversations",
    motivation: "Motivation",
    boundaries: "Boundaries",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Back */}
      <Link
        href="/library"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to library
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{categoryLabel[script.category] ?? script.category}</Badge>
          {script.ageGroups.map((age) => (
            <Badge key={age} variant="outline">{age}</Badge>
          ))}
          {script.isPremium && (
            <Badge variant="amber" className="flex items-center gap-1">
              <Lock className="h-3 w-3" /> Pro
            </Badge>
          )}
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3">{script.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-4">{script.summary}</p>

        <div className="flex items-center gap-4">
          {script.rating && (
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {script.rating}
            </div>
          )}
          {script.saves && (
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <Bookmark className="h-4 w-4" />
              {script.saves} saves
            </div>
          )}
          <FavouriteButton scriptId={script.id} />
        </div>
      </div>

      {/* Situation */}
      <div className="bg-slate-50 rounded-xl p-5 mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">The situation</p>
        <p className="text-slate-700">{script.situation}</p>
      </div>

      {/* Script steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-900">The Script</h2>
          {showFull && <CopyButton script={script} />}
        </div>

        <div className="space-y-4">
          {showFull ? (
            script.fullScript.map((step, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-5">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                  Step {i + 1} — {step.label}
                </p>
                <p className="text-slate-900 font-medium mb-2 text-[15px] leading-relaxed">
                  &ldquo;{step.say}&rdquo;
                </p>
                {step.note && (
                  <p className="text-sm text-slate-400 italic">{step.note}</p>
                )}
              </div>
            ))
          ) : (
            <>
              {/* Show preview steps */}
              {script.previewLines.map((line, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-5">
                  <p className="text-slate-700 text-sm leading-relaxed">{line}</p>
                </div>
              ))}

              {/* Paywall */}
              <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                <div className="absolute inset-0 rounded-xl bg-white/80 backdrop-blur-[2px]" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-4">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="font-semibold text-slate-900 mb-1">
                    {script.fullScript.length - script.previewLines.length} more steps locked
                  </p>
                  <p className="text-sm text-slate-500 mb-6">
                    Unlock the full script, including the &ldquo;why it works&rdquo; breakdown.
                  </p>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
                  >
                    <Lock className="h-4 w-4" /> Unlock with Pro
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Why it works + Common mistake — locked for premium */}
      {showFull && (
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <p className="text-sm font-semibold text-emerald-800">Why it works</p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{script.whyItWorks}</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <p className="text-sm font-semibold text-amber-800">Common mistake</p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{script.commonMistake}</p>
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {script.tags.map((tag) => (
          <span key={tag} className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
