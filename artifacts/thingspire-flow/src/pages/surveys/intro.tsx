import { useProtectedRoute } from "@/hooks/use-auth";
import { Shell } from "@/components/layout/Shell";
import { useGetSurvey, useStartResponse } from "@workspace/api-client-react";
import { useRoute, Link, useLocation } from "wouter";
import { Shield, Target, Info, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function SurveyIntro() {
  const { isAuthorized } = useProtectedRoute();
  const [, params] = useRoute("/surveys/:id/intro");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const id = params?.id || "";
  const { data: survey, isLoading } = useGetSurvey(id, { query: { enabled: !!id } });
  
  const startMutation = useStartResponse();

  if (!isAuthorized) return null;

  const handleStart = () => {
    startMutation.mutate({ surveyId: id }, {
      onSuccess: () => {
        setLocation(`/surveys/${id}/respond`);
      },
      onError: () => {
        toast({ title: "오류 발생", description: "설문을 시작할 수 없습니다.", variant: "destructive" });
      }
    });
  };

  if (isLoading) {
    return <Shell><div className="animate-pulse space-y-8 max-w-3xl mx-auto"><div className="h-12 bg-slate-200 rounded-lg w-1/2"></div><div className="h-64 bg-slate-100 rounded-2xl"></div></div></Shell>;
  }

  if (!survey) {
    return <Shell><div>설문을 찾을 수 없습니다.</div></Shell>;
  }

  return (
    <Shell>
      <div className="max-w-3xl mx-auto">
        <Link href="/surveys" className="text-sm font-medium text-slate-500 hover:text-primary mb-6 inline-block transition-colors">
          ← 목록으로 돌아가기
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-primary to-blue-600 p-8 md:p-12 text-white">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-4">
              {survey.year} {survey.quarter ? `Q${survey.quarter}` : ''} 조직문화 진단
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{survey.introTitle || survey.title}</h1>
            <p className="text-blue-50 text-lg max-w-2xl">{survey.description}</p>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            {/* Purpose & Direction */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Target className="w-5 h-5" /> 진단 목적
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {survey.introPurpose || "우리 조직의 현재 상태를 파악하고 더 나은 일터를 만들기 위한 귀중한 의견을 듣고자 합니다."}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Info className="w-5 h-5" /> 활용 방향
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {survey.introDirection || "수집된 데이터는 리더십 교육, 조직문화 개선 프로그램 기획 및 회사 정책 수립의 기초 자료로 활용됩니다."}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Confidentiality Guarantee */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
              <div className="absolute right-0 top-0 text-slate-200 translate-x-4 -translate-y-4">
                <Shield className="w-32 h-32 opacity-20" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-3">
                  <Shield className="w-5 h-5 text-emerald-500" /> 익명성 보장
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {survey.introConfidentiality || `본 설문은 철저한 익명으로 진행됩니다. 응답 결과는 최소 ${survey.anonymousMinCount}명 이상의 그룹 단위로만 집계되어 개인을 식별할 수 없습니다.`}
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 개별 응답 내역은 관리자도 열람할 수 없습니다.</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 부서 인원이 기준 미달 시 상위 부서로 통합 집계됩니다.</li>
                </ul>
              </div>
            </div>

            {/* Guide */}
            {survey.introGuide && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900">작성 가이드</h3>
                <div className="text-slate-600 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100/50" dangerouslySetInnerHTML={{ __html: survey.introGuide.replace(/\n/g, '<br/>') }}></div>
              </div>
            )}

            <div className="pt-6 flex justify-center">
              <button
                onClick={handleStart}
                disabled={startMutation.isPending || survey.status !== 'active'}
                className="group relative px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                <span className="relative z-10 text-lg">
                  {survey.status !== 'active' ? '현재 참여할 수 없습니다' : startMutation.isPending ? '시작하는 중...' : '설문 시작하기'}
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Shell>
  );
}
