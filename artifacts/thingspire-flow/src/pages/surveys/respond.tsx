import { useState, useEffect } from "react";
import { useProtectedRoute } from "@/hooks/use-auth";
import { Shell } from "@/components/layout/Shell";
import { 
  useGetSurvey, 
  useGetMyResponse, 
  useSaveAnswers, 
  useSubmitResponse 
} from "@workspace/api-client-react";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function SurveyRespond() {
  const { isAuthorized } = useProtectedRoute();
  const [, params] = useRoute("/surveys/:id/respond");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const id = params?.id || "";
  const { data: survey, isLoading: isLoadingSurvey } = useGetSurvey(id, { query: { enabled: !!id } });
  const { data: responseData, isLoading: isLoadingResponse, refetch } = useGetMyResponse(id, { query: { enabled: !!id, retry: false } });
  
  const saveMutation = useSaveAnswers();
  const submitMutation = useSubmitResponse();

  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<Record<string, { num?: number, text?: string }>>({});

  // Initialize local state from DB response
  useEffect(() => {
    if (responseData?.answers) {
      const initial: Record<string, { num?: number, text?: string }> = {};
      responseData.answers.forEach(ans => {
        initial[ans.surveyQuestionId] = { 
          num: ans.numericValue ?? undefined, 
          text: ans.textValue ?? undefined 
        };
      });
      setLocalAnswers(initial);
    }
  }, [responseData]);

  // Prevent accessing if not started
  useEffect(() => {
    if (!isLoadingResponse && !responseData) {
      setLocation(`/surveys/${id}/intro`);
    } else if (responseData?.isSubmitted) {
      toast({ title: "안내", description: "이미 제출이 완료된 설문입니다." });
      setLocation(`/surveys`);
    }
  }, [isLoadingResponse, responseData, setLocation, id, toast]);

  if (!isAuthorized || isLoadingSurvey || isLoadingResponse || !survey || !responseData) return <Shell><div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div></Shell>;

  const sections = survey.sections || [];
  const currentSection = sections[currentSectionIdx];
  const isLastSection = currentSectionIdx === sections.length - 1;
  const isFirstSection = currentSectionIdx === 0;

  const handleAnswerChange = (questionId: string, type: 'likert_5' | 'short_text' | 'long_text', value: string | number) => {
    setLocalAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        ...(type === 'likert_5' ? { num: value as number } : { text: value as string })
      }
    }));
  };

  const getAnswersPayload = () => {
    return Object.entries(localAnswers).map(([qId, val]) => ({
      surveyQuestionId: qId,
      numericValue: val.num ?? null,
      textValue: val.text ?? null
    }));
  };

  const handleSaveDraft = async () => {
    await saveMutation.mutateAsync({ 
      responseId: responseData.id, 
      data: { answers: getAnswersPayload() } 
    });
    toast({ title: "임시저장 완료", description: "응답 내역이 저장되었습니다." });
    refetch();
  };

  const handleNext = async () => {
    // Check required fields for current section
    const missingRequired = currentSection.questions.find(q => {
      if (!q.isRequired) return false;
      const ans = localAnswers[q.id];
      if (!ans) return true;
      if (q.questionType === 'likert_5' && !ans.num) return true;
      if (q.questionType !== 'likert_5' && (!ans.text || ans.text.trim() === '')) return true;
      return false;
    });

    if (missingRequired) {
      toast({ variant: "destructive", title: "필수 항목 누락", description: "모든 필수 항목에 응답해주세요." });
      return;
    }

    // Auto save on next
    await saveMutation.mutateAsync({ 
      responseId: responseData.id, 
      data: { answers: getAnswersPayload() } 
    });

    if (!isLastSection) {
      setCurrentSectionIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (!isFirstSection) {
      setCurrentSectionIdx(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    // Check all required fields across all sections
    const missing = sections.some(sec => 
      sec.questions.some(q => {
        if (!q.isRequired) return false;
        const ans = localAnswers[q.id];
        return !ans || (q.questionType === 'likert_5' && !ans.num) || (q.questionType !== 'likert_5' && (!ans.text || ans.text.trim() === ''));
      })
    );

    if (missing) {
      toast({ variant: "destructive", title: "제출 실패", description: "작성하지 않은 필수 항목이 있습니다. 이전 섹션을 확인해주세요." });
      return;
    }

    if (confirm("설문을 최종 제출하시겠습니까? 제출 후에는 수정할 수 없습니다.")) {
      try {
        await saveMutation.mutateAsync({ responseId: responseData.id, data: { answers: getAnswersPayload() } });
        await submitMutation.mutateAsync({ responseId: responseData.id });
        toast({ title: "제출 완료", description: "설문 참여에 감사드립니다." });
        setLocation(`/surveys`);
      } catch (e) {
        toast({ variant: "destructive", title: "오류", description: "제출 중 문제가 발생했습니다." });
      }
    }
  };

  const progressPercentage = ((currentSectionIdx + 1) / sections.length) * 100;

  return (
    <Shell>
      <div className="max-w-4xl mx-auto pb-24">
        {/* Sticky Header / Progress */}
        <div className="sticky top-[60px] md:top-4 z-30 bg-white/80 backdrop-blur-xl border border-slate-200 p-4 md:p-6 rounded-2xl shadow-sm mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-600 mb-3">
            <span>{survey.title}</span>
            <span className="text-primary">{currentSectionIdx + 1} / {sections.length} 파트</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <motion.div 
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSectionIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">{currentSection.name}</h2>
              {currentSection.description && (
                <p className="text-slate-500 mt-2">{currentSection.description}</p>
              )}
            </div>

            {currentSection.questions.map((q, idx) => (
              <div key={q.id} className="glass-card p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-primary/10 transition-colors shadow-sm">
                <div className="flex gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-semibold flex items-center justify-center shrink-0">
                    {q.questionNo || idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-900 leading-snug">
                      {q.questionText}
                      {q.isRequired && <span className="text-destructive ml-1.5 text-base">*</span>}
                    </h3>
                  </div>
                </div>

                <div className="pl-0 md:pl-12">
                  {q.questionType === 'likert_5' && (
                    <LikertScale 
                      value={localAnswers[q.id]?.num} 
                      onChange={(v) => handleAnswerChange(q.id, 'likert_5', v)} 
                    />
                  )}
                  {q.questionType === 'short_text' && (
                    <input 
                      type="text"
                      value={localAnswers[q.id]?.text || ''}
                      onChange={(e) => handleAnswerChange(q.id, 'short_text', e.target.value)}
                      placeholder="자유롭게 입력해주세요"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  )}
                  {q.questionType === 'long_text' && (
                    <textarea 
                      value={localAnswers[q.id]?.text || ''}
                      onChange={(e) => handleAnswerChange(q.id, 'long_text', e.target.value)}
                      placeholder="상세한 의견을 들려주시면 큰 도움이 됩니다."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
                    />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="mt-12 flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            onClick={handlePrev}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors",
              isFirstSection ? "invisible" : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <ChevronLeft className="w-5 h-5" /> 이전
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={saveMutation.isPending}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> 임시저장
            </button>
            
            {isLastSection ? (
              <button
                onClick={handleSubmit}
                disabled={submitMutation.isPending || saveMutation.isPending}
                className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                <Check className="w-5 h-5" /> 최종 제출
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={saveMutation.isPending}
                className="flex items-center gap-2 px-8 py-2.5 bg-slate-900 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                다음 <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function LikertScale({ value, onChange }: { value?: number, onChange: (val: number) => void }) {
  const options = [
    { val: 1, label: "전혀 그렇지 않다" },
    { val: 2, label: "그렇지 않다" },
    { val: 3, label: "보통이다" },
    { val: 4, label: "그렇다" },
    { val: 5, label: "매우 그렇다" }
  ];

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-4">
      {options.map(opt => {
        const isSelected = value === opt.val;
        return (
          <button
            key={opt.val}
            onClick={() => onChange(opt.val)}
            className={cn(
              "flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border-2 transition-all duration-200",
              isSelected 
                ? "border-primary bg-primary/5 text-primary shadow-sm" 
                : "border-slate-100 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <span className={cn(
              "text-xl font-bold mb-2 w-8 h-8 rounded-full flex items-center justify-center",
              isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
            )}>
              {opt.val}
            </span>
            <span className="text-[10px] md:text-xs font-medium text-center break-keep-all">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
