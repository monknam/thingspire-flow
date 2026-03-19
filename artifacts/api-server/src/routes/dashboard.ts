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
} from "@workspace/db";
import { eq, count, avg, and, sql } from "drizzle-orm";
import { getCurrentUser } from "../lib/session.js";

const router = Router();

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

  const activeSurveys = surveys.filter((s) => s.status === "active").length;

  const totalUsers = Number(userCount.count);

  const recentSurveys = await Promise.all(
    surveys.map(async (s) => {
      const [submitted] = await db
        .select({ count: count() })
        .from(surveyResponsesTable)
        .where(and(
          eq(surveyResponsesTable.surveyCycleId, s.id),
          eq(surveyResponsesTable.isSubmitted, true)
        ));
      const [started] = await db
        .select({ count: count() })
        .from(surveyResponsesTable)
        .where(eq(surveyResponsesTable.surveyCycleId, s.id));

      const submittedCount = Number(submitted.count);
      const startedCount = Number(started.count);
      const responseRate = totalUsers > 0 ? (submittedCount / totalUsers) * 100 : 0;

      return {
        id: s.id,
        title: s.title,
        status: s.status,
        year: s.year,
        quarter: s.quarter,
        submittedCount,
        startedCount,
        totalEligible: totalUsers,
        responseRate: Math.round(responseRate * 10) / 10,
      };
    })
  );

  res.json({
    totalUsers,
    totalDepartments: Number(deptCount.count),
    activeSurveys,
    recentSurveys,
  });
});

router.get("/surveys/:surveyId", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin" && user.role !== "leader") {
    return res.status(403).json({ error: "Admin or leader only" });
  }

  const { surveyId } = req.params;

  const surveys = await db
    .select()
    .from(surveyCyclesTable)
    .where(eq(surveyCyclesTable.id, surveyId))
    .limit(1);

  if (!surveys[0]) return res.status(404).json({ error: "Survey not found" });
  const survey = surveys[0];

  const [totalUsersRow] = await db
    .select({ count: count() })
    .from(usersTable)
    .where(eq(usersTable.employmentStatus, "active"));
  const totalEligible = Number(totalUsersRow.count);

  const [submittedRow] = await db
    .select({ count: count() })
    .from(surveyResponsesTable)
    .where(and(
      eq(surveyResponsesTable.surveyCycleId, surveyId),
      eq(surveyResponsesTable.isSubmitted, true)
    ));
  const submittedCount = Number(submittedRow.count);
  const overallResponseRate = totalEligible > 0 ? Math.round((submittedCount / totalEligible) * 1000) / 10 : 0;

  // Department stats
  const departments = await db.select().from(departmentsTable).where(eq(departmentsTable.isActive, true));
  const departmentStats = await Promise.all(
    departments.map(async (dept) => {
      const [deptUsers] = await db
        .select({ count: count() })
        .from(usersTable)
        .where(and(
          eq(usersTable.departmentId, dept.id),
          eq(usersTable.employmentStatus, "active")
        ));
      const deptTotal = Number(deptUsers.count);

      const [deptSubmitted] = await db
        .select({ count: count() })
        .from(surveyResponsesTable)
        .where(and(
          eq(surveyResponsesTable.surveyCycleId, surveyId),
          eq(surveyResponsesTable.respondentDepartmentId, dept.id),
          eq(surveyResponsesTable.isSubmitted, true)
        ));
      const deptSubmittedCount = Number(deptSubmitted.count);

      return {
        departmentId: dept.id,
        departmentName: dept.name,
        submittedCount: deptSubmittedCount,
        totalEligible: deptTotal,
        responseRate: deptTotal > 0 ? Math.round((deptSubmittedCount / deptTotal) * 1000) / 10 : 0,
      };
    })
  );

  // Section/question results
  const sections = await db
    .select()
    .from(surveySectionsTable)
    .where(eq(surveySectionsTable.surveyCycleId, surveyId))
    .orderBy(surveySectionsTable.sortOrder);

  const sectionResults = await Promise.all(
    sections.map(async (section) => {
      const questions = await db
        .select()
        .from(surveyQuestionsTable)
        .where(eq(surveyQuestionsTable.surveySectionId, section.id))
        .orderBy(surveyQuestionsTable.sortOrder);

      const questionResults = await Promise.all(
        questions.map(async (q) => {
          const answers = await db
            .select({
              numericValue: surveyAnswersTable.numericValue,
            })
            .from(surveyAnswersTable)
            .innerJoin(
              surveyResponsesTable,
              and(
                eq(surveyAnswersTable.surveyResponseId, surveyResponsesTable.id),
                eq(surveyResponsesTable.isSubmitted, true)
              )
            )
            .where(eq(surveyAnswersTable.surveyQuestionId, q.id));

          const numericAnswers = answers
            .map((a) => a.numericValue)
            .filter((v): v is number => v !== null);

          const distribution = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 } as Record<string, number>;
          for (const v of numericAnswers) {
            if (v >= 1 && v <= 5) distribution[String(v)]++;
          }

          const avgScore = numericAnswers.length > 0
            ? Math.round((numericAnswers.reduce((a, b) => a + b, 0) / numericAnswers.length) * 100) / 100
            : null;

          return {
            questionId: q.id,
            questionText: q.questionText,
            questionNo: q.questionNo,
            questionType: q.questionType,
            avgScore,
            responseCount: numericAnswers.length,
            distribution,
          };
        })
      );

      const likertScores = questionResults
        .filter((qr) => qr.questionType === "likert_5" && qr.avgScore !== null)
        .map((qr) => qr.avgScore as number);

      const sectionAvg = likertScores.length > 0
        ? Math.round((likertScores.reduce((a, b) => a + b, 0) / likertScores.length) * 100) / 100
        : null;

      return {
        sectionId: section.id,
        sectionName: section.name,
        sortOrder: section.sortOrder,
        avgScore: sectionAvg,
        questionResults,
      };
    })
  );

  res.json({
    survey: {
      id: survey.id,
      title: survey.title,
      description: survey.description,
      year: survey.year,
      quarter: survey.quarter,
      status: survey.status,
      startAt: survey.startAt,
      endAt: survey.endAt,
      introTitle: survey.introTitle,
      introPurpose: survey.introPurpose,
      introDirection: survey.introDirection,
      introBackground: survey.introBackground,
      introConfidentiality: survey.introConfidentiality,
      introGuide: survey.introGuide,
      anonymousMinCount: survey.anonymousMinCount,
      createdAt: survey.createdAt,
      updatedAt: survey.updatedAt,
    },
    overallResponseRate,
    submittedCount,
    totalEligible,
    departmentStats,
    sectionResults,
  });
});

export default router;
