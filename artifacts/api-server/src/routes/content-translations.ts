import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import {
  contentTranslationsTable,
  db,
  newsTable,
  partnersTable,
  projectsTable,
  servicesTable,
  siteSettingsTable,
} from "@workspace/db";
import {
  ListContentTranslationsQueryParams,
  UpsertContentTranslationBody,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminMiddleware";

const router: IRouter = Router();

const editableFields = {
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

async function entityExists(entityType: keyof typeof editableFields, entityId: number) {
  switch (entityType) {
    case "projects":
      return (await db.select({ id: projectsTable.id }).from(projectsTable).where(eq(projectsTable.id, entityId)).limit(1)).length > 0;
    case "news":
      return (await db.select({ id: newsTable.id }).from(newsTable).where(eq(newsTable.id, entityId)).limit(1)).length > 0;
    case "services":
      return (await db.select({ id: servicesTable.id }).from(servicesTable).where(eq(servicesTable.id, entityId)).limit(1)).length > 0;
    case "partners":
      return (await db.select({ id: partnersTable.id }).from(partnersTable).where(eq(partnersTable.id, entityId)).limit(1)).length > 0;
    case "settings":
      return (await db.select({ id: siteSettingsTable.id }).from(siteSettingsTable).where(eq(siteSettingsTable.id, entityId)).limit(1)).length > 0;
  }
}

router.get("/content-translations", async (req, res): Promise<void> => {
  const parsed = ListContentTranslationsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const rows = await db
    .select()
    .from(contentTranslationsTable)
    .where(eq(contentTranslationsTable.locale, parsed.data.locale));
  res.json(rows);
});

router.put("/content-translations", requireAdmin, async (req, res): Promise<void> => {
  const parsed = UpsertContentTranslationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { entityType, entityId, locale, fields } = parsed.data;
  const allowed = editableFields[entityType];
  const invalidFields = Object.keys(fields).filter(
    (field) => !(allowed as readonly string[]).includes(field),
  );
  if (invalidFields.length) {
    res.status(400).json({ error: `Unsupported translation fields: ${invalidFields.join(", ")}` });
    return;
  }
  if (!(await entityExists(entityType, entityId))) {
    res.status(404).json({ error: "Content item not found" });
    return;
  }

  const [saved] = await db
    .insert(contentTranslationsTable)
    .values({ entityType, entityId, locale, fields })
    .onConflictDoUpdate({
      target: [
        contentTranslationsTable.entityType,
        contentTranslationsTable.entityId,
        contentTranslationsTable.locale,
      ],
      set: { fields, updatedAt: new Date() },
    })
    .returning();

  res.json(saved);
});

export default router;
