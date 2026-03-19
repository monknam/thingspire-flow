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
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">안녕하세요, {user?.fullName}님</h1>
            <p className="text-slate-500 mt-1">오늘의 조직 현황을 확인하세요.</p>
          </div>
          {user?.role === 'admin' && (
            <Link 
              href="/admin/surveys/new"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:shadow-md hover:bg-primary/90 transition-all"
            >
              새 설문 만들기 <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-slate-100 rounded-2xl"></div>
            ))}
          </div>
        ) : overview ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="진행 중인 설문" 
                value={overview.activeSurveys} 
                icon={ClipboardCheck} 
                color="bg-blue-500" 
                delay={0.1}
              />
              <StatCard 
                title="총 부서 수" 
                value={overview.totalDepartments} 
                icon={Building2} 
                color="bg-indigo-500" 
                delay={0.2}
              />
              <StatCard 
                title="총 구성원" 
                value={overview.totalUsers} 
                icon={Users} 
                color="bg-violet-500" 
                delay={0.3}
              />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                최근 설문 현황
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {overview.recentSurveys.length === 0 ? (
                  <div className="glass-card p-12 rounded-2xl flex flex-col items-center justify-center text-center text-slate-500">
                    <ClipboardCheck className="w-12 h-12 text-slate-300 mb-3" />
                    <p>진행된 설문이 없습니다.</p>
                  </div>
                ) : (
                  overview.recentSurveys.map((survey, i) => (
                    <motion.div 
                      key={survey.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/20 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                            survey.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            survey.status === 'draft' ? 'bg-slate-100 text-slate-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {survey.status === 'active' ? '진행중' : survey.status === 'draft' ? '준비중' : '종료됨'}
                          </span>
                          <span className="text-sm font-medium text-slate-500">{survey.year}년 {survey.quarter ? `${survey.quarter}분기` : ''}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{survey.title}</h3>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-sm text-slate-500 mb-1">응답률</p>
                          <p className="text-2xl font-bold text-slate-800">{survey.responseRate.toFixed(1)}%</p>
                        </div>
                        <div className="text-center hidden sm:block">
                          <p className="text-sm text-slate-500 mb-1">응답자</p>
                          <p className="text-lg font-semibold text-slate-700">{survey.submittedCount} / {survey.totalEligible}</p>
                        </div>
                        <Link 
                          href={user?.role === 'member' ? `/surveys/${survey.id}/intro` : `/admin/results`}
                          className="p-3 rounded-xl bg-slate-50 text-primary hover:bg-primary/10 transition-colors"
                        >
                          <ArrowRight className="w-5 h-5" />
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

function StatCard({ title, value, icon: Icon, color, delay }: { title: string, value: number, icon: any, color: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card p-6 rounded-2xl relative overflow-hidden group"
    >
      <div className={`absolute -right-6 -top-6 w-24 h-24 ${color} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
      <div className="flex items-center gap-4 relative z-10">
        <div className={`p-4 rounded-xl ${color} text-white shadow-sm`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}
