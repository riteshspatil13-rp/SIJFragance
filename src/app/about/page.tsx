import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "The House",
  description:
    "SIJ Fragrances — an independent Indian perfume house crafting attars, extraits and everyday luxury in small batches from Kannauj naturals and Grasse-grade molecules.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:py-24">
      <p className="text-[10px] uppercase tracking-luxe text-gold">Est. 2019 · Pune, India</p>
      <h1 className="mt-5 font-display text-5xl font-light leading-tight lg:text-7xl">
        Scent, Intention,<br />
        <span className="gold-gradient italic">Journey.</span>
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/60">
        SIJ began in a two-room studio with a hot plate, forty vials and a stubborn conviction:
        Indians should not have to pay a 400% import markup to smell extraordinary. We source the
        same naturals that supply European houses — Kannauj mitti, Karnataka sandalwood, Taif rose
        — compose them here, and sell them to you directly.
      </p>

      <div className="mt-16 grid gap-px border hairline bg-white/10 sm:grid-cols-3">
        {[
          { k: "18–30%", v: "Oil concentration. Most drugstore EDPs sit at 8–12%." },
          { k: "60–90 days", v: "Maceration before a single bottle is filled." },
          { k: "0", v: "Middlemen, distributors, or celebrity endorsement fees." },
        ].map((s) => (
          <div key={s.k} className="bg-ink p-8">
            <p className="font-display text-4xl text-gold">{s.k}</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/50">{s.v}</p>
          </div>
        ))}
      </div>

      <section className="mt-20 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">What we believe</h2>
          <ul className="mt-6 space-y-5 text-sm leading-relaxed text-ivory/55">
            <li><span className="text-gold">Honesty over hype.</span> We publish concentration, sillage and longevity for every bottle. If a scent lasts four hours, we say four hours.</li>
            <li><span className="text-gold">Samples before bottles.</span> Nobody should spend ₹4,000 on a fragrance they have never smelled. Hence 2 ml, and hence the voucher.</li>
            <li><span className="text-gold">Built for this climate.</span> Formulas are heat-stress tested at 40°C and 70% humidity, because a Parisian formula often collapses in a Chennai June.</li>
            <li><span className="text-gold">Kind by default.</span> Cruelty-free, IFRA-compliant, no animal-derived musks, recyclable outer cartons.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl">The three tiers</h2>
          <div className="mt-6 space-y-6">
            {[
              { t: "Signature Niche", d: "Our artistic line. Rare naturals, 25–30% extraits, long maceration. ₹2,500 – ₹6,500." },
              { t: "Attars & Concentrates", d: "Alcohol-free oils distilled in Kannauj. Roll-ons and 8–12 ml flacons. ₹499 – ₹1,700." },
              { t: "Budget-Luxury", d: "Designer-inspired profiles at honest prices, same oil quality. ₹490 – ₹2,990." },
            ].map((t) => (
              <div key={t.t} className="border-l border-gold/30 pl-5">
                <h3 className="font-display text-2xl">{t.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/50">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-20 border hairline p-10 text-center">
        <h2 className="font-display text-4xl font-light">Come smell for yourself</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-ivory/50">
          Our scent bar in {site.addressLine2.split(",")[1]?.trim() ?? "Pune"} is open seven days a
          week. Blind-smell the full range against designer references, no appointment needed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-full bg-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink">
            Visit the scent bar
          </Link>
          <Link href="/shop" className="rounded-full border border-white/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.18em]">
            Shop the collection
          </Link>
        </div>
      </div>
    </div>
  );
}
