export const site = {
  name: "SIJ Fragrances",
  legal: "SIJ Fragrances Pvt. Ltd.",
  tagline: "Scent, Intention, Journey.",
  phoneDisplay: "+91 98501 38874",
  phoneRaw: "9850138874",
  whatsapp: "919850138874",
  email: "care@sijfragrances.in",
  addressLine1: "SIJ Atelier & Scent Bar, Shop 14, Koregaon Park Plaza",
  addressLine2: "North Main Road, Pune, Maharashtra 411001",
  hours: "Mon – Sun · 11:00 AM – 9:00 PM",
  freeShipAbove: 999,
  shippingFee: 79,
  codFee: 0,
  giftWrapFee: 99,
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function inr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
