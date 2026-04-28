import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, partnersTable } from "@workspace/db";
import {
  CreatePartnerBody,
  UpdatePartnerBody,
  UpdatePartnerParams,
  UpdatePartnerResponse,
  DeletePartnerParams,
  ListPartnersResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminMiddleware";

const router: IRouter = Router();

router.get("/partners", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(partnersTable)
    .orderBy(asc(partnersTable.sortOrder), asc(partnersTable.id));
  res.json(ListPartnersResponse.parse(rows));
});

router.post("/partners", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreatePartnerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(partnersTable)
    .values({ ...parsed.data, sortOrder: parsed.data.sortOrder ?? 0 })
    .returning();
  res.status(201).json(UpdatePartnerResponse.parse(row));
});

router.patch("/partners/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdatePartnerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdatePartnerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .update(partnersTable)
    .set(parsed.data)
    .where(eq(partnersTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Partner not found" });
    return;
  }
  res.json(UpdatePartnerResponse.parse(row));
});

router.delete("/partners/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeletePartnerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(partnersTable)
    .where(eq(partnersTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Partner not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
