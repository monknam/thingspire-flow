import { Router } from "express";
import { db, surveyResponsesTable, surveyAnswersTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "../lib/session.js";

const router = Router({ mergeParams: true });

// PUT /responses/:responseId/answers
router.put("/:responseId/answers", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { responseId } = req.params;
  const { answers } = req.body;

  const response = await db
    .select()
    .from(surveyResponsesTable)
    .where(
      and(
        eq(surveyResponsesTable.id, responseId),
        eq(surveyResponsesTable.respondentUserId, user.id)
      )
    )
    .limit(1);

  if (!response[0]) return res.status(404).json({ error: "Response not found" });
  if (response[0].isSubmitted) return res.status(400).json({ error: "Response already submitted" });

  if (!Array.isArray(answers)) return res.status(400).json({ error: "answers must be an array" });

  for (const ans of answers) {
    const { surveyQuestionId, numericValue, textValue } = ans;
    if (!surveyQuestionId) continue;

    const existing = await db
      .select()
      .from(surveyAnswersTable)
      .where(
        and(
          eq(surveyAnswersTable.surveyResponseId, responseId),
          eq(surveyAnswersTable.surveyQuestionId, surveyQuestionId)
        )
      )
      .limit(1);

    if (existing[0]) {
      await db
        .update(surveyAnswersTable)
        .set({
          numericValue: numericValue ?? null,
          textValue: textValue ?? null,
        })
        .where(eq(surveyAnswersTable.id, existing[0].id));
    } else {
      await db
        .insert(surveyAnswersTable)
        .values({
          surveyResponseId: responseId,
          surveyQuestionId,
          numericValue: numericValue ?? null,
          textValue: textValue ?? null,
        });
    }
  }

  return res.json({ success: true, message: "Answers saved" });
});

// POST /responses/:responseId/submit
router.post("/:responseId/submit", async (req, res) => {
  const user = await getCurrentUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { responseId } = req.params;

  const responses = await db
    .select()
    .from(surveyResponsesTable)
    .where(
      and(
        eq(surveyResponsesTable.id, responseId),
        eq(surveyResponsesTable.respondentUserId, user.id)
      )
    )
    .limit(1);

  if (!responses[0]) return res.status(404).json({ error: "Response not found" });
  if (responses[0].isSubmitted) return res.status(400).json({ error: "Already submitted" });

  await db
    .update(surveyResponsesTable)
    .set({ isSubmitted: true, submittedAt: new Date() })
    .where(eq(surveyResponsesTable.id, responseId));

  return res.json({ success: true, message: "Survey submitted successfully" });
});

export default router;
