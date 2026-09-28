export function Meter({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.16em] text-ivory/50">{label}</span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-champagne/70">{hint}</span>
      </div>
      <div className="mt-2 flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 ${i <= value ? "bg-gold" : "bg-white/12"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ScentPyramid({
  top,
  heart,
  base,
}: {
  top: string[];
  heart: string[];
  base: string[];
}) {
  const rows = [
    { label: "Top — first 15 minutes", notes: top },
    { label: "Heart — hours 1 to 4", notes: heart },
    { label: "Base — the trail it leaves", notes: base },
  ];
  return (
    <div className="space-y-6">
      {rows.map((r) => (
        <div key={r.label} className="border-l border-gold/30 pl-5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-gold/80">{r.label}</p>
          <p className="mt-2 font-display text-2xl font-light text-ivory/90">
            {r.notes.join(" · ")}
          </p>
        </div>
      ))}
    </div>
  );
}
