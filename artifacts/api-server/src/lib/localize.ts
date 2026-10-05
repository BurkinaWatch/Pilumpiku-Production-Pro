import { and, eq, inArray } from "drizzle-orm";
import { contentTranslationsTable, db } from "@workspace/db";
import type { Request } from "express";

const SUPPORTED_LOCALES = new Set([
  "fr",
  "en",
  "es",
  "pt",
  "de",
  "zh-CN",
  "mos",
  "dyu",
  "ff",
]);

export function requestLocale(req: Request): string {
  const requested = req.get("accept-language")?.split(",")[0]?.trim();
  if (!requested) return "fr";
  const locale = requested.toLowerCase() === "zh-cn" ? "zh-CN" : requested;
  return SUPPORTED_LOCALES.has(locale) ? locale : "fr";
}

export async function localizeRows<T extends { id: number }>(
  req: Request,
  entityType: "projects" | "news" | "services" | "partners" | "settings",
  rows: T[],
): Promise<T[]> {
  const locale = requestLocale(req);
  if (locale === "fr" || rows.length === 0) return rows;

  const translations = await db
    .select({
      entityId: contentTranslationsTable.entityId,
      fields: contentTranslationsTable.fields,
    })
    .from(contentTranslationsTable)
    .where(
      and(
        eq(contentTranslationsTable.entityType, entityType),
        eq(contentTranslationsTable.locale, locale),
        inArray(
          contentTranslationsTable.entityId,
          rows.map((row) => row.id),
        ),
      ),
    );
  const fieldsById = new Map(
    translations.map((translation) => [translation.entityId, translation.fields]),
  );

  return rows.map((row) => {
    const translatedFields = fieldsById.get(row.id);
    if (!translatedFields) return row;
    const overrides = Object.fromEntries(
      Object.entries(translatedFields).filter(
        ([, value]) => typeof value === "string" && value.trim().length > 0,
      ),
    );
    return { ...row, ...overrides };
  });
}
