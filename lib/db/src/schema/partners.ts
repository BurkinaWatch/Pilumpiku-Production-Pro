import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const partnersTable = pgTable("partners", {
  id: serial("id").primaryKey(),
  nom: text("nom").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Partner = typeof partnersTable.$inferSelect;
export type InsertPartner = typeof partnersTable.$inferInsert;
