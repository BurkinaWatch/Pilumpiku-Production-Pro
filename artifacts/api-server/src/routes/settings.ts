import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, siteSettingsTable } from "@workspace/db";
import {
  GetSiteSettingsResponse,
  UpdateSiteSettingsBody,
  UpdateSiteSettingsResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminMiddleware";

const router: IRouter = Router();

async function getOrCreateSettings() {
  const [row] = await db.select().from(siteSettingsTable).limit(1);
  if (row) return row;
  const [created] = await db.insert(siteSettingsTable).values({}).returning();
  return created;
}

router.get("/settings", async (_req, res): Promise<void> => {
  const row = await getOrCreateSettings();
  res.json(GetSiteSettingsResponse.parse(row));
});

router.patch("/settings", requireAdmin, async (req, res): Promise<void> => {
  const parsed = UpdateSiteSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const existing = await getOrCreateSettings();
  const [row] = await db
    .update(siteSettingsTable)
    .set(parsed.data)
    .where(eq(siteSettingsTable.id, existing.id))
    .returning();
  res.json(UpdateSiteSettingsResponse.parse(row));
});

export default router;
