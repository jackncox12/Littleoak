"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { scripts } from "@/data/scripts";
import { ScriptCard } from "@/components/ScriptCard";
import { useFavourites } from "@/hooks/useFavourites";

export default function FavouritesPage() {
  const { favourites, toggle } = useFavourites();
  const saved = scripts.filter((s) => favourites.includes(s.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Saved Scripts</h1>
        <p className="text-slate-500">
          {saved.length > 0
            ? `${saved.length} script${saved.length === 1 ? "" : "s"} saved`
            : "Scripts you save will appear here."}
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="text-center py-24">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
            <Bookmark className="h-7 w-7 text-slate-300" />
          </div>
          <p className="text-slate-500 mb-6">
            You haven&apos;t saved any scripts yet. Browse the library and hit the bookmark icon.
          </p>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors text-sm"
          >
            Browse scripts
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saved.map((script) => (
            <ScriptCard
              key={script.id}
              script={script}
              isFavourited={true}
              onToggleFavourite={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
