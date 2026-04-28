import { Router, type IRouter } from "express";
import { eq, asc } from "drizzle-orm";
import { db, servicesTable } from "@workspace/db";
import {
  CreateServiceBody,
  UpdateServiceBody,
  UpdateServiceParams,
  UpdateServiceResponse,
  DeleteServiceParams,
  ListServicesResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminMiddleware";

const router: IRouter = Router();

router.get("/services", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(servicesTable)
    .orderBy(asc(servicesTable.sortOrder), asc(servicesTable.id));
  res.json(ListServicesResponse.parse(rows));
});

router.post("/services", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(servicesTable)
    .values({ ...parsed.data, sortOrder: parsed.data.sortOrder ?? 0 })
    .returning();
  res.status(201).json(UpdateServiceResponse.parse(row));
});

router.patch("/services/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .update(servicesTable)
    .set(parsed.data)
    .where(eq(servicesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.json(UpdateServiceResponse.parse(row));
});

router.delete("/services/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(servicesTable)
    .where(eq(servicesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
