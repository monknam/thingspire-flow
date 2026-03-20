import React from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Settings, 
  Users, 
  Building2, 
  LogOut, 
  Menu,
  X,
  BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  if (!user) return null;

  const isAdmin = user.role === 'admin';
  const isLeader = user.role === 'admin' || user.role === 'leader';

  const navItems = [
    { href: "/", label: "대시보드", icon: LayoutDashboard, show: true },
    { href: "/surveys", label: "조직문화 설문", icon: ClipboardList, show: true },
    { href: "/admin/results", label: "결과 분석", icon: BarChart3, show: isLeader },
    { href: "/admin/surveys", label: "설문 관리", icon: Settings, show: isAdmin },
    { href: "/admin/users", label: "사용자 관리", icon: Users, show: isAdmin },
    { href: "/admin/departments", label: "조직 관리", icon: Building2, show: isAdmin },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[hsl(var(--primary-400))] flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">Thingspire</p>
            <p className="text-[hsl(var(--primary-300))] text-xs font-medium">Flow</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto space-y-1">
        {navItems.filter(item => item.show).map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-[hsl(var(--primary-400))] text-white shadow-sm"
                  : "text-[hsl(var(--neutral-300))] hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-[hsl(var(--neutral-400))]")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-4 py-5 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/8">
          <div className="w-9 h-9 rounded-full bg-[hsl(var(--primary-400))] flex items-center justify-center font-bold text-white text-sm shrink-0">
            {user.fullName?.charAt(0) || user.email.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.fullName || "사용자"}</p>
            <p className="text-xs text-[hsl(var(--neutral-400))] truncate">
              {user.role === 'admin' ? '관리자' : user.role === 'leader' ? '리더' : '구성원'}
            </p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[hsl(var(--neutral-400))] hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
        >
          <LogOut className="w-4 h-4" />
          로그아웃
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[hsl(var(--neutral-50))]">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 bg-[hsl(var(--neutral-900))] sticky top-0 z-40">
        <div className="font-bold text-white flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[hsl(var(--primary-400))] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Thingspire Flow
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-[hsl(var(--neutral-900))] flex-col sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed top-0 left-0 z-50 h-full w-64 bg-[hsl(var(--neutral-900))] md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-w-0 min-h-screen">
        <div className="px-5 py-8 md:px-10 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
