import { useProtectedRoute } from "@/hooks/use-auth";
import { Shell } from "@/components/layout/Shell";
import { useGetSurveys, useGetSurveyDashboard } from "@workspace/api-client-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { PieChart, PieChart as PieIcon, Users } from "lucide-react";

export default function ResultsDashboard() {
  const { isAuthorized } = useProtectedRoute(['admin', 'leader']);
  const { data: surveys } = useGetSurveys();
  
  // By default select the first active or closed survey
  const defaultId = surveys?.find(s => s.status !== 'draft')?.id || "";
  const [selectedSurveyId, setSelectedSurveyId] = useState<string>(defaultId);

  // If we don't have one selected yet but data loaded, pick first
  if (!selectedSurveyId && defaultId) setSelectedSurveyId(defaultId);

  const { data: dashboard, isLoading } = useGetSurveyDashboard(selectedSurveyId, {
    query: { enabled: !!selectedSurveyId }
  });

  if (!isAuthorized) return null;

  const barColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <PieIcon className="w-6 h-6 text-primary" /> 분석 리포트
          </h1>
          
          <select 
            value={selectedSurveyId} 
            onChange={e => setSelectedSurveyId(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl bg-white shadow-sm font-medium"
          >
            <option value="" disabled>설문 선택</option>
            {surveys?.filter(s => s.status !== 'draft').map(s => (
              <option key={s.id} value={s.id}>{s.year} {s.title}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-100 rounded-2xl"></div>
            <div className="h-96 bg-slate-100 rounded-2xl"></div>
          </div>
        ) : !dashboard ? (
          <div className="text-center py-20 text-slate-500 glass-card rounded-3xl">결과 데이터가 없습니다.</div>
        ) : (
          <>
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">전체 응답률</p>
                  <p className="text-3xl font-bold text-slate-900">{dashboard.overallResponseRate.toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <PieIcon className="w-6 h-6" />
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">참여자 수</p>
                  <p className="text-3xl font-bold text-slate-900">{dashboard.submittedCount} <span className="text-lg text-slate-400 font-medium">/ {dashboard.totalEligible}명</span></p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Section Averages */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-6">부문별 평균 점수 (5점 만점)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboard.sectionResults.filter(s => s.avgScore !== null)} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="sectionName" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <RechartsTooltip 
                      cursor={{fill: 'rgba(241, 245, 249, 0.5)'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="avgScore" name="평균 점수" radius={[6, 6, 0, 0]} maxBarSize={60}>
                      {dashboard.sectionResults.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="glass-card p-6 rounded-2xl overflow-hidden">
              <h3 className="font-bold text-lg mb-4">조직별 응답 현황</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-xl rounded-bl-xl">조직명</th>
                      <th className="px-4 py-3">응답자</th>
                      <th className="px-4 py-3">대상자</th>
                      <th className="px-4 py-3 rounded-tr-xl rounded-br-xl w-1/3">응답률</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.departmentStats.map(dept => (
                      <tr key={dept.departmentId} className="border-b border-slate-50 last:border-0">
                        <td className="px-4 py-3 font-medium text-slate-900">{dept.departmentName}</td>
                        <td className="px-4 py-3 text-slate-600">{dept.submittedCount}명</td>
                        <td className="px-4 py-3 text-slate-400">{dept.totalEligible}명</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${Math.min(dept.responseRate, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold w-10 text-right">{dept.responseRate.toFixed(0)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}
