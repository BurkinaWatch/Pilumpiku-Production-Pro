import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const siteSettingsTable = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  heroBadge: text("hero_badge").notNull().default(""),
  heroTitleLine1: text("hero_title_line1").notNull().default(""),
  heroTitleLine2: text("hero_title_line2").notNull().default(""),
  heroSubtitle: text("hero_subtitle").notNull().default(""),
  quoteText: text("quote_text").notNull().default(""),
  quoteAuthor: text("quote_author").notNull().default(""),
  statsProjets: text("stats_projets").notNull().default("8+"),
  statsPays: text("stats_pays").notNull().default("12+"),
  statsFestivals: text("stats_festivals").notNull().default("5+"),
  aboutHistoire: text("about_histoire").notNull().default(""),
  aboutVision: text("about_vision").notNull().default(""),
  founderName: text("founder_name").notNull().default(""),
  founderTitle: text("founder_title").notNull().default(""),
  founderBio: text("founder_bio").notNull().default(""),
  founderImage: text("founder_image").notNull().default(""),
  contactEmail: text("contact_email").notNull().default(""),
  contactPhone: text("contact_phone").notNull().default(""),
  contactAddress: text("contact_address").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type SiteSettings = typeof siteSettingsTable.$inferSelect;
export type InsertSiteSettings = typeof siteSettingsTable.$inferInsert;
