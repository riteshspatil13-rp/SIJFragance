import { NewsletterForm } from "@/components/newsletter-form";
import { site, waLink } from "@/lib/site";

export const metadata = {
  title: "Scent Bar & Contact",
  description:
    "Visit the SIJ Fragrances scent bar in Pune, reserve online for 2-hour pickup, or order on WhatsApp at +91 98501 38874.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-[10px] uppercase tracking-luxe text-gold">We reply in minutes</p>
      <h1 className="mt-5 font-display text-5xl font-light lg:text-6xl">Talk to a human</h1>

      <div className="mt-14 grid gap-10 lg:grid-cols-3">
        {[
          {
            t: "WhatsApp ordering",
            d: "Send a screenshot, a bottle you love, or just a mood. We shortlist, confirm stock and take the order in chat — COD included.",
            cta: "Message us",
            href: waLink("Hi SIJ Fragrances! I'd like help with an order."),
            accent: true,
          },
          {
            t: "Call the atelier",
            d: `${site.phoneDisplay} · ${site.hours}. Best for bulk, corporate gifting and wedding favour enquiries.`,
            cta: "Call now",
            href: `tel:+91${site.phoneRaw}`,
          },
          {
            t: "Email",
            d: `${site.email} — for returns, invoices, GST bills, press and stockist enquiries. Replies within one working day.`,
            cta: "Write to us",
            href: `mailto:${site.email}`,
          },
        ].map((c) => (
          <div key={c.t} className={`border p-8 ${c.accent ? "border-[#1fa855]/50 bg-[#1fa855]/5" : "hairline border"}`}>
            <h2 className="font-display text-2xl">{c.t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ivory/55">{c.d}</p>
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className={`mt-6 inline-block rounded-full px-7 py-3 text-[11px] uppercase tracking-[0.18em] ${
                c.accent ? "bg-[#1fa855] text-white" : "border border-white/25 text-ivory hover:border-gold hover:text-gold"
              }`}
            >
              {c.cta}
            </a>
          </div>
        ))}
      </div>

      <section className="mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-light">The Scent Bar</h2>
          <p className="mt-4 text-sm leading-relaxed text-ivory/55">
            Twelve seats, forty open bottles, and a consultant who will not let you buy the wrong
            thing. Test on skin, compare against designer references, and take your bottle home the
            same day. Online orders marked &quot;pickup&quot; are ready in two hours.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex justify-between border-b hairline pb-3">
              <dt className="text-ivory/40">Address</dt>
              <dd className="max-w-xs text-right text-ivory/85">{site.addressLine1}, {site.addressLine2}</dd>
            </div>
            <div className="flex justify-between border-b hairline pb-3">
              <dt className="text-ivory/40">Hours</dt><dd className="text-ivory/85">{site.hours}</dd>
            </div>
            <div className="flex justify-between border-b hairline pb-3">
              <dt className="text-ivory/40">Phone</dt><dd className="text-ivory/85">{site.phoneDisplay}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ivory/40">Parking</dt><dd className="text-ivory/85">Basement, validated 1 hr</dd>
            </div>
          </dl>
        </div>

        <div className="relative min-h-[320px] overflow-hidden border hairline">
          <iframe
            title="SIJ Fragrances scent bar location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.86%2C18.52%2C73.92%2C18.56&layer=mapnik"
            className="h-full w-full grayscale"
            loading="lazy"
          />
        </div>
      </section>

      <section className="mt-20 border hairline p-10">
        <h2 className="font-display text-3xl">Corporate & wedding gifting</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/55">
          Custom labels, sleeve branding and bulk pricing from 50 units. Popular for wedding favours
          (8 ml attars), Diwali hampers and client gifting. Share your budget and quantity on
          WhatsApp for a quote within 24 hours.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <a
            href={waLink("Hi SIJ Fragrances! I'd like a bulk/corporate gifting quote. Quantity: , Budget per unit: ")}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink"
          >
            Request a quote
          </a>
        </div>
      </section>

      <section className="mt-20 max-w-md">
        <h2 className="font-display text-3xl">The Olfactive Letter</h2>
        <p className="mt-3 text-sm text-ivory/50">
          Restocks, new harvests and 10% off your first order.
        </p>
        <NewsletterForm source="contact" />
      </section>
    </div>
  );
}
