"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useFavourites } from "@/hooks/useFavourites";

export function FavouriteButton({ scriptId }: { scriptId: string }) {
  const { favourites, toggle } = useFavourites();
  const isFavourited = favourites.includes(scriptId);

  return (
    <button
      onClick={() => toggle(scriptId)}
      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-600 transition-colors"
    >
      {isFavourited ? (
        <>
          <BookmarkCheck className="h-4 w-4 text-emerald-600" />
          <span className="text-emerald-600">Saved</span>
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" />
          <span>Save</span>
        </>
      )}
    </button>
  );
}
