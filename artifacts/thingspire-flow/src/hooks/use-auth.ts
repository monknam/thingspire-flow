import { useGetMe, useLogin, useLogout, type LoginRequest } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useGetMe({
    query: {
      retry: false,
      staleTime: 5 * 60 * 1000,
    }
  });

  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginMutation = useLogin({
    mutation: {
      onSuccess: () => {
        refetch();
        setLocation("/");
        toast({ title: "로그인 성공", description: "환영합니다." });
      },
      onError: (err: any) => {
        toast({ 
          variant: "destructive", 
          title: "로그인 실패", 
          description: err?.data?.error || "이메일 또는 비밀번호를 확인해주세요." 
        });
      }
    }
  });

  const logoutMutation = useLogout({
    mutation: {
      onSuccess: () => {
        refetch();
        setLocation("/login");
        toast({ title: "로그아웃", description: "성공적으로 로그아웃 되었습니다." });
      }
    }
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
    login: (data: LoginRequest) => loginMutation.mutate({ data }),
    isLoggingIn: loginMutation.isPending,
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
}

export function useProtectedRoute(allowedRoles?: string[]) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        setLocation("/login");
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        setLocation("/");
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, setLocation]);

  return { user, isLoading, isAuthorized: isAuthenticated && (!allowedRoles || (user && allowedRoles.includes(user.role))) };
}
