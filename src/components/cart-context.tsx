"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/lib/site";

export type CartLine = {
  productId: number;
  slug: string;
  name: string;
  size: string;
  price: number;
  qty: number;
  image: string;
};

type CartContextValue = {
  lines: CartLine[];
  add: (line: CartLine) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sij-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.slug === line.slug && l.size === line.size);
      if (idx === -1) return [...prev, line];
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
      return next;
    });
    setDrawerOpen(true);
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= site.freeShipAbove ? 0 : site.shippingFee;
    return {
      lines,
      add,
      remove,
      setQty,
      clear,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      drawerOpen,
      setDrawerOpen,
      ready,
    };
  }, [lines, add, remove, setQty, clear, drawerOpen, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
