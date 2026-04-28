import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const servicesTable = pgTable("services", {
  id: serial("id").primaryKey(),
  titre: text("titre").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Service = typeof servicesTable.$inferSelect;
export type InsertService = typeof servicesTable.$inferInsert;
