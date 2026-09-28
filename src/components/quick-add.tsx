"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import type { Product } from "@/db/schema";

export function QuickAdd({ product, label = "Add to Bag" }: { product: Product; label?: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const v = product.variants[0];

  return (
    <button
      onClick={() => {
        add({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          size: v.size,
          price: v.price,
          qty: 1,
          image: product.imageUrl,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      className="w-full border border-white/15 py-2.5 text-[10px] uppercase tracking-[0.18em] text-ivory/80 transition hover:border-gold hover:bg-gold hover:text-ink"
    >
      {added ? "Added ✓" : label}
    </button>
  );
}
