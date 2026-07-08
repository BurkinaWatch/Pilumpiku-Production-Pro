import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const inscriptionsTable = pgTable("inscriptions", {
  id: serial("id").primaryKey(),
  service: text("service").notNull(),
  nom: text("nom").notNull(),
  email: text("email").notNull(),
  telephone: text("telephone"),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Inscription = typeof inscriptionsTable.$inferSelect;
export type InsertInscription = typeof inscriptionsTable.$inferInsert;
