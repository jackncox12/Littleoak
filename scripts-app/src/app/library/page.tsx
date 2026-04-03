"use client";

import { useState, useMemo } from "react";
import { scripts, categories, ageGroups } from "@/data/scripts";
import { ScriptCard } from "@/components/ScriptCard";
import { ScriptFilters } from "@/components/ScriptFilters";
import { useFavourites } from "@/hooks/useFavourites";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [age, setAge] = useState("all");
  const { favourites, toggle } = useFavourites();

  const filtered = useMemo(() => {
    return scripts.filter((s) => {
      const matchesCategory = category === "all" || s.category === category;
      const matchesAge = age === "all" || s.ageGroups.includes(age as any);
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some((t) => t.includes(q));
      return matchesCategory && matchesAge && matchesSearch;
    });
  }, [search, category, age]);

  const freeCount = filtered.filter((s) => !s.isPremium).length;
  const proCount = filtered.filter((s) => s.isPremium).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Script Library</h1>
        <p className="text-slate-500">
          {freeCount} free · {proCount} Pro — word-for-word scripts for real parenting moments.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-10">
        <ScriptFilters
          search={search}
          category={category}
          age={age}
          onSearch={setSearch}
          onCategory={setCategory}
          onAge={setAge}
        />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium mb-2">No scripts match that search.</p>
          <p className="text-sm">Try a different category or clear the filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((script) => (
            <ScriptCard
              key={script.id}
              script={script}
              isFavourited={favourites.includes(script.id)}
              onToggleFavourite={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
