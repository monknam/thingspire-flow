import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./use-auth";

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

// ── Dashboard Overview (Supabase direct) ───────────────

export interface DashboardOverview {
  totalUsers: number;
  totalDepartments: number;
  activeSurveys: number;
  recentSurveys: {
    id: string;
    title: string;
    year: number;
    quarter: number | null;
    status: string;
    responseRate: number;
    submittedCount: number;
    totalEligible: number;
  }[];
}

export function useGetDashboardOverview() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: async (): Promise<DashboardOverview> => {
      const [usersRes, deptRes, activeRes, surveysRes] = await Promise.all([
        supabase!.from("profiles").select("*", { count: "exact", head: true }),
        supabase!.from("departments").select("*", { count: "exact", head: true }),
        supabase!.from("survey_cycles").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase!
          .from("survey_cycles")
          .select("id, title, year, quarter, status")
          .in("status", ["active", "closed"])
          .order("year", { ascending: false })
          .limit(5),
      ]);

      const totalUsers = usersRes.count ?? 0;
      const cycles = (surveysRes.data ?? []) as { id: string; title: string; year: number; quarter: number | null; status: string }[];

      const recentSurveys = await Promise.all(
        cycles.map(async (s) => {
          const { count } = await supabase!
            .from("survey_responses")
            .select("*", { count: "exact", head: true })
            .eq("survey_cycle_id", s.id)
            .eq("is_submitted", true);
          const submitted = count ?? 0;
          return {
            ...s,
            submittedCount: submitted,
            totalEligible: totalUsers,
            responseRate: totalUsers > 0 ? (submitted / totalUsers) * 100 : 0,
          };
        })
      );

      return {
        totalUsers,
        totalDepartments: deptRes.count ?? 0,
        activeSurveys: activeRes.count ?? 0,
        recentSurveys,
      };
    },
    enabled: !!supabase && !!user,
    staleTime: 2 * 60 * 1000,
  });
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

// ── Group Comparison Types ─────────────────────────────
export interface GroupSectionData {
  sectionId: string;
  sectionName: string;
  avgScore: number | null;
}

export interface GroupData {
  count: number;
  safe: boolean;
  sections: GroupSectionData[];
}

export interface GroupComparisonData {
  groups: Record<string, GroupData>;
  minRequired: number;
}

export const GROUP_LABELS: Record<string, string> = { dev: "개발 직군", non_dev: "비개발 직군", management: "경영지원" };
export const GROUP_COLORS: Record<string, string> = { dev: "hsl(207 90% 54%)", non_dev: "hsl(142 76% 36%)", management: "hsl(38 92% 50%)" };

export function useGroupComparison(surveyId: string | null) {
  return useQuery<GroupComparisonData>({
    queryKey: ["dashboard", "group-comparison", surveyId],
    queryFn: () => apiFetch(`/dashboard/surveys/${surveyId}/group-comparison`),
    enabled: !!surveyId,
    staleTime: 30_000,
  });
}

// ── Qualitative Theme Mapping ──────────────────────────
export interface QualitativeTheme {
  id: string;
  label: string;
  description: string;
  questions: QualitativeQuestion[];
  icon: string;
}

export const QUALITATIVE_THEME_MAP: Array<{ qNos: number[]; id: string; label: string; description: string; icon: string }> = [
  { qNos: [46], id: "strength", label: "강점", description: "구성원이 공통으로 인식하는 조직의 강점", icon: "✅" },
  { qNos: [47, 48], id: "problem", label: "핵심 문제", description: "가장 심각하게 인식되는 조직 문제와 구체적 사례", icon: "⚠️" },
  { qNos: [49], id: "improvement", label: "개선 우선과제", description: "가장 먼저 바꿔야 할 것에 대한 구성원의 견해", icon: "🔧" },
  { qNos: [50], id: "leadership", label: "리더십 피드백", description: "리더십(팀장/임원/대표)에 대한 개선 요청", icon: "👔" },
  { qNos: [51], id: "mgmt_request", label: "경영관리실 요청", description: "경영관리실(HR/운영)에 대한 구체적 요청", icon: "🏢" },
  { qNos: [52, 53], id: "system", label: "시스템 / 도구 / 환경", description: "불편하거나 개선이 필요한 업무 도구 및 환경", icon: "💻" },
  { qNos: [54], id: "open", label: "자유 의견", description: "추가로 전하고 싶은 자유로운 의견", icon: "💬" },
];

export function groupQualitativeByTheme(questions: QualitativeQuestion[]): QualitativeTheme[] {
  return QUALITATIVE_THEME_MAP.map((themeMap) => {
    const qs = questions.filter((q) => q.questionNo !== null && themeMap.qNos.includes(q.questionNo));
    return { ...themeMap, questions: qs };
  }).filter((t) => t.questions.length > 0);
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
