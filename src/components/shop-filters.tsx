"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Facets = {
  families: string[];
  genders: string[];
  collections: string[];
  moods: string[];
};

export function ShopFilters({ facets, total }: { facets: Facets; total: number }) {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (!value || value === "All") next.delete(key);
      else next.set(key, value);
      router.push(`/shop?${next.toString()}`, { scroll: false });
    },
    [params, router],
  );

  const groups: { key: string; label: string; options: string[] }[] = [
    { key: "collection", label: "Collection", options: facets.collections },
    { key: "family", label: "Family", options: facets.families },
    { key: "gender", label: "Wear", options: facets.genders },
    { key: "mood", label: "Mood", options: facets.moods },
  ];

  const active = groups
    .map((g) => ({ key: g.key, value: params.get(g.key) }))
    .filter((x) => x.value);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        {groups.map((g) => (
          <label key={g.key} className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-[0.18em] text-ivory/40">{g.label}</span>
            <select
              value={params.get(g.key) ?? "All"}
              onChange={(e) => update(g.key, e.target.value)}
              className="min-w-[150px] border hairline bg-transparent px-3 py-2.5 text-xs uppercase tracking-[0.12em] text-ivory/80 focus:border-gold focus:outline-none"
            >
              <option value="All" className="bg-ink">All</option>
              {g.options.map((o) => (
                <option key={o} value={o} className="bg-ink">
                  {o}
                </option>
              ))}
            </select>
          </label>
        ))}

        <label className="flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-[0.18em] text-ivory/40">Budget from</span>
          <select
            value={params.get("max") ?? "All"}
            onChange={(e) => update("max", e.target.value)}
            className="min-w-[150px] border hairline bg-transparent px-3 py-2.5 text-xs uppercase tracking-[0.12em] text-ivory/80 focus:border-gold focus:outline-none"
          >
            <option value="All" className="bg-ink">Any price</option>
            <option value="600" className="bg-ink">Under ₹600</option>
            <option value="1000" className="bg-ink">Under ₹1,000</option>
            <option value="1500" className="bg-ink">Under ₹1,500</option>
          </select>
        </label>

        <label className="ml-auto flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-[0.18em] text-ivory/40">Sort</span>
          <select
            value={params.get("sort") ?? "featured"}
            onChange={(e) => update("sort", e.target.value)}
            className="min-w-[150px] border hairline bg-transparent px-3 py-2.5 text-xs uppercase tracking-[0.12em] text-ivory/80 focus:border-gold focus:outline-none"
          >
            <option value="featured" className="bg-ink">Featured</option>
            <option value="price-asc" className="bg-ink">Price: low to high</option>
            <option value="price-desc" className="bg-ink">Price: high to low</option>
            <option value="rating" className="bg-ink">Top rated</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t hairline pt-5">
        <span className="text-[10px] uppercase tracking-[0.16em] text-ivory/40">
          {total} fragrance{total === 1 ? "" : "s"}
        </span>
        {active.map((a) => (
          <button
            key={a.key}
            onClick={() => update(a.key, "All")}
            className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-champagne hover:bg-gold hover:text-ink"
          >
            {a.value} ✕
          </button>
        ))}
        {active.length > 0 && (
          <button
            onClick={() => router.push("/shop", { scroll: false })}
            className="text-[10px] uppercase tracking-[0.14em] text-ivory/40 hover:text-gold"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
