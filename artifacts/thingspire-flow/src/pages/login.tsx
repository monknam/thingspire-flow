import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

export default function Login() {
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex bg-[hsl(var(--neutral-900))]">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 shrink-0 px-10 py-12 border-r border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary-400))] flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">Thingspire</p>
              <p className="text-[hsl(var(--primary-300))] text-xs font-medium mt-0.5">Flow</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white leading-snug mb-4">
            조직문화를<br />함께 진단합니다
          </h2>
          <p className="text-[hsl(var(--neutral-400))] text-sm leading-relaxed">
            방향성, 실행력, 협업, 동기부여, 건강성, 분위기까지—
            우리 조직의 현재를 솔직하게 파악하고 더 나은 내일을 만들어갑니다.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { icon: "🔒", text: "철저한 익명 보장" },
            { icon: "📊", text: "데이터 기반 조직 진단" },
            { icon: "🚫", text: "인사평가 미반영" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-[hsl(var(--neutral-300))]">
              <span className="text-base">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-9 h-9 rounded-lg bg-[hsl(var(--primary-400))] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white font-bold text-xl">Thingspire Flow</span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">로그인</h1>
          <p className="text-[hsl(var(--neutral-400))] text-sm mb-8">조직문화 진단 플랫폼에 오신 것을 환영합니다.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[hsl(var(--neutral-300))]">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-[hsl(var(--neutral-500))] focus:outline-none focus:border-[hsl(var(--primary-400))] focus:bg-white/15 transition-all text-sm"
                placeholder="name@company.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[hsl(var(--neutral-300))]">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-[hsl(var(--neutral-500))] focus:outline-none focus:border-[hsl(var(--primary-400))] focus:bg-white/15 transition-all text-sm"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="ts-btn-primary w-full py-3 mt-2"
            >
              {isLoggingIn ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <p className="text-center text-xs text-[hsl(var(--neutral-500))] mt-8">
            회사 계정으로 로그인하세요. 문의: 관리자
          </p>
        </motion.div>
      </div>
    </div>
  );
}
