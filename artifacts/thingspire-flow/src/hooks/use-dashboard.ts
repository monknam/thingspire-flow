import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE = `${import.meta.env.BASE_URL}api`;

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { credentials: "include", ...options });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ── Types ──────────────────────────────────────────────

export interface QuestionResult {
  questionId: string;
  questionText: string;
  questionNo: number | null;
  questionType: string;
  avgScore: number | null;
  responseCount: number;
  distribution: Record<string, number>;
}

export interface SectionResult {
  sectionId: string;
  sectionName: string;
  description: string | null;
  sortOrder: number;
  avgScore: number | null;
  questionResults: QuestionResult[];
}

export interface DeptStat {
  departmentId: string;
  departmentName: string;
  submittedCount: number;
  totalEligible: number;
  responseRate: number;
}

export interface SurveyDashboard {
  survey: { id: string; title: string; description: string | null; year: number; quarter: number | null; status: string; anonymousMinCount: number };
  overallResponseRate: number;
  submittedCount: number;
  totalEligible: number;
  departmentStats: DeptStat[];
  sectionResults: SectionResult[];
}

export interface QualitativeQuestion {
  questionId: string;
  questionNo: number | null;
  questionText: string;
  sectionName: string;
  responses: string[];
  responseCount: number;
}

export interface QualitativeData {
  safe: boolean;
  submittedCount: number;
  minRequired?: number;
  questions: QualitativeQuestion[];
}

export interface ActionItem {
  id: string;
  surveyCycleId: string | null;
  category: "company_wide" | "team_leader" | "management" | "executive";
  title: string;
  description: string | null;
  owner: string | null;
  priority: "high" | "medium" | "low";
  status: "todo" | "in_progress" | "done";
  dueDate: string | null;
  createdAt: string;
}

// ── Hooks ──────────────────────────────────────────────

export function useSurveyDashboard(surveyId: string | null) {
  return useQuery<SurveyDashboard>({
    queryKey: ["dashboard", "survey", surveyId],
    queryFn: () => apiFetch(`/dashboard/surveys/${surveyId}`),
    enabled: !!surveyId,
    staleTime: 30_000,
  });
}

export function useQualitative(surveyId: string | null) {
  return useQuery<QualitativeData>({
    queryKey: ["dashboard", "qualitative", surveyId],
    queryFn: () => apiFetch(`/dashboard/surveys/${surveyId}/qualitative`),
    enabled: !!surveyId,
    staleTime: 30_000,
  });
}

export function useActionItems(surveyId: string | null) {
  return useQuery<ActionItem[]>({
    queryKey: ["action-items", surveyId],
    queryFn: () => apiFetch(`/dashboard/action-items${surveyId ? `?surveyId=${surveyId}` : ""}`),
    staleTime: 10_000,
  });
}

export function useCreateActionItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ActionItem>) =>
      apiFetch("/dashboard/action-items", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["action-items"] }),
  });
}

export function useUpdateActionItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<ActionItem> & { id: string }) =>
      apiFetch(`/dashboard/action-items/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["action-items"] }),
  });
}

export function useDeleteActionItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/dashboard/action-items/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["action-items"] }),
  });
}

// ── Composite Index Helpers ────────────────────────────

export function computeCompositeIndices(sectionResults: SectionResult[]) {
  const sectionMap = Object.fromEntries(sectionResults.map((s) => [s.sectionName, s.avgScore]));

  const avg = (...keys: string[]) => {
    const vals = keys.map((k) => sectionMap[k]).filter((v): v is number => v !== null && v !== undefined);
    if (!vals.length) return null;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100;
  };

  const changeStability = avg("방향성과 전략", "팀 분위기와 심리적 안전감");
  const executionBottleneck = avg("실행력", "협업");
  const atmosphereTemp = avg("팀 분위기와 심리적 안전감", "몰입과 동기부여");

  const label = (score: number | null) => {
    if (score === null) return { label: "데이터 없음", color: "neutral" as const };
    if (score >= 4.0) return { label: "안정적", color: "green" as const };
    if (score >= 3.0) return { label: "주의 필요", color: "yellow" as const };
    return { label: "불안정", color: "red" as const };
  };

  return {
    changeStability: { score: changeStability, ...label(changeStability) },
    executionBottleneck: { score: executionBottleneck, ...label(executionBottleneck) },
    atmosphereTemp: { score: atmosphereTemp, ...label(atmosphereTemp) },
  };
}

export function computeStrengthsAndRisks(sectionResults: SectionResult[]) {
  const withScores = sectionResults.filter((s) => s.avgScore !== null).sort((a, b) => (b.avgScore ?? 0) - (a.avgScore ?? 0));
  return {
    strengths: withScores.slice(0, 3),
    risks: withScores.slice(-3).reverse(),
  };
}

export function buildDiagnosisSentence(sectionResults: SectionResult[]): string {
  const sectionMap = Object.fromEntries(sectionResults.map((s) => [s.sectionName, s.avgScore]));
  const get = (k: string) => sectionMap[k];

  const direction = get("방향성과 전략");
  const execution = get("실행력");
  const collab = get("협업");
  const climate = get("팀 분위기와 심리적 안전감");
  const health = get("조직 건강성");

  if (!direction && !execution) return "응답 데이터가 아직 충분하지 않아 진단을 생성할 수 없습니다.";

  const parts: string[] = [];

  if (direction && direction >= 3.5) parts.push("방향성 정렬은 양호한 편");
  else if (direction) parts.push("방향성과 전략 공유가 미흡");

  if (execution && collab) {
    if (execution < 3.0 || collab < 3.0) parts.push("실행과 협업에서 병목이 감지됨");
    else parts.push("실행·협업은 비교적 안정적");
  }

  if (climate && climate < 3.0) parts.push("심리적 안전감과 조직 분위기 개선이 시급");
  else if (climate && climate >= 3.5) parts.push("팀 분위기는 긍정적");

  if (health && health < 3.0) parts.push("조직 건강성(신뢰·공정성)이 낮아 우선 관리가 필요");

  if (!parts.length) return "전반적으로 평균적인 수준의 조직 상태를 보이고 있습니다. 개별 섹션을 자세히 검토하세요.";
  return parts.join("하며, ") + ".";
}

export function scoreColor(score: number | null): string {
  if (score === null) return "text-[hsl(var(--neutral-400))]";
  if (score >= 4.0) return "text-[hsl(var(--green-500))]";
  if (score >= 3.0) return "text-[hsl(var(--yellow-400))]";
  return "text-[hsl(var(--red-500))]";
}

export function scoreBg(score: number | null): string {
  if (score === null) return "bg-[hsl(var(--neutral-100))]";
  if (score >= 4.0) return "bg-[hsl(142_76%_36%/0.1)]";
  if (score >= 3.0) return "bg-[hsl(38_92%_50%/0.12)]";
  return "bg-[hsl(0_84%_60%/0.1)]";
}
