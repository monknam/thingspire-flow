import { useProtectedRoute } from "@/hooks/use-auth";
import { Shell } from "@/components/layout/Shell";
import { useGetSurveys } from "@workspace/api-client-react";
import { formatDate } from "@/lib/utils";
import { Link } from "wouter";
import { ClipboardList, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SurveyList() {
  const { isAuthorized } = useProtectedRoute();
  const { data: surveys, isLoading } = useGetSurveys();

  if (!isAuthorized) return null;

  return (
    <Shell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <ClipboardList className="w-6 h-6" />
            </div>
            조직문화 설문
          </h1>
          <p className="text-slate-500 mt-2 ml-14">현재 진행 중이거나 완료된 설문 목록입니다.</p>
        </div>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-slate-100 rounded-2xl w-full"></div>
            ))}
          </div>
        ) : surveys?.length === 0 ? (
          <div className="text-center p-12 glass-card rounded-3xl">
            <ClipboardList className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">참여 가능한 설문이 없습니다.</h3>
            <p className="text-slate-500 mt-1">새로운 설문이 시작되면 알려드릴게요.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {surveys?.map((survey, index) => (
              <motion.div
                key={survey.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/surveys/${survey.id}/intro`} className="block">
                  <div className="glass-card p-6 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                            survey.status === 'active' ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' :
                            survey.status === 'closed' ? 'bg-slate-100 text-slate-600' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {survey.status === 'active' ? '진행중' : survey.status === 'closed' ? '종료' : survey.status}
                          </span>
                          <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {survey.year} {survey.quarter && `Q${survey.quarter}`}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{survey.title}</h2>
                        {survey.startAt && survey.endAt && (
                          <p className="text-sm text-slate-500">
                            {formatDate(survey.startAt)} ~ {formatDate(survey.endAt)}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-primary/10 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}
