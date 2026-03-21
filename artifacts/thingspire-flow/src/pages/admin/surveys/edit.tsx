import { useState } from "react";
import { useProtectedRoute } from "@/hooks/use-auth";
import { Shell } from "@/components/layout/Shell";
import { useGetSurvey, useUpdateSurvey, useCreateSection, useCreateQuestion, useActivateSurvey, useCloseSurvey, getGetSurveyQueryKey } from "@workspace/api-client-react";
import { useRoute } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Settings, Plus, GripVertical, PlayCircle, StopCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function SurveyEdit() {
  const { isAuthorized } = useProtectedRoute(['admin']);
  const [, params] = useRoute("/admin/surveys/:id/edit");
  const id = params?.id || "";
  
  const { data: survey, isLoading, refetch } = useGetSurvey(id, { query: { enabled: !!id, queryKey: getGetSurveyQueryKey(id) } });
  const updateMutation = useUpdateSurvey();
  const createSectionMutation = useCreateSection();
  const createQuestionMutation = useCreateQuestion();
  const activateMutation = useActivateSurvey();
  const closeMutation = useCloseSurvey();
  
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'info'|'builder'>('info');
  const [sectionOpen, setSectionOpen] = useState(false);
  const [qOpen, setQOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState("");
  
  const [secForm, setSecForm] = useState({ name: "", desc: "", sort: 1 });
  const [qForm, setQForm] = useState({ text: "", type: "likert_5", required: true, sort: 1 });

  if (!isAuthorized) return null;
  if (isLoading) return <Shell>Loading...</Shell>;
  if (!survey) return <Shell>Not found</Shell>;

  const handleActivate = async () => {
    if(confirm("설문을 시작하시겠습니까? 시작 후에는 문항을 수정할 수 없습니다.")) {
      await activateMutation.mutateAsync({ id });
      refetch();
      toast({title: "설문 시작됨"});
    }
  }

  const handleClose = async () => {
    if(confirm("설문을 종료하시겠습니까? 더 이상 응답을 받을 수 없습니다.")) {
      await closeMutation.mutateAsync({ id });
      refetch();
      toast({title: "설문 종료됨"});
    }
  }

  const handleCreateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSectionMutation.mutateAsync({ surveyId: id, data: { name: secForm.name, description: secForm.desc, sortOrder: secForm.sort } });
    setSectionOpen(false);
    refetch();
    toast({title: "섹션 추가됨"});
  }

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuestionMutation.mutateAsync({ 
      sectionId: activeSectionId, 
      data: { questionText: qForm.text, questionType: qForm.type as any, isRequired: qForm.required, sortOrder: qForm.sort } 
    });
    setQOpen(false);
    refetch();
    toast({title: "문항 추가됨"});
  }

  return (
    <Shell>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" /> 설문 설계: {survey.title}
            </h1>
            <p className="text-slate-500 text-sm mt-1">상태: {survey.status}</p>
          </div>
          <div className="flex gap-2">
            {survey.status === 'draft' && (
              <button onClick={handleActivate} className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <PlayCircle className="w-4 h-4"/> 배포 시작
              </button>
            )}
            {survey.status === 'active' && (
              <button onClick={handleClose} className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <StopCircle className="w-4 h-4"/> 강제 종료
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-4 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('info')} 
            className={`pb-3 px-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            기본 설정 & 안내문
          </button>
          <button 
            onClick={() => setActiveTab('builder')} 
            className={`pb-3 px-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'builder' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            문항 설계
          </button>
        </div>

        {activeTab === 'info' && (
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-semibold mb-4">도입부 안내문 설정</h3>
            <p className="text-sm text-slate-500 mb-4">설문 응답자가 가장 먼저 보게 될 화면의 내용입니다. API 연동 후 폼으로 교체 요망 (Phase 2)</p>
            {/* Omitted full form for brevity, would map to UpdateSurveyRequest */}
            <div className="bg-slate-50 p-4 rounded-xl border">
              현재는 JSON/API를 통해 수정 가능합니다. {survey.introPurpose}
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Dialog open={sectionOpen} onOpenChange={setSectionOpen}>
                <DialogTrigger asChild>
                  <button disabled={survey.status !== 'draft'} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50">
                    <Plus className="w-4 h-4"/> 새 섹션(페이지) 추가
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>섹션 추가</DialogTitle></DialogHeader>
                  <form onSubmit={handleCreateSection} className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm font-medium">섹션명</label>
                      <input value={secForm.name} onChange={e=>setSecForm({...secForm, name: e.target.value})} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">설명</label>
                      <input value={secForm.desc} onChange={e=>setSecForm({...secForm, desc: e.target.value})} className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">정렬 순서</label>
                      <input type="number" value={secForm.sort} onChange={e=>setSecForm({...secForm, sort: parseInt(e.target.value)})} className="w-full px-3 py-2 border rounded" />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 rounded font-medium">저장</button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {survey.sections?.map(sec => (
              <div key={sec.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GripVertical className="text-slate-400 w-5 h-5"/>
                    <h3 className="font-bold text-slate-900">{sec.name}</h3>
                  </div>
                  <button 
                    disabled={survey.status !== 'draft'}
                    onClick={() => { setActiveSectionId(sec.id); setQOpen(true); }}
                    className="text-sm text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    + 문항 추가
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {sec.questions.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">문항이 없습니다.</p>
                  ) : (
                    sec.questions.map((q, i) => (
                      <div key={q.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-colors">
                        <span className="text-slate-400 font-medium text-sm pt-0.5">{i+1}.</span>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{q.questionText} {q.isRequired && <span className="text-destructive">*</span>}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            유형: {q.questionType === 'likert_5' ? '5점 척도' : q.questionType === 'short_text' ? '단답형' : '서술형'}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}

            <Dialog open={qOpen} onOpenChange={setQOpen}>
              <DialogContent>
                <DialogHeader><DialogTitle>문항 추가</DialogTitle></DialogHeader>
                <form onSubmit={handleCreateQuestion} className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium">문항 내용</label>
                    <textarea rows={3} value={qForm.text} onChange={e=>setQForm({...qForm, text: e.target.value})} required className="w-full px-3 py-2 border rounded resize-none" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">유형</label>
                    <select value={qForm.type} onChange={e=>setQForm({...qForm, type: e.target.value})} className="w-full px-3 py-2 border rounded">
                      <option value="likert_5">5점 척도 (객관식)</option>
                      <option value="short_text">단답형 텍스트</option>
                      <option value="long_text">서술형 텍스트</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req" checked={qForm.required} onChange={e=>setQForm({...qForm, required: e.target.checked})} />
                    <label htmlFor="req" className="text-sm font-medium">필수 응답</label>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-2 rounded font-medium">저장</button>
                </form>
              </DialogContent>
            </Dialog>

          </div>
        )}
      </div>
    </Shell>
  );
}
