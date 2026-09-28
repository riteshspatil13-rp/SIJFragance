import Link from "next/link";
import { inr, site, waLink } from "@/lib/site";

export const metadata = {
  title: "FAQ, Shipping & Returns",
  description:
    "Shipping timelines, COD, returns, authenticity, attar care and everything else about ordering from SIJ Fragrances in India.",
};

const groups = [
  {
    title: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Dispatch within 24 hours of order confirmation. Metro cities 2–3 working days, rest of India 4–6 working days. You get a tracking link on WhatsApp the moment it ships." },
      { q: "Is shipping free?", a: `Free on all orders above ${inr(site.freeShipAbove)}. Below that a flat ${inr(site.shippingFee)} applies. Pickup orders at our Pune scent bar are always free.` },
      { q: "Do you offer cash on delivery?", a: "Yes, COD is available across India with no extra fee. For orders above ₹5,000 we place a quick verification call before dispatch." },
      { q: "Can I collect in person?", a: `Absolutely. Choose "Pickup at scent bar" at checkout. Your order is ready in two hours at ${site.addressLine1}.` },
    ],
  },
  {
    title: "Product & Wear",
    items: [
      { q: "What is the difference between attar and EDP?", a: "Attars are alcohol-free perfume oils — they sit closer to the skin, last much longer and are flight-friendly. EDPs use an alcohol base, so they project further and open faster." },
      { q: "How long will a 50 ml bottle last?", a: "At four sprays per day, roughly 200 wears — about six to seven months of daily use." },
      { q: "Will it survive Indian summers?", a: "Every formula is heat-stress tested at 40°C and 70% humidity. For peak summer we recommend the Citrus Aromatic and Aquatic families." },
      { q: "How should I store my bottles?", a: "Upright, away from sunlight, ideally below 25°C. Never store in a bathroom or a car. Attars actually improve with age when stored correctly." },
    ],
  },
  {
    title: "Returns & Trust",
    items: [
      { q: "What is your return policy?", a: "Unopened, sealed bottles can be returned within 7 days of delivery for a full refund. Opened bottles cannot be returned for hygiene reasons — which is exactly why we sell 2 ml samples." },
      { q: "Are your fragrances original or dupes?", a: "Our Signature Niche and Attar lines are original compositions. Our Budget-Luxury line is openly inspired by popular profiles — we never claim to be another brand, and we never counterfeit packaging." },
      { q: "Are they safe and tested?", a: "IFRA-compliant, dermatologically tested, cruelty-free, and free of animal-derived musks. Full ingredient lists are printed on every carton." },
      { q: "Do you provide GST invoices?", a: "Yes. Add your GSTIN in the order notes at checkout and we will email a compliant invoice within 24 hours." },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:py-24">
      <p className="text-[10px] uppercase tracking-luxe text-gold">Everything you asked</p>
      <h1 className="mt-5 font-display text-5xl font-light lg:text-6xl">FAQ, Shipping & Returns</h1>

      <div className="mt-14 space-y-14">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="font-display text-3xl">{g.title}</h2>
            <div className="mt-6">
              {g.items.map((item) => (
                <details key={item.q} className="group border-b hairline py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm text-ivory/85">
                    {item.q}
                    <span className="text-gold transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-ivory/50">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 border hairline p-10 text-center">
        <h2 className="font-display text-3xl">Still unsure?</h2>
        <p className="mt-3 text-sm text-ivory/50">
          Ask our consultant directly — most questions are answered within five minutes.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <a
            href={waLink("Hi SIJ Fragrances! I have a question: ")}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#1fa855] px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white"
          >
            WhatsApp {site.phoneDisplay}
          </a>
          <Link href="/discovery" className="rounded-full border border-white/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.18em]">
            Try the discovery set
          </Link>
        </div>
      </div>
    </div>
  );
}
