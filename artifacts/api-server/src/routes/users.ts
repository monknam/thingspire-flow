import { Router } from "express";
import { db, usersTable, profilesTable, departmentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../lib/session.js";

const router = Router();

async function listAdminUsers() {
  const profiles = await db
    .select({
      id: profilesTable.id,
      email: profilesTable.email,
      fullName: profilesTable.fullName,
      role: profilesTable.role,
      departmentId: profilesTable.departmentId,
      departmentName: departmentsTable.name,
      jobTitle: profilesTable.jobTitle,
      employmentStatus: profilesTable.employmentStatus,
      createdAt: profilesTable.createdAt,
    })
    .from(profilesTable)
    .leftJoin(departmentsTable, eq(profilesTable.departmentId, departmentsTable.id))
    .orderBy(profilesTable.fullName);

  const legacyUsers = await db
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

  const merged = new Map<string, {
    id: string;
    email: string | null;
    fullName: string | null;
    role: string;
    departmentId: string | null;
    departmentName: string | null;
    jobTitle: string | null;
    employmentStatus: string | null;
    createdAt: Date;
  }>();

  for (const user of legacyUsers) {
    merged.set(user.id, {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      departmentId: user.departmentId,
      departmentName: user.departmentName ?? null,
      jobTitle: user.jobTitle,
      employmentStatus: user.employmentStatus,
      createdAt: user.createdAt,
    });
  }

  for (const profile of profiles) {
    merged.set(profile.id, {
      id: profile.id,
      email: profile.email,
      fullName: profile.fullName,
      role: profile.role,
      departmentId: profile.departmentId,
      departmentName: profile.departmentName ?? null,
      jobTitle: profile.jobTitle,
      employmentStatus: profile.employmentStatus,
      createdAt: profile.createdAt,
    });
  }

  return [...merged.values()].sort((a, b) => (a.fullName ?? "").localeCompare(b.fullName ?? ""));
}

async function getAdminUserById(id: string) {
  const users = await listAdminUsers();
  return users.find((user) => user.id === id) ?? null;
}

router.get("/", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin" && user.role !== "leader") {
    return res.status(403).json({ error: "Admin or leader only" });
  }

  res.json(await listAdminUsers());
});

router.patch("/:id", async (req, res) => {
  const currentUser = await getCurrentUser(req);
  if (!currentUser) return res.status(401).json({ error: "Unauthorized" });
  if (currentUser.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const { id } = req.params;
  const { role, departmentId, fullName, jobTitle } = req.body;

  const userUpdates: Record<string, unknown> = {};
  const profileUpdates: Record<string, unknown> = {};

  if (role !== undefined) {
    userUpdates.role = role;
    profileUpdates.role = role;
  }
  if (departmentId !== undefined) {
    userUpdates.departmentId = departmentId;
    profileUpdates.departmentId = departmentId;
  }
  if (fullName !== undefined) {
    userUpdates.fullName = fullName;
    profileUpdates.fullName = fullName;
  }
  if (jobTitle !== undefined) {
    userUpdates.jobTitle = jobTitle;
    profileUpdates.jobTitle = jobTitle;
  }

  const result = await getAdminUserById(id);

  if (!result) return res.status(404).json({ error: "User not found" });

  if (Object.keys(userUpdates).length > 0) {
    await db.update(usersTable).set(userUpdates).where(eq(usersTable.id, id));
  }

  if (Object.keys(profileUpdates).length > 0) {
    await db.update(profilesTable).set(profileUpdates).where(eq(profilesTable.id, id));
  }

  const finalResult = await getAdminUserById(id);
  if (!finalResult) return res.status(404).json({ error: "User not found" });
  res.json(finalResult);
});

export default router;
