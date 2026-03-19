import { Router } from "express";
import { db, usersTable, departmentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../lib/session.js";

const router = Router();

router.get("/", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin" && user.role !== "leader") {
    return res.status(403).json({ error: "Admin or leader only" });
  }

  const users = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      fullName: usersTable.fullName,
      role: usersTable.role,
      departmentId: usersTable.departmentId,
      departmentName: departmentsTable.name,
      jobTitle: usersTable.jobTitle,
      employmentStatus: usersTable.employmentStatus,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
    .orderBy(usersTable.fullName);

  res.json(users.map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    role: u.role,
    departmentId: u.departmentId,
    departmentName: u.departmentName ?? null,
    jobTitle: u.jobTitle,
    employmentStatus: u.employmentStatus,
    createdAt: u.createdAt,
  })));
});

router.patch("/:id", async (req, res) => {
  const currentUser = await getCurrentUser(req);
  if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
  if (currentUser.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const { id } = req.params;
  const { role, departmentId, fullName, jobTitle } = req.body;

  const updates: any = {};
  if (role !== undefined) updates.role = role;
  if (departmentId !== undefined) updates.departmentId = departmentId;
  if (fullName !== undefined) updates.fullName = fullName;
  if (jobTitle !== undefined) updates.jobTitle = jobTitle;

  const result = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      fullName: usersTable.fullName,
      role: usersTable.role,
      departmentId: usersTable.departmentId,
      departmentName: departmentsTable.name,
      jobTitle: usersTable.jobTitle,
      employmentStatus: usersTable.employmentStatus,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
    .where(eq(usersTable.id, id))
    .limit(1);

  if (!result[0]) return res.status(404).json({ error: "User not found" });

  const [updated] = await db
    .update(usersTable)
    .set(updates)
    .where(eq(usersTable.id, id))
    .returning();

  const finalResult = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      fullName: usersTable.fullName,
      role: usersTable.role,
      departmentId: usersTable.departmentId,
      departmentName: departmentsTable.name,
      jobTitle: usersTable.jobTitle,
      employmentStatus: usersTable.employmentStatus,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
    .where(eq(usersTable.id, id))
    .limit(1);

  res.json({
    ...finalResult[0],
    departmentName: finalResult[0].departmentName ?? null,
  });
});

export default router;
