import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export type Variant = {
  size: string;
  ml: number;
  price: number;
  mrp: number;
  sku: string;
};

export type OrderItem = {
  productId: number;
  slug: string;
  name: string;
  size: string;
  price: number;
  qty: number;
  image: string;
};

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  tagline: text("tagline").notNull(),
  collection: varchar("collection", { length: 60 }).notNull(),
  family: varchar("family", { length: 60 }).notNull(),
  gender: varchar("gender", { length: 30 }).notNull(),
  concentration: varchar("concentration", { length: 60 }).notNull(),
  description: text("description").notNull(),
  story: text("story").notNull(),
  topNotes: text("top_notes").array().notNull(),
  heartNotes: text("heart_notes").array().notNull(),
  baseNotes: text("base_notes").array().notNull(),
  moods: text("moods").array().notNull(),
  occasions: text("occasions").array().notNull(),
  sillage: integer("sillage").notNull(),
  longevity: integer("longevity").notNull(),
  intensity: integer("intensity").notNull(),
  variants: jsonb("variants").$type<Variant[]>().notNull(),
  imageUrl: text("image_url").notNull(),
  imageAlt: text("image_alt").notNull(),
  badge: varchar("badge", { length: 40 }),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull(),
  bestseller: boolean("bestseller").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  inStock: boolean("in_stock").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderCode: varchar("order_code", { length: 24 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 24 }).notNull(),
  email: varchar("email", { length: 160 }),
  fulfillment: varchar("fulfillment", { length: 20 }).notNull(),
  address: text("address"),
  city: varchar("city", { length: 80 }),
  state: varchar("state", { length: 80 }),
  pincode: varchar("pincode", { length: 12 }),
  paymentMethod: varchar("payment_method", { length: 24 }).notNull(),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  subtotal: integer("subtotal").notNull(),
  shipping: integer("shipping").notNull().default(0),
  discount: integer("discount").notNull().default(0),
  total: integer("total").notNull(),
  giftWrap: boolean("gift_wrap").notNull().default(false),
  notes: text("notes"),
  status: varchar("status", { length: 30 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  source: varchar("source", { length: 60 }).notNull().default("footer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  answers: jsonb("answers").$type<Record<string, string>>().notNull(),
  recommendedSlugs: text("recommended_slugs").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
