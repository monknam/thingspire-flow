import { useState } from "react";
import { useProtectedRoute } from "@/hooks/use-auth";
import { Shell } from "@/components/layout/Shell";
import { useGetUsers, useUpdateUser, useGetDepartments, type User } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Users, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function UsersAdmin() {
  const { isAuthorized, user: currentUser } = useProtectedRoute(['admin', 'leader']);
  const { data: users, isLoading, refetch } = useGetUsers();
  const { data: departments } = useGetDepartments();
  const userList = Array.isArray(users) ? users : [];
  const departmentList = Array.isArray(departments) ? departments : [];
  const updateMutation = useUpdateUser();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ role: "member" as "admin"|"leader"|"member", departmentId: "" });

  if (!isAuthorized) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await updateMutation.mutateAsync({ 
        id: editingUser.id, 
        data: { 
          role: formData.role,
          departmentId: formData.departmentId || null
        } 
      });
      toast({ title: "구성원 정보가 반영되었습니다." });
      setIsOpen(false);
      refetch();
    } catch (e) {
      toast({ variant: "destructive", title: "구성원 정보를 반영하지 못했습니다." });
    }
  };

  const openEdit = (user: User) => {
    if (currentUser?.role !== "admin") return;
    setEditingUser(user);
    setFormData({ role: user.role, departmentId: user.departmentId || "" });
    setIsOpen(true);
  };

  return (
    <Shell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" /> 구성원 운영
        </h1>
        
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">이름 / 이메일</th>
                <th className="px-6 py-4">부서</th>
                <th className="px-6 py-4">역할</th>
                <th className="px-6 py-4 text-right">설정</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">구성원 정보를 불러오는 중...</td></tr>
              ) : (
                userList.map(user => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{user.fullName || '미설정'}</div>
                      <div className="text-slate-500 text-xs">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{user.departmentName || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'leader' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {currentUser?.role === "admin" ? (
                        <button onClick={() => openEdit(user)} className="text-slate-400 hover:text-primary p-2">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">조회만 가능</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Dialog open={currentUser?.role === "admin" && isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>구성원 권한 및 소속 설정</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">역할</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value as any})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="member">구성원</option>
                  <option value="leader">조직 리더</option>
                  <option value="admin">시스템 관리자</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">소속 부서</label>
                <select
                  value={formData.departmentId}
                  onChange={e => setFormData({...formData, departmentId: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">소속 없음</option>
                  {departmentList.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" disabled={updateMutation.isPending} className="w-full bg-primary text-white py-2 rounded-md font-medium mt-4">
                저장
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Shell>
  );
}
