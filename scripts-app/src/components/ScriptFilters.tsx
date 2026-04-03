"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { categories, ageGroups } from "@/data/scripts";

interface ScriptFiltersProps {
  search: string;
  category: string;
  age: string;
  onSearch: (v: string) => void;
  onCategory: (v: string) => void;
  onAge: (v: string) => void;
}

export function ScriptFilters({ search, category, age, onSearch, onCategory, onAge }: ScriptFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search scripts..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => onCategory(c.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              category === c.value
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Age pills */}
      <div className="flex flex-wrap gap-2">
        {ageGroups.map((a) => (
          <button
            key={a.value}
            onClick={() => onAge(a.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm transition-colors border",
              age === a.value
                ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                : "border-slate-200 text-slate-500 hover:border-slate-300"
            )}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
