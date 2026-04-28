import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const newsTable = pgTable("news", {
  id: serial("id").primaryKey(),
  titre: text("titre").notNull(),
  categorie: text("categorie").notNull(),
  dateLabel: text("date_label").notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type NewsArticle = typeof newsTable.$inferSelect;
export type InsertNewsArticle = typeof newsTable.$inferInsert;
