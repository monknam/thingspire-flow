import { Request } from "express";
import { db, usersTable, departmentsTable } from "@workspace/db";
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

  const result = await db
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

  if (!result[0]) return null;

  return {
    id: result[0].id,
    email: result[0].email,
    fullName: result[0].fullName,
    role: result[0].role as "admin" | "leader" | "member",
    departmentId: result[0].departmentId,
    departmentName: result[0].departmentName ?? null,
    isSystemAdmin: result[0].isSystemAdmin,
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
