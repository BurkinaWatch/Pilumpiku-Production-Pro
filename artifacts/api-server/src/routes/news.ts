import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, newsTable } from "@workspace/db";
import {
  CreateNewsBody,
  UpdateNewsBody,
  GetNewsParams,
  GetNewsResponse,
  UpdateNewsParams,
  UpdateNewsResponse,
  DeleteNewsParams,
  ListNewsResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminMiddleware";

const router: IRouter = Router();

router.get("/news", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(newsTable)
    .orderBy(asc(newsTable.sortOrder), asc(newsTable.id));
  res.json(ListNewsResponse.parse(rows));
});

router.get("/news/:id", async (req, res): Promise<void> => {
  const params = GetNewsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .select()
    .from(newsTable)
    .where(eq(newsTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "News article not found" });
    return;
  }
  res.json(GetNewsResponse.parse(row));
});

router.post("/news", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateNewsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(newsTable)
    .values({ ...parsed.data, sortOrder: parsed.data.sortOrder ?? 0 })
    .returning();
  res.status(201).json(GetNewsResponse.parse(row));
});

router.patch("/news/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateNewsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateNewsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .update(newsTable)
    .set(parsed.data)
    .where(eq(newsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "News article not found" });
    return;
  }
  res.json(UpdateNewsResponse.parse(row));
});

router.delete("/news/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteNewsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(newsTable)
    .where(eq(newsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "News article not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
