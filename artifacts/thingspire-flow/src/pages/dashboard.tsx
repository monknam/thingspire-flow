import { useProtectedRoute } from "@/hooks/use-auth";
import { Shell } from "@/components/layout/Shell";
import { useGetDashboardOverview } from "@workspace/api-client-react";
import { Users, Building2, ClipboardCheck, ArrowRight, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Dashboard() {
  const { isAuthorized, user } = useProtectedRoute();
  const { data: overview, isLoading } = useGetDashboardOverview();

  if (!isAuthorized) return null;

  return (
    <Shell>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="text-sm font-medium text-[hsl(var(--neutral-500))] mb-1">안녕하세요</p>
            <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--neutral-900))]">{user?.fullName}님</h1>
            <p className="text-[hsl(var(--neutral-500))] mt-1 text-sm">조직 현황을 확인하세요.</p>
          </div>
          {user?.role === 'admin' && (
            <Link
              href="/admin/surveys/new"
              className="ts-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
            >
              새 설문 만들기 <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        {/* Stat Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-28 bg-[hsl(var(--neutral-200))] rounded-xl"></div>
            ))}
          </div>
        ) : overview ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="진행 중인 설문" value={overview.activeSurveys} icon={ClipboardCheck} accent="primary" delay={0.1} />
              <StatCard title="총 부서 수" value={overview.totalDepartments} icon={Building2} accent="secondary" delay={0.2} />
              <StatCard title="총 구성원" value={overview.totalUsers} icon={Users} accent="neutral" delay={0.3} />
            </div>

            {/* Recent Surveys */}
            <div>
              <h2 className="text-base font-bold text-[hsl(var(--neutral-900))] mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[hsl(var(--primary-400))]" />
                최근 설문 현황
              </h2>
              <div className="space-y-3">
                {overview.recentSurveys.length === 0 ? (
                  <div className="ts-card p-12 flex flex-col items-center justify-center text-center">
                    <ClipboardCheck className="w-12 h-12 text-[hsl(var(--neutral-300))] mb-3" />
                    <p className="text-[hsl(var(--neutral-500))] text-sm">진행된 설문이 없습니다.</p>
                  </div>
                ) : (
                  overview.recentSurveys.map((survey, i) => (
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
                          <span className="text-xs text-[hsl(var(--neutral-500))]">{survey.year}년 {survey.quarter ? `${survey.quarter}분기` : ''}</span>
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
                          href={user?.role === 'member' ? `/surveys/${survey.id}/intro` : `/admin/results`}
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
          </>
        ) : null}
      </div>
    </Shell>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-[hsl(142_76%_36%/0.1)] text-[hsl(var(--green-500))]",
    draft:  "bg-[hsl(var(--neutral-100))] text-[hsl(var(--neutral-600))]",
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
