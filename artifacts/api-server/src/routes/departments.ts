import { Router } from "express";
import { db, departmentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../lib/session.js";

const router = Router();

router.get("/", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const departments = await db
    .select()
    .from(departmentsTable)
    .orderBy(departmentsTable.name);

  res.json(departments.map((d) => ({
    id: d.id,
    name: d.name,
    code: d.code,
    parentId: d.parentId,
    leaderUserId: d.leaderUserId,
    isActive: d.isActive,
    createdAt: d.createdAt,
  })));
});

router.post("/", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const { name, code, parentId } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  const [dept] = await db
    .insert(departmentsTable)
    .values({ name, code: code || null, parentId: parentId || null })
    .returning();

  res.status(201).json({
    id: dept.id,
    name: dept.name,
    code: dept.code,
    parentId: dept.parentId,
    leaderUserId: dept.leaderUserId,
    isActive: dept.isActive,
    createdAt: dept.createdAt,
  });
});

router.patch("/:id", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const { id } = req.params;
  const { name, code, leaderUserId, isActive } = req.body;

  const updates: any = {};
  if (name !== undefined) updates.name = name;
  if (code !== undefined) updates.code = code;
  if (leaderUserId !== undefined) updates.leaderUserId = leaderUserId;
  if (isActive !== undefined) updates.isActive = isActive;

  const [dept] = await db
    .update(departmentsTable)
    .set(updates)
    .where(eq(departmentsTable.id, id))
    .returning();

  if (!dept) return res.status(404).json({ error: "Department not found" });

  res.json({
    id: dept.id,
    name: dept.name,
    code: dept.code,
    parentId: dept.parentId,
    leaderUserId: dept.leaderUserId,
    isActive: dept.isActive,
    createdAt: dept.createdAt,
  });
});

export default router;
