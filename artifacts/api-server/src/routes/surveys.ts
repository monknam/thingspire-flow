import { Router } from "express";
import { db, surveyCyclesTable, surveySectionsTable, surveyQuestionsTable } from "@workspace/db";
import { eq, desc, asc } from "drizzle-orm";
import { getCurrentUser } from "../lib/session.js";

const router = Router();

// GET /surveys
router.get("/", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const surveys = await db
    .select()
    .from(surveyCyclesTable)
    .orderBy(desc(surveyCyclesTable.year), desc(surveyCyclesTable.createdAt));

  return res.json(surveys.map(mapCycle));
});

// POST /surveys
router.post("/", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const { title, description, year, quarter, startAt, endAt, introTitle, introPurpose, introDirection, introBackground, introConfidentiality, introGuide } = req.body;
  if (!title || !year) return res.status(400).json({ error: "Title and year required" });

  const [cycle] = await db
    .insert(surveyCyclesTable)
    .values({
      title,
      description: description || null,
      year: parseInt(year),
      quarter: quarter ? parseInt(quarter) : null,
      startAt: startAt ? new Date(startAt) : null,
      endAt: endAt ? new Date(endAt) : null,
      introTitle: introTitle || null,
      introPurpose: introPurpose || null,
      introDirection: introDirection || null,
      introBackground: introBackground || null,
      introConfidentiality: introConfidentiality || null,
      introGuide: introGuide || null,
      createdBy: user.id,
    })
    .returning();

  return res.status(201).json(mapCycle(cycle));
});

// GET /surveys/:id
router.get("/:id", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const cycles = await db
    .select()
    .from(surveyCyclesTable)
    .where(eq(surveyCyclesTable.id, id))
    .limit(1);

  if (!cycles[0]) return res.status(404).json({ error: "Survey not found" });

  const sections = await db
    .select()
    .from(surveySectionsTable)
    .where(eq(surveySectionsTable.surveyCycleId, id))
    .orderBy(asc(surveySectionsTable.sortOrder));

  const questions = sections.length > 0
    ? await db
      .select()
      .from(surveyQuestionsTable)
      .where(
        eq(surveyQuestionsTable.surveySectionId, sections[0]?.id ?? "")
      )
      .orderBy(asc(surveyQuestionsTable.sortOrder))
    : [];

  // fetch all questions for all sections
  const allQuestions = await db
    .select()
    .from(surveyQuestionsTable)
    .orderBy(asc(surveyQuestionsTable.sortOrder));

  const sectionMap = new Map<string, typeof allQuestions>();
  for (const q of allQuestions) {
    if (!sectionMap.has(q.surveySectionId)) sectionMap.set(q.surveySectionId, []);
    sectionMap.get(q.surveySectionId)!.push(q);
  }

  return res.json({
    ...mapCycle(cycles[0]),
    sections: sections.map((s) => ({
      id: s.id,
      surveyCycleId: s.surveyCycleId,
      name: s.name,
      description: s.description,
      sortOrder: s.sortOrder,
      createdAt: s.createdAt,
      questions: (sectionMap.get(s.id) || []).map(mapQuestion),
    })),
  });
});

// PATCH /surveys/:id
router.patch("/:id", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const { id } = req.params;
  const fields = ["title", "description", "year", "quarter", "startAt", "endAt", "introTitle", "introPurpose", "introDirection", "introBackground", "introConfidentiality", "introGuide"];
  const updates: any = {};
  for (const f of fields) {
    if (req.body[f] !== undefined) {
      if (f === "year" || f === "quarter") updates[f] = req.body[f] ? parseInt(req.body[f]) : null;
      else if (f === "startAt" || f === "endAt") updates[f] = req.body[f] ? new Date(req.body[f]) : null;
      else updates[f] = req.body[f];
    }
  }

  const [cycle] = await db
    .update(surveyCyclesTable)
    .set(updates)
    .where(eq(surveyCyclesTable.id, id))
    .returning();

  if (!cycle) return res.status(404).json({ error: "Survey not found" });
  return res.json(mapCycle(cycle));
});

// POST /surveys/:id/activate
router.post("/:id/activate", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const [cycle] = await db
    .update(surveyCyclesTable)
    .set({ status: "active", startAt: new Date() })
    .where(eq(surveyCyclesTable.id, req.params.id))
    .returning();

  if (!cycle) return res.status(404).json({ error: "Survey not found" });
  return res.json(mapCycle(cycle));
});

// POST /surveys/:id/close
router.post("/:id/close", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const [cycle] = await db
    .update(surveyCyclesTable)
    .set({ status: "closed", endAt: new Date() })
    .where(eq(surveyCyclesTable.id, req.params.id))
    .returning();

  if (!cycle) return res.status(404).json({ error: "Survey not found" });
  return res.json(mapCycle(cycle));
});

// GET /surveys/:surveyId/sections
router.get("/:surveyId/sections", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const sections = await db
    .select()
    .from(surveySectionsTable)
    .where(eq(surveySectionsTable.surveyCycleId, req.params.surveyId))
    .orderBy(asc(surveySectionsTable.sortOrder));

  return res.json(sections.map(mapSection));
});

// POST /surveys/:surveyId/sections
router.post("/:surveyId/sections", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const { name, description, sortOrder } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  const [section] = await db
    .insert(surveySectionsTable)
    .values({
      surveyCycleId: req.params.surveyId,
      name,
      description: description || null,
      sortOrder: sortOrder || 1,
    })
    .returning();

  return res.status(201).json(mapSection(section));
});

// GET /surveys/:surveyId/my-response
router.get("/:surveyId/my-response", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { db: dbClient, surveyResponsesTable, surveyAnswersTable } = await import("@workspace/db");
  const { eq: eqOp, and } = await import("drizzle-orm");

  const responses = await dbClient
    .select()
    .from(surveyResponsesTable)
    .where(
      and(
        eqOp(surveyResponsesTable.surveyCycleId, req.params.surveyId),
        eqOp(surveyResponsesTable.respondentUserId, user.id)
      )
    )
    .limit(1);

  if (!responses[0]) return res.status(404).json({ error: "No response found" });

  const answers = await dbClient
    .select()
    .from(surveyAnswersTable)
    .where(eqOp(surveyAnswersTable.surveyResponseId, responses[0].id));

  return res.json({
    id: responses[0].id,
    surveyCycleId: responses[0].surveyCycleId,
    isSubmitted: responses[0].isSubmitted,
    startedAt: responses[0].startedAt,
    submittedAt: responses[0].submittedAt,
    answers: answers.map((a) => ({
      id: a.id,
      surveyResponseId: a.surveyResponseId,
      surveyQuestionId: a.surveyQuestionId,
      numericValue: a.numericValue,
      textValue: a.textValue,
    })),
  });
});

// POST /surveys/:surveyId/responses/start
router.post("/:surveyId/responses/start", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { db: dbClient, surveyResponsesTable, surveyAnswersTable } = await import("@workspace/db");
  const { eq: eqOp, and } = await import("drizzle-orm");

  const existing = await dbClient
    .select()
    .from(surveyResponsesTable)
    .where(
      and(
        eqOp(surveyResponsesTable.surveyCycleId, req.params.surveyId),
        eqOp(surveyResponsesTable.respondentUserId, user.id)
      )
    )
    .limit(1);

  let response = existing[0];

  if (!response) {
    const [created] = await dbClient
      .insert(surveyResponsesTable)
      .values({
        surveyCycleId: req.params.surveyId,
        respondentUserId: user.id,
        respondentDepartmentId: user.departmentId,
      })
      .returning();
    response = created;
  }

  const answers = await dbClient
    .select()
    .from(surveyAnswersTable)
    .where(eqOp(surveyAnswersTable.surveyResponseId, response.id));

  return res.json({
    id: response.id,
    surveyCycleId: response.surveyCycleId,
    isSubmitted: response.isSubmitted,
    startedAt: response.startedAt,
    submittedAt: response.submittedAt,
    answers: answers.map((a) => ({
      id: a.id,
      surveyResponseId: a.surveyResponseId,
      surveyQuestionId: a.surveyQuestionId,
      numericValue: a.numericValue,
      textValue: a.textValue,
    })),
  });
});

function mapCycle(c: any) {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    year: c.year,
    quarter: c.quarter,
    status: c.status,
    startAt: c.startAt,
    endAt: c.endAt,
    introTitle: c.introTitle,
    introPurpose: c.introPurpose,
    introDirection: c.introDirection,
    introBackground: c.introBackground,
    introConfidentiality: c.introConfidentiality,
    introGuide: c.introGuide,
    anonymousMinCount: c.anonymousMinCount,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  };
}

function mapSection(s: any) {
  return {
    id: s.id,
    surveyCycleId: s.surveyCycleId,
    name: s.name,
    description: s.description,
    sortOrder: s.sortOrder,
    createdAt: s.createdAt,
  };
}

function mapQuestion(q: any) {
  return {
    id: q.id,
    surveySectionId: q.surveySectionId,
    questionNo: q.questionNo,
    questionText: q.questionText,
    questionType: q.questionType,
    isRequired: q.isRequired,
    sortOrder: q.sortOrder,
    isActive: q.isActive,
    createdAt: q.createdAt,
  };
}

export default router;
