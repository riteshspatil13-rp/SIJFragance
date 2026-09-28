import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 text-center">
      <p className="text-[10px] uppercase tracking-luxe text-gold">404</p>
      <h1 className="mt-5 font-display text-5xl font-light">This scent has evaporated.</h1>
      <p className="mt-4 text-sm text-ivory/50">
        The page you are looking for is no longer here — but the collection still is.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link href="/shop" className="rounded-full bg-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink">
          Shop fragrances
        </Link>
        <Link href="/scent-finder" className="rounded-full border border-white/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.18em]">
          Take the scent finder
        </Link>
      </div>
    </div>
  );
}
