import { useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AppProfile {
  id: string;
  email: string | null;
  fullName: string | null;
  role: "admin" | "leader" | "member";
  departmentId: string | null;
  departmentName: string | null;
  employmentStatus: "active" | "inactive" | "leave" | null;
  employeeGroup: "dev" | "non_dev" | "management" | null;
  isSystemAdmin: boolean;
}

export interface AuthUser extends AppProfile {
  authUser: SupabaseUser;
}

const AUTH_SESSION_QUERY_KEY = ["auth", "session"] as const;
const AUTH_USER_QUERY_KEY = ["auth", "user"] as const;

async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

async function getProfile(authUser: SupabaseUser): Promise<AuthUser> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, department_id, department_name, employment_status, employee_group, is_system_admin")
    .eq("id", authUser.id)
    .maybeSingle();

  if (error) {
    const fallbackRole = (authUser.user_metadata?.role ?? "member") as AuthUser["role"];

    return {
      id: authUser.id,
      email: authUser.email ?? null,
      fullName: authUser.user_metadata?.full_name ?? null,
      role: fallbackRole,
      departmentId: null,
      departmentName: null,
      employmentStatus: null,
      employeeGroup: null,
      isSystemAdmin: false,
      authUser,
    };
  }

  const role = (data?.role ?? authUser.user_metadata?.role ?? "member") as AuthUser["role"];

  return {
    id: authUser.id,
    email: data?.email ?? authUser.email ?? null,
    fullName: data?.full_name ?? authUser.user_metadata?.full_name ?? null,
    role,
    departmentId: data?.department_id ?? null,
    departmentName: data?.department_name ?? null,
    employmentStatus: data?.employment_status ?? null,
    employeeGroup: data?.employee_group ?? null,
    isSystemAdmin: data?.is_system_admin ?? false,
    authUser,
  };
}

async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getSession();
  if (!session?.user) return null;
  return getProfile(session.user);
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: AUTH_USER_QUERY_KEY });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  const sessionQuery = useQuery({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: getSession,
    staleTime: 5 * 60 * 1000,
  });

  const userQuery = useQuery({
    queryKey: AUTH_USER_QUERY_KEY,
    queryFn: getCurrentUser,
    enabled: !!sessionQuery.data?.user,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginRequest) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
      await queryClient.invalidateQueries({ queryKey: AUTH_USER_QUERY_KEY });
      setLocation("/");
      toast({ title: "로그인 성공", description: "환영합니다." });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: error.message || "이메일 또는 비밀번호를 확인해주세요.",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: async () => {
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, null);
      queryClient.setQueryData(AUTH_USER_QUERY_KEY, null);
      setLocation("/login");
      toast({ title: "로그아웃", description: "성공적으로 로그아웃 되었습니다." });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "로그아웃 실패",
        description: error.message || "잠시 후 다시 시도해주세요.",
      });
    },
  });

  const isLoading = sessionQuery.isLoading || (sessionQuery.data?.user ? userQuery.isLoading : false);
  const user = userQuery.data ?? null;
  const isAuthenticated = !!sessionQuery.data?.user;

  return {
    user,
    session: sessionQuery.data ?? null,
    isLoading,
    isAuthenticated,
    login: (data: LoginRequest) => loginMutation.mutate(data),
    isLoggingIn: loginMutation.isPending,
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
}

export function useProtectedRoute(allowedRoles?: string[]) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      setLocation("/");
    }
  }, [allowedRoles, isAuthenticated, isLoading, setLocation, user]);

  return {
    user,
    isLoading,
    isAuthorized: isAuthenticated && (!allowedRoles || (user && allowedRoles.includes(user.role))),
  };
}
