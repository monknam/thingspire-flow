import { Router } from "express";
import { db, usersTable, departmentsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../lib/session.js";
import crypto from "crypto";

const router = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "thingspire_salt").digest("hex");
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const users = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      fullName: usersTable.fullName,
      role: usersTable.role,
      departmentId: usersTable.departmentId,
      departmentName: departmentsTable.name,
      isSystemAdmin: usersTable.isSystemAdmin,
      passwordHash: usersTable.passwordHash,
      employmentStatus: usersTable.employmentStatus,
    })
    .from(usersTable)
    .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
    .where(eq(usersTable.email, email.toLowerCase()))
    .limit(1);

  const user = users[0];
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  if (user.employmentStatus !== "active") {
    return res.status(401).json({ error: "Account is inactive" });
  }

  const expectedHash = hashPassword(password);
  if (user.passwordHash !== expectedHash) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  req.session.userId = user.id;
  await new Promise<void>((resolve, reject) => req.session.save((err) => err ? reject(err) : resolve()));

  res.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    departmentId: user.departmentId,
    departmentName: user.departmentName ?? null,
    isSystemAdmin: user.isSystemAdmin,
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
});

router.get("/me", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json(user);
});

export default router;
