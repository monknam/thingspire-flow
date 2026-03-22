import { useProtectedRoute } from "@/hooks/use-auth";
import { Shell } from "@/components/layout/Shell";
import { useGetDashboardOverview } from "@workspace/api-client-react";
import { Users, Building2, ClipboardCheck, ArrowRight, BarChart3, AlertTriangle, Target, Users2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const UPCOMING_MODULES = [
  { label: "360 피드백", icon: Users2, description: "구성원 간 상호 피드백" },
  { label: "성과 운영", icon: Award, description: "정기 성과 점검 및 운영" },
  { label: "OKR 운영", icon: Target, description: "조직 목표 정렬 및 실행 추적" },
];

export default function Dashboard() {
  const { isAuthorized, user } = useProtectedRoute();
  const { data: overview, isLoading, error } = useGetDashboardOverview();

  if (!isAuthorized) return null;

  return (
    <Shell>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="text-sm font-medium text-[hsl(var(--neutral-500))] mb-1">안녕하세요</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--neutral-900))]">{user?.fullName}님</h1>
            <p className="text-[hsl(var(--neutral-500))] mt-1 text-sm">우리 조직의 현재 상태와 진행 중인 내부 진단을 확인하세요.</p>
          </div>
          {user?.role === "admin" && (
            <Link
              href="/admin/surveys"
              className="ts-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              조직 진단 운영 <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-[hsl(var(--neutral-200))] rounded-xl"></div>
            ))}
          </div>
        ) : error ? (
          <div className="ts-card p-8 flex flex-col items-center justify-center text-center">
            <AlertTriangle className="w-10 h-10 text-[hsl(var(--red-500))] mb-3" />
            <p className="text-[hsl(var(--neutral-900))] font-semibold mb-1">대시보드 데이터를 불러오지 못했습니다.</p>
            <p className="text-sm text-[hsl(var(--neutral-500))]">백엔드 연결 또는 권한 설정을 확인해주세요.</p>
          </div>
        ) : overview ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="총 구성원" value={overview.totalUsers} icon={Users} accent="primary" delay={0.1} />
              <StatCard title="총 부서 수" value={overview.totalDepartments} icon={Building2} accent="secondary" delay={0.2} />
              <StatCard title="진행 중인 진단" value={overview.activeSurveys} icon={ClipboardCheck} accent="neutral" delay={0.3} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[hsl(var(--neutral-900))] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[hsl(var(--primary-400))]" />
                  현재 진행 중인 조직 진단
                </h2>
                {(user?.role === "admin" || user?.role === "leader") && (
                  <Link
                    href="/admin/results"
                    className="text-xs font-medium text-[hsl(var(--primary-400))] hover:underline flex items-center gap-1"
                  >
                    진단 리포트 보기 <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
              <div className="space-y-3">
                {overview.recentSurveys?.length === 0 ? (
                  <div className="ts-card p-12 flex flex-col items-center justify-center text-center">
                    <ClipboardCheck className="w-12 h-12 text-[hsl(var(--neutral-300))] mb-3" />
                    <p className="text-[hsl(var(--neutral-500))] text-sm">아직 진행된 조직 진단이 없습니다.</p>
                  </div>
                ) : (
                  overview.recentSurveys?.map((survey, i) => (
                    <motion.div
                      key={survey.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (i * 0.08) }}
                      className="ts-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[hsl(var(--primary-200))] transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <StatusBadge status={survey.status} />
                          <span className="text-xs text-[hsl(var(--neutral-500))]">{survey.year}년 {survey.quarter ? `${survey.quarter}분기` : ""}</span>
                        </div>
                        <h3 className="font-bold text-[hsl(var(--neutral-900))]">{survey.title}</h3>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-xs text-[hsl(var(--neutral-500))] mb-1">응답률</p>
                          <p className="text-xl font-bold text-[hsl(var(--neutral-900))]">{survey.responseRate.toFixed(1)}%</p>
                        </div>
                        <div className="text-center hidden sm:block">
                          <p className="text-xs text-[hsl(var(--neutral-500))] mb-1">응답자</p>
                          <p className="text-sm font-semibold text-[hsl(var(--neutral-700))]">{survey.submittedCount} / {survey.totalEligible}</p>
                        </div>
                        <Link
                          href={user?.role === "member" ? `/surveys/${survey.id}/intro` : `/admin/results`}
                          className="w-9 h-9 rounded-lg bg-[hsl(var(--primary-50))] text-[hsl(var(--primary-400))] hover:bg-[hsl(var(--primary-400))] hover:text-white transition-colors flex items-center justify-center"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-[hsl(var(--neutral-900))] mb-4">
                사내 확장 예정 모듈
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {UPCOMING_MODULES.map((mod, i) => (
                  <motion.div
                    key={mod.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    className="ts-card p-5 flex items-start gap-4 opacity-60"
                  >
                    <div className="p-2.5 rounded-lg bg-[hsl(var(--neutral-100))] text-[hsl(var(--neutral-400))] shrink-0">
                      <mod.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[hsl(var(--neutral-700))]">{mod.label}</p>
                      <p className="text-xs text-[hsl(var(--neutral-500))] mt-0.5">{mod.description}</p>
                      <span className="mt-2 inline-block text-[10px] font-semibold bg-[hsl(var(--neutral-100))] text-[hsl(var(--neutral-500))] px-2 py-0.5 rounded-full">
                        준비 중
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </Shell>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-[hsl(142_76%_36%/0.1)] text-[hsl(var(--green-500))]",
    draft: "bg-[hsl(var(--neutral-100))] text-[hsl(var(--neutral-600))]",
    closed: "bg-[hsl(207_90%_54%/0.1)] text-[hsl(var(--blue-400))]",
  };
  const labels: Record<string, string> = { active: "진행중", draft: "준비중", closed: "종료됨" };
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${styles[status] || styles.draft}`}>
      {labels[status] || status}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, accent, delay }: { title: string; value: number; icon: any; accent: string; delay: number }) {
  const accentColor: Record<string, string> = {
    primary: "bg-[hsl(var(--primary-50))] text-[hsl(var(--primary-400))]",
    secondary: "bg-[hsl(var(--secondary-100))] text-[hsl(var(--secondary-400))]",
    neutral: "bg-[hsl(var(--neutral-100))] text-[hsl(var(--neutral-600))]",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="ts-card p-5 flex items-center gap-4"
    >
      <div className={`p-3 rounded-lg ${accentColor[accent]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-medium text-[hsl(var(--neutral-500))] mb-0.5">{title}</p>
        <p className="text-2xl font-bold text-[hsl(var(--neutral-900))]">{value}</p>
      </div>
    </motion.div>
  );
}
