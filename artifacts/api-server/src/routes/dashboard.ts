import { Router } from "express";
import {
  db,
  usersTable,
  departmentsTable,
  surveyCyclesTable,
  surveySectionsTable,
  surveyQuestionsTable,
  surveyResponsesTable,
  surveyAnswersTable,
  actionItemsTable,
} from "@workspace/db";
import { eq, count, and, sql, desc } from "drizzle-orm";
import { getCurrentUser } from "../lib/session.js";

const router = Router();

// ── Overview ──────────────────────────────────────────
router.get("/overview", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const [userCount] = await db.select({ count: count() }).from(usersTable).where(eq(usersTable.employmentStatus, "active"));
  const [deptCount] = await db.select({ count: count() }).from(departmentsTable).where(eq(departmentsTable.isActive, true));

  const surveys = await db
    .select()
    .from(surveyCyclesTable)
    .orderBy(sql`${surveyCyclesTable.year} desc, ${surveyCyclesTable.createdAt} desc`)
    .limit(5);

  const totalUsers = Number(userCount.count);
  const activeSurveys = surveys.filter((s) => s.status === "active").length;

  const recentSurveys = await Promise.all(
    surveys.map(async (s) => {
      const [submitted] = await db
        .select({ count: count() })
        .from(surveyResponsesTable)
        .where(and(eq(surveyResponsesTable.surveyCycleId, s.id), eq(surveyResponsesTable.isSubmitted, true)));
      const [started] = await db
        .select({ count: count() })
        .from(surveyResponsesTable)
        .where(eq(surveyResponsesTable.surveyCycleId, s.id));

      const submittedCount = Number(submitted.count);
      const responseRate = totalUsers > 0 ? (submittedCount / totalUsers) * 100 : 0;
      return {
        id: s.id, title: s.title, status: s.status, year: s.year, quarter: s.quarter,
        submittedCount, startedCount: Number(started.count), totalEligible: totalUsers,
        responseRate: Math.round(responseRate * 10) / 10,
      };
    })
  );

  return res.json({ totalUsers, totalDepartments: Number(deptCount.count), activeSurveys, recentSurveys });
});

// ── Survey Detail Dashboard ────────────────────────────
router.get("/surveys/:surveyId", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin" && user.role !== "leader") return res.status(403).json({ error: "Admin or leader only" });

  const { surveyId } = req.params;
  const surveys = await db.select().from(surveyCyclesTable).where(eq(surveyCyclesTable.id, surveyId)).limit(1);
  if (!surveys[0]) return res.status(404).json({ error: "Survey not found" });
  const survey = surveys[0];

  const [totalUsersRow] = await db.select({ count: count() }).from(usersTable).where(eq(usersTable.employmentStatus, "active"));
  const totalEligible = Number(totalUsersRow.count);

  const [submittedRow] = await db
    .select({ count: count() })
    .from(surveyResponsesTable)
    .where(and(eq(surveyResponsesTable.surveyCycleId, surveyId), eq(surveyResponsesTable.isSubmitted, true)));
  const submittedCount = Number(submittedRow.count);
  const overallResponseRate = totalEligible > 0 ? Math.round((submittedCount / totalEligible) * 1000) / 10 : 0;

  // Department stats
  const departments = await db.select().from(departmentsTable).where(eq(departmentsTable.isActive, true));
  const departmentStats = await Promise.all(
    departments.map(async (dept) => {
      const [deptUsers] = await db.select({ count: count() }).from(usersTable)
        .where(and(eq(usersTable.departmentId, dept.id), eq(usersTable.employmentStatus, "active")));
      const deptTotal = Number(deptUsers.count);
      const [deptSubmitted] = await db.select({ count: count() }).from(surveyResponsesTable)
        .where(and(eq(surveyResponsesTable.surveyCycleId, surveyId), eq(surveyResponsesTable.respondentDepartmentId, dept.id), eq(surveyResponsesTable.isSubmitted, true)));
      const deptSubmittedCount = Number(deptSubmitted.count);
      return {
        departmentId: dept.id, departmentName: dept.name,
        submittedCount: deptSubmittedCount, totalEligible: deptTotal,
        responseRate: deptTotal > 0 ? Math.round((deptSubmittedCount / deptTotal) * 1000) / 10 : 0,
      };
    })
  );

  // Section/Question results
  const sections = await db.select().from(surveySectionsTable)
    .where(eq(surveySectionsTable.surveyCycleId, surveyId)).orderBy(surveySectionsTable.sortOrder);

  const sectionResults = await Promise.all(
    sections.map(async (section) => {
      const questions = await db.select().from(surveyQuestionsTable)
        .where(eq(surveyQuestionsTable.surveySectionId, section.id)).orderBy(surveyQuestionsTable.sortOrder);

      const questionResults = await Promise.all(
        questions.map(async (q) => {
          if (q.questionType !== "likert_5") {
            return { questionId: q.id, questionText: q.questionText, questionNo: q.questionNo, questionType: q.questionType, avgScore: null, responseCount: 0, distribution: {} };
          }
          const answers = await db
            .select({ numericValue: surveyAnswersTable.numericValue })
            .from(surveyAnswersTable)
            .innerJoin(surveyResponsesTable, and(
              eq(surveyAnswersTable.surveyResponseId, surveyResponsesTable.id),
              eq(surveyResponsesTable.isSubmitted, true)
            ))
            .where(eq(surveyAnswersTable.surveyQuestionId, q.id));

          const nums = answers.map((a) => a.numericValue).filter((v): v is number => v !== null);
          const distribution = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 } as Record<string, number>;
          for (const v of nums) if (v >= 1 && v <= 5) distribution[String(v)]++;
          const avgScore = nums.length > 0 ? Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 100) / 100 : null;

          return { questionId: q.id, questionText: q.questionText, questionNo: q.questionNo, questionType: q.questionType, avgScore, responseCount: nums.length, distribution };
        })
      );

      const likertScores = questionResults.filter((qr) => qr.questionType === "likert_5" && qr.avgScore !== null).map((qr) => qr.avgScore as number);
      const sectionAvg = likertScores.length > 0 ? Math.round((likertScores.reduce((a, b) => a + b, 0) / likertScores.length) * 100) / 100 : null;

      return { sectionId: section.id, sectionName: section.name, description: section.description, sortOrder: section.sortOrder, avgScore: sectionAvg, questionResults };
    })
  );

  return res.json({ survey: { id: survey.id, title: survey.title, description: survey.description, year: survey.year, quarter: survey.quarter, status: survey.status, startAt: survey.startAt, endAt: survey.endAt, anonymousMinCount: survey.anonymousMinCount }, overallResponseRate, submittedCount, totalEligible, departmentStats, sectionResults });
});

// ── Group Comparison (개발 vs 비개발) ─────────────────────
router.get("/surveys/:surveyId/group-comparison", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin" && user.role !== "leader") return res.status(403).json({ error: "Admin or leader only" });

  const { surveyId } = req.params;
  const [surveyCheck] = await db.select({ id: surveyCyclesTable.id, anonymousMinCount: surveyCyclesTable.anonymousMinCount })
    .from(surveyCyclesTable).where(eq(surveyCyclesTable.id, surveyId)).limit(1);
  if (!surveyCheck) return res.status(404).json({ error: "Survey not found" });

  const GROUPS = ["dev", "non_dev", "management"] as const;
  const GROUP_MIN = 3;

  const groupResults: Record<string, { count: number; safe: boolean; sections: Array<{ sectionId: string; sectionName: string; avgScore: number | null }> }> = {};

  for (const group of GROUPS) {
    const submittedInGroup = await db
      .select({ count: count() })
      .from(surveyResponsesTable)
      .innerJoin(usersTable, eq(surveyResponsesTable.respondentUserId, usersTable.id))
      .where(and(eq(surveyResponsesTable.surveyCycleId, surveyId), eq(surveyResponsesTable.isSubmitted, true), eq(usersTable.employeeGroup, group)));

    const groupCount = Number(submittedInGroup[0].count);
    if (groupCount === 0) continue;

    const safe = groupCount >= GROUP_MIN;
    const sections = await db.select().from(surveySectionsTable)
      .where(eq(surveySectionsTable.surveyCycleId, surveyId)).orderBy(surveySectionsTable.sortOrder);

    const sectionData = await Promise.all(sections.map(async (section) => {
      if (!safe) return { sectionId: section.id, sectionName: section.name, avgScore: null };

      const answers = await db
        .select({ numericValue: surveyAnswersTable.numericValue })
        .from(surveyAnswersTable)
        .innerJoin(surveyResponsesTable, eq(surveyAnswersTable.surveyResponseId, surveyResponsesTable.id))
        .innerJoin(usersTable, eq(surveyResponsesTable.respondentUserId, usersTable.id))
        .innerJoin(surveyQuestionsTable, eq(surveyAnswersTable.surveyQuestionId, surveyQuestionsTable.id))
        .where(and(
          eq(surveyResponsesTable.surveyCycleId, surveyId),
          eq(surveyResponsesTable.isSubmitted, true),
          eq(usersTable.employeeGroup, group),
          eq(surveyQuestionsTable.surveySectionId, section.id),
          sql`${surveyAnswersTable.numericValue} IS NOT NULL`
        ));

      const nums = answers.map((a) => a.numericValue).filter((v): v is number => v !== null);
      const avg = nums.length > 0 ? Math.round((nums.reduce((a, b) => a + b, 0) / nums.length) * 100) / 100 : null;
      return { sectionId: section.id, sectionName: section.name, avgScore: avg };
    }));

    groupResults[group] = { count: groupCount, safe, sections: sectionData };
  }

  return res.json({ groups: groupResults, minRequired: GROUP_MIN });
});

// ── Qualitative Analysis ───────────────────────────────
router.get("/surveys/:surveyId/qualitative", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin" && user.role !== "leader") return res.status(403).json({ error: "Admin or leader only" });

  const { surveyId } = req.params;
  const [surveyCheck] = await db.select({ id: surveyCyclesTable.id, anonymousMinCount: surveyCyclesTable.anonymousMinCount })
    .from(surveyCyclesTable).where(eq(surveyCyclesTable.id, surveyId)).limit(1);
  if (!surveyCheck) return res.status(404).json({ error: "Survey not found" });

  const [submittedCountRow] = await db.select({ count: count() }).from(surveyResponsesTable)
    .where(and(eq(surveyResponsesTable.surveyCycleId, surveyId), eq(surveyResponsesTable.isSubmitted, true)));
  const submittedCount = Number(submittedCountRow.count);

  if (submittedCount < (surveyCheck.anonymousMinCount ?? 5)) {
    return res.json({ safe: false, submittedCount, minRequired: surveyCheck.anonymousMinCount, questions: [] });
  }

  const sections = await db.select().from(surveySectionsTable)
    .where(eq(surveySectionsTable.surveyCycleId, surveyId)).orderBy(surveySectionsTable.sortOrder);

  const result = [];
  for (const section of sections) {
    const questions = await db.select().from(surveyQuestionsTable)
      .where(and(eq(surveyQuestionsTable.surveySectionId, section.id)))
      .orderBy(surveyQuestionsTable.sortOrder);

    const textQuestions = questions.filter((q) => q.questionType === "long_text" || q.questionType === "short_text");
    for (const q of textQuestions) {
      const answers = await db
        .select({ textValue: surveyAnswersTable.textValue })
        .from(surveyAnswersTable)
        .innerJoin(surveyResponsesTable, and(
          eq(surveyAnswersTable.surveyResponseId, surveyResponsesTable.id),
          eq(surveyResponsesTable.isSubmitted, true),
          eq(surveyResponsesTable.surveyCycleId, surveyId)
        ))
        .where(eq(surveyAnswersTable.surveyQuestionId, q.id));

      const texts = answers.map((a) => a.textValue).filter((t): t is string => !!t && t.trim().length > 0);
      if (texts.length > 0) {
        result.push({ questionId: q.id, questionNo: q.questionNo, questionText: q.questionText, sectionName: section.name, responses: texts, responseCount: texts.length });
      }
    }
  }

  return res.json({ safe: true, submittedCount, questions: result });
});

// ── Action Items ──────────────────────────────────────
router.get("/action-items", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin" && user.role !== "leader") return res.status(403).json({ error: "Admin or leader only" });

  const { surveyId } = req.query;
  const items = surveyId
    ? await db.select().from(actionItemsTable).where(eq(actionItemsTable.surveyCycleId, String(surveyId))).orderBy(desc(actionItemsTable.createdAt))
    : await db.select().from(actionItemsTable).orderBy(desc(actionItemsTable.createdAt));

  return res.json(items);
});

router.post("/action-items", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin" && user.role !== "leader") return res.status(403).json({ error: "Admin or leader only" });

  const { surveyCycleId, category, title, description, owner, priority, status, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: "title required" });

  const [item] = await db.insert(actionItemsTable).values({
    surveyCycleId: surveyCycleId || null,
    category: category || "company_wide",
    title,
    description: description || null,
    owner: owner || null,
    priority: priority || "medium",
    status: status || "todo",
    dueDate: dueDate ? new Date(dueDate) : null,
    createdBy: user.id,
  }).returning();

  return res.status(201).json(item);
});

router.patch("/action-items/:id", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin" && user.role !== "leader") return res.status(403).json({ error: "Admin or leader only" });

  const { id } = req.params;
  const { category, title, description, owner, priority, status, dueDate } = req.body;

  const updates: Record<string, unknown> = {};
  if (category !== undefined) updates.category = category;
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (owner !== undefined) updates.owner = owner;
  if (priority !== undefined) updates.priority = priority;
  if (status !== undefined) updates.status = status;
  if (dueDate !== undefined) updates.dueDate = dueDate ? new Date(dueDate) : null;

  const [updated] = await db.update(actionItemsTable).set(updates).where(eq(actionItemsTable.id, id)).returning();
  if (!updated) return res.status(404).json({ error: "Not found" });
  return res.json(updated);
});

router.delete("/action-items/:id", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const { id } = req.params;
  await db.delete(actionItemsTable).where(eq(actionItemsTable.id, id));
  return res.json({ ok: true });
});

export default router;
