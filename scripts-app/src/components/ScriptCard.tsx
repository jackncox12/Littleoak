"use client";

import Link from "next/link";
import { Lock, Star, Bookmark, BookmarkCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Script } from "@/data/types";
import { cn } from "@/lib/utils";

interface ScriptCardProps {
  script: Script;
  isFavourited?: boolean;
  onToggleFavourite?: (id: string) => void;
}

const categoryLabels: Record<string, string> = {
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

export function ScriptCard({ script, isFavourited, onToggleFavourite }: ScriptCardProps) {
  return (
    <div className="group relative flex flex-col bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary">{categoryLabels[script.category] ?? script.category}</Badge>
          {script.ageGroups.map((age) => (
            <Badge key={age} variant="outline">{age}</Badge>
          ))}
          {script.isPremium && (
            <Badge variant="amber" className="flex items-center gap-1">
              <Lock className="h-3 w-3" /> Pro
            </Badge>
          )}
        </div>

        {onToggleFavourite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavourite(script.id);
            }}
            className="text-slate-300 hover:text-emerald-600 transition-colors shrink-0"
            aria-label={isFavourited ? "Remove from favourites" : "Save to favourites"}
          >
            {isFavourited
              ? <BookmarkCheck className="h-5 w-5 text-emerald-600" />
              : <Bookmark className="h-5 w-5" />
            }
          </button>
        )}
      </div>

      {/* Content */}
      <Link href={`/library/${script.slug}`} className="flex-1">
        <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
          {script.title}
        </h3>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">{script.summary}</p>

        {/* Preview lines */}
        <div className="space-y-1.5">
          {script.previewLines.map((line, i) => (
            <p key={i} className="text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2 leading-relaxed">
              {line}
            </p>
          ))}
          {script.isPremium && (
            <div className="flex items-center gap-2 text-xs text-slate-400 px-3 py-2">
              <Lock className="h-3 w-3" />
              <span>{script.fullScript.length - 2} more steps — unlock with Pro</span>
            </div>
          )}
        </div>
      </Link>

      {/* Footer */}
      {(script.rating || script.saves) && (
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
          {script.rating && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{script.rating}</span>
            </div>
          )}
          {script.saves && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Bookmark className="h-3.5 w-3.5" />
              <span>{script.saves} saves</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
