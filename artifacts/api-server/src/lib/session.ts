import { Request } from "express";
import { db, usersTable, profilesTable, departmentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export interface SessionUser {
  id: string;
  email: string;
  fullName: string | null;
  role: "admin" | "leader" | "member";
  departmentId: string | null;
  departmentName: string | null;
  isSystemAdmin: boolean;
}

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export async function getCurrentUser(req: Request): Promise<SessionUser | null> {
  const userId = req.session?.userId;
  if (!userId) return null;

  const profileResult = await db
    .select({
      id: profilesTable.id,
      email: profilesTable.email,
      fullName: profilesTable.fullName,
      role: profilesTable.role,
      departmentId: profilesTable.departmentId,
      departmentName: departmentsTable.name,
      isSystemAdmin: profilesTable.isSystemAdmin,
    })
    .from(profilesTable)
    .leftJoin(departmentsTable, eq(profilesTable.departmentId, departmentsTable.id))
    .where(eq(profilesTable.id, userId))
    .limit(1);

  if (profileResult[0]) {
    return {
      id: profileResult[0].id,
      email: profileResult[0].email ?? "",
      fullName: profileResult[0].fullName,
      role: profileResult[0].role as "admin" | "leader" | "member",
      departmentId: profileResult[0].departmentId,
      departmentName: profileResult[0].departmentName ?? null,
      isSystemAdmin: profileResult[0].isSystemAdmin,
    };
  }

  const userResult = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      fullName: usersTable.fullName,
      role: usersTable.role,
      departmentId: usersTable.departmentId,
      departmentName: departmentsTable.name,
      isSystemAdmin: usersTable.isSystemAdmin,
    })
    .from(usersTable)
    .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!userResult[0]) return null;

  return {
    id: userResult[0].id,
    email: userResult[0].email,
    fullName: userResult[0].fullName,
    role: userResult[0].role as "admin" | "leader" | "member",
    departmentId: userResult[0].departmentId,
    departmentName: userResult[0].departmentName ?? null,
    isSystemAdmin: userResult[0].isSystemAdmin,
  };
}

export function requireAuth(
  req: Request,
  res: any,
  next: any
) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export function requireAdmin(req: Request, res: any, next: any) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
