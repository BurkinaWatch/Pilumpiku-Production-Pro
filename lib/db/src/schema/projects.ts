import { pgTable, serial, text, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titre: text("titre").notNull(),
  categorie: text("categorie").notNull(),
  statut: text("statut").notNull(),
  annee: integer("annee").notNull(),
  duree: text("duree").notNull(),
  langue: text("langue").notNull(),
  synopsis: text("synopsis").notNull(),
  intention: text("intention").notNull(),
  image: text("image").notNull(),
  galerie: json("galerie").$type<string[]>(),
  sortOrder: integer("sort_order").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type Project = typeof projectsTable.$inferSelect;
export type InsertProject = typeof projectsTable.$inferInsert;
