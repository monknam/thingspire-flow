import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BrandLogo } from "@/components/brand/BrandLogo";

export default function Login() {
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = useState("admin@thingspire.com");
  const [password, setPassword] = useState("admin1234");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex bg-[hsl(var(--neutral-900))]">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 shrink-0 px-10 py-12 border-r border-white/10">
        <div>
          <Link href="/" className="mb-12 inline-flex">
            <BrandLogo showCaption />
          </Link>

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
          <div className="lg:hidden mb-10 flex justify-center">
            <Link href="/">
              <BrandLogo compact showCaption />
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">로그인</h1>
          <p className="text-[hsl(var(--neutral-400))] text-sm mb-8">통합 시스템에 오신 것을 환영합니다. 설문은 여러 업무 기능 중 하나입니다.</p>

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
                autoFocus
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
            로컬 개발 기본 계정이 자동 입력되어 있습니다. 엔터만 누르면 로그인됩니다.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
