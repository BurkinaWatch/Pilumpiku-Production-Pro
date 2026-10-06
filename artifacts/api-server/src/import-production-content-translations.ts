import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inArray, sql } from "drizzle-orm";

const SOURCE_FIELDS = {
  projects: ["titre", "categorie", "statut", "duree", "langue", "synopsis", "intention"],
  news: ["titre", "categorie", "dateLabel", "excerpt"],
  services: ["titre", "description"],
  partners: ["nom", "description"],
  settings: [
    "heroBadge",
    "heroTitleLine1",
    "heroTitleLine2",
    "heroSubtitle",
    "quoteText",
    "quoteAuthor",
    "aboutHistoire",
    "aboutVision",
    "founderName",
    "founderTitle",
    "founderBio",
    "contactAddress",
  ],
} as const;

const ENTITY_TYPES = Object.keys(SOURCE_FIELDS) as EntityType[];
const EXPECTED_LOCALES = ["en", "es", "pt", "de", "zh-CN"];
const EXPECTED_SOURCE_COUNTS: Record<EntityType, number> = {
  projects: 15,
  news: 22,
  services: 6,
  partners: 35,
  settings: 1,
};

type EntityType = keyof typeof SOURCE_FIELDS;
type TranslationBundleRecord = {
  entityType: EntityType;
  entityId: number;
  locale: string;
  sourceHash: string;
  fields: Record<string, string>;
};
type TranslationBundle = {
  version: number;
  source: string;
  generatedAt: string;
  locales: string[];
  sourceCounts: Record<EntityType, number>;
  records: TranslationBundleRecord[];
};
type SourceRow = Record<string, unknown> & { id: number };
type PlannedWrite = {
  entityType: EntityType;
  entityId: number;
  locale: string;
  fields: Record<string, string>;
};
type RunMode = "validate" | "dry-run" | "apply" | "help";

const bundlePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "data/production-content-translations.json",
);

function usage(): string {
  return [
    "Usage: pnpm --filter @workspace/api-server run import:production-translations -- [--validate-bundle|--dry-run|--apply]",
    "",
    "  --validate-bundle  Check the bundled file without connecting to a database.",
    "  --dry-run          Validate production content and preview changes (default).",
    "  --apply            Import missing translations into the connected database.",
    "",
    "Run --dry-run first from the deployed Railway service. --apply writes data.",
  ].join("\n");
}

function parseMode(args: string[]): RunMode {
  if (args.includes("--help") || args.includes("-h")) return "help";

  const modeArgs = args.filter((arg) => arg !== "--help" && arg !== "-h");
  if (modeArgs.length > 1) {
    throw new Error("Choose exactly one mode: --validate-bundle, --dry-run, or --apply.");
  }
  if (modeArgs.length === 0 || modeArgs[0] === "--dry-run") return "dry-run";
  if (modeArgs[0] === "--validate-bundle") return "validate";
  if (modeArgs[0] === "--apply") return "apply";
  throw new Error(`Unknown argument: ${modeArgs[0]}\n\n${usage()}`);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateBundle(value: unknown): asserts value is TranslationBundle {
  if (!isPlainObject(value)) throw new Error("Translation bundle must be a JSON object.");
  if (value.version !== 1) throw new Error("Unsupported translation bundle version.");
  if (value.source !== "Railway production CMS API") {
    throw new Error("Unexpected translation bundle source.");
  }
  if (
    !Array.isArray(value.locales) ||
    JSON.stringify(value.locales) !== JSON.stringify(EXPECTED_LOCALES)
  ) {
    throw new Error(`Expected locales in this order: ${EXPECTED_LOCALES.join(", ")}.`);
  }
  if (!isPlainObject(value.sourceCounts)) {
    throw new Error("Translation bundle is missing sourceCounts.");
  }
  for (const entityType of ENTITY_TYPES) {
    if (value.sourceCounts[entityType] !== EXPECTED_SOURCE_COUNTS[entityType]) {
      throw new Error(
        `Unexpected ${entityType} source count: ${String(value.sourceCounts[entityType])}.`,
      );
    }
  }
  if (!Array.isArray(value.records)) throw new Error("Translation bundle is missing records.");

  const expectedRecordCount =
    Object.values(EXPECTED_SOURCE_COUNTS).reduce((sum, count) => sum + count, 0) *
    EXPECTED_LOCALES.length;
  if (value.records.length !== expectedRecordCount) {
    throw new Error(
      `Expected ${expectedRecordCount} translation rows; found ${value.records.length}.`,
    );
  }

  const seen = new Set<string>();
  const perLocaleCount = new Map(EXPECTED_LOCALES.map((locale) => [locale, 0]));
  for (const candidate of value.records) {
    if (!isPlainObject(candidate)) throw new Error("Translation bundle contains an invalid row.");
    const row = candidate as unknown as TranslationBundleRecord;
    if (!ENTITY_TYPES.includes(row.entityType)) {
      throw new Error(`Unsupported entity type in bundle: ${String(row.entityType)}.`);
    }
    if (!Number.isSafeInteger(row.entityId) || row.entityId <= 0) {
      throw new Error(`Invalid entity id in bundle: ${String(row.entityId)}.`);
    }
    if (!EXPECTED_LOCALES.includes(row.locale)) {
      throw new Error(`Unsupported locale in bundle: ${String(row.locale)}.`);
    }
    if (typeof row.sourceHash !== "string" || !/^-?[0-9a-f]{1,16}$/i.test(row.sourceHash)) {
      throw new Error(`Invalid source hash for ${row.entityType} ${row.entityId}.`);
    }
    if (!isPlainObject(row.fields)) {
      throw new Error(`Missing fields for ${row.entityType} ${row.entityId} (${row.locale}).`);
    }

    const allowedFields = SOURCE_FIELDS[row.entityType] as readonly string[];
    const fieldNames = Object.keys(row.fields);
    if (fieldNames.length !== allowedFields.length) {
      throw new Error(
        `Incomplete field set for ${row.entityType} ${row.entityId} (${row.locale}).`,
      );
    }
    for (const field of fieldNames) {
      if (!allowedFields.includes(field)) {
        throw new Error(`Unsupported field ${field} for ${row.entityType}.`);
      }
      if (typeof row.fields[field] !== "string") {
        throw new Error(`Translation ${field} must be a string.`);
      }
    }

    const key = `${row.entityType}:${row.entityId}:${row.locale}`;
    if (seen.has(key)) throw new Error(`Duplicate translation row: ${key}.`);
    seen.add(key);
    perLocaleCount.set(row.locale, (perLocaleCount.get(row.locale) ?? 0) + 1);
  }

  for (const locale of EXPECTED_LOCALES) {
    if (perLocaleCount.get(locale) !== expectedRecordCount / EXPECTED_LOCALES.length) {
      throw new Error(`Incomplete translation coverage for ${locale}.`);
    }
  }
}

function sourceHash(entityType: EntityType, sourceRow: SourceRow): string {
  const orderedFields: Record<string, unknown> = {};
  for (const field of SOURCE_FIELDS[entityType]) {
    orderedFields[field] = sourceRow[field];
  }

  let hash = 0xcbf29ce484222325n;
  for (const byte of new TextEncoder().encode(JSON.stringify(orderedFields))) {
    hash ^= BigInt(byte);
    hash = BigInt.asIntN(64, hash * 0x100000001b3n);
  }

  const signedHash = BigInt.asIntN(64, hash);
  const isNegative = signedHash < 0n;
  const magnitude = (isNegative ? -signedHash : signedHash).toString(16).padStart(16, "0");
  return `${isNegative ? "-" : ""}${magnitude}`;
}

function recordKey(entityType: string, entityId: number, locale: string): string {
  return `${entityType}:${entityId}:${locale}`;
}

async function readBundle(): Promise<TranslationBundle> {
  const text = await readFile(bundlePath, "utf8");
  const parsed: unknown = JSON.parse(text);
  validateBundle(parsed);
  return parsed;
}

async function runImport(bundle: TranslationBundle, mode: "dry-run" | "apply") {
  if (!process.env.DATABASE_URL && !process.env.RAILWAY_DATABASE_URL) {
    throw new Error("DATABASE_URL or RAILWAY_DATABASE_URL must be set in the Railway service.");
  }

  const database = await import("@workspace/db");
  const { db, pool } = database;
  try {
    return await db.transaction(async (tx) => {
      if (mode === "apply") {
        await tx.execute(
          sql.raw(
            'LOCK TABLE "projects", "news", "services", "partners", "site_settings" IN SHARE MODE',
          ),
        );
      }

      const sourceRows: Record<EntityType, SourceRow[]> = {
        projects: (await tx.select().from(database.projectsTable)) as unknown as SourceRow[],
        news: (await tx.select().from(database.newsTable)) as unknown as SourceRow[],
        services: (await tx.select().from(database.servicesTable)) as unknown as SourceRow[],
        partners: (await tx.select().from(database.partnersTable)) as unknown as SourceRow[],
        settings: (await tx.select().from(database.siteSettingsTable)) as unknown as SourceRow[],
      };

      const sourceByKey = new Map<string, SourceRow>();
      for (const entityType of ENTITY_TYPES) {
        const rows = sourceRows[entityType];
        if (rows.length !== EXPECTED_SOURCE_COUNTS[entityType]) {
          throw new Error(
            `Production ${entityType} count changed: expected ${EXPECTED_SOURCE_COUNTS[entityType]}, found ${rows.length}.`,
          );
        }
        for (const row of rows) sourceByKey.set(`${entityType}:${row.id}`, row);
      }

      const mismatches: string[] = [];
      for (const row of bundle.records) {
        const sourceRow = sourceByKey.get(`${row.entityType}:${row.entityId}`);
        if (!sourceRow) {
          mismatches.push(`${row.entityType}:${row.entityId} is missing from production`);
          continue;
        }
        if (sourceHash(row.entityType, sourceRow) !== row.sourceHash) {
          mismatches.push(`${row.entityType}:${row.entityId} source content changed`);
        }
      }
      if (mismatches.length > 0) {
        const sample = mismatches.slice(0, 10).join("\n- ");
        throw new Error(
          `Source validation failed for ${mismatches.length} translation rows; nothing was written:\n- ${sample}`,
        );
      }

      const existingRows = await tx
        .select({
          entityType: database.contentTranslationsTable.entityType,
          entityId: database.contentTranslationsTable.entityId,
          locale: database.contentTranslationsTable.locale,
          fields: database.contentTranslationsTable.fields,
        })
        .from(database.contentTranslationsTable)
        .where(inArray(database.contentTranslationsTable.locale, [...EXPECTED_LOCALES]));
      const existingByKey = new Map(
        existingRows.map((row) => [
          recordKey(row.entityType, row.entityId, row.locale),
          row.fields ?? {},
        ]),
      );

      const writes: PlannedWrite[] = [];
      let fieldsToAdd = 0;
      let existingNonEmptyFieldsPreserved = 0;
      let unchangedRows = 0;

      for (const row of bundle.records) {
        const key = recordKey(row.entityType, row.entityId, row.locale);
        const existingFields = existingByKey.get(key);
        const newFields: Record<string, string> = {};
        for (const [field, value] of Object.entries(row.fields)) {
          if (!value.trim()) continue;
          const currentValue = existingFields?.[field];
          if (typeof currentValue === "string" && currentValue.trim()) {
            existingNonEmptyFieldsPreserved += 1;
            continue;
          }
          newFields[field] = value;
        }

        if (Object.keys(newFields).length === 0) {
          unchangedRows += 1;
          continue;
        }
        fieldsToAdd += Object.keys(newFields).length;
        writes.push({
          entityType: row.entityType,
          entityId: row.entityId,
          locale: row.locale,
          fields: newFields,
        });
      }

      if (mode === "apply" && writes.length > 0) {
        await tx
          .insert(database.contentTranslationsTable)
          .values(writes)
          .onConflictDoUpdate({
            target: [
              database.contentTranslationsTable.entityType,
              database.contentTranslationsTable.entityId,
              database.contentTranslationsTable.locale,
            ],
            set: {
              fields: sql`(
                COALESCE(
                  (
                    SELECT jsonb_object_agg(
                      incoming.key,
                      CASE
                        WHEN NULLIF(BTRIM(${database.contentTranslationsTable.fields} ->> incoming.key), '') IS NOT NULL
                          THEN ${database.contentTranslationsTable.fields} -> incoming.key
                        ELSE incoming.value
                      END
                    )
                    FROM jsonb_each(excluded.fields) AS incoming(key, value)
                  ),
                  '{}'::jsonb
                )
                ||
                COALESCE(
                  (
                    SELECT jsonb_object_agg(existing.key, existing.value)
                    FROM jsonb_each(${database.contentTranslationsTable.fields}) AS existing(key, value)
                    WHERE NOT (excluded.fields ? existing.key)
                  ),
                  '{}'::jsonb
                )
              )`,
              updatedAt: new Date(),
            },
          });
      }

      return {
        sourceCounts: Object.fromEntries(
          ENTITY_TYPES.map((entityType) => [entityType, sourceRows[entityType].length]),
        ),
        localeCount: EXPECTED_LOCALES.length,
        bundleRows: bundle.records.length,
        translationRowsToCreate: writes.filter((row) => !existingByKey.has(
          recordKey(row.entityType, row.entityId, row.locale),
        )).length,
        translationRowsToUpdate: writes.filter((row) => existingByKey.has(
          recordKey(row.entityType, row.entityId, row.locale),
        )).length,
        fieldsToAdd,
        existingNonEmptyFieldsPreserved,
        unchangedRows,
        applied: mode === "apply",
      };
    });
  } finally {
    await pool.end();
  }
}

async function main(): Promise<void> {
  const mode = parseMode(process.argv.slice(2));
  if (mode === "help") {
    console.log(usage());
    return;
  }

  const bundle = await readBundle();
  if (mode === "validate") {
    console.log(
      JSON.stringify(
        {
          valid: true,
          locales: bundle.locales,
          sourceCounts: bundle.sourceCounts,
          translationRows: bundle.records.length,
        },
        null,
        2,
      ),
    );
    return;
  }

  const summary = await runImport(bundle, mode);
  console.log(JSON.stringify(summary, null, 2));
  if (mode === "dry-run") {
    console.log("Dry run only; no production data was written. Use --apply to import.");
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
