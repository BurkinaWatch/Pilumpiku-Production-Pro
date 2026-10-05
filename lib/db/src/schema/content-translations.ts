import { jsonb, pgTable, serial, text, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const contentTranslationsTable = pgTable(
  "content_translations",
  {
    id: serial("id").primaryKey(),
    entityType: text("entity_type").notNull(),
    entityId: integer("entity_id").notNull(),
    locale: text("locale").notNull(),
    fields: jsonb("fields").$type<Record<string, string>>().notNull().default({}),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("content_translations_entity_locale_unique").on(
      table.entityType,
      table.entityId,
      table.locale,
    ),
  ],
);

export type ContentTranslation = typeof contentTranslationsTable.$inferSelect;
