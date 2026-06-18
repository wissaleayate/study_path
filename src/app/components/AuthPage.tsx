import { useState } from "react";
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, BookOpen, Trophy, Briefcase } from "lucide-react";

type Props = { onAuth: (name: string) => void };

export function AuthPage({ onAuth }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(name || "user");
  };

  const features = [
    { icon: Briefcase, label: "1,200+ Internships", color: "#4f46e5" },
    { icon: Trophy, label: "500+ Scholarships", color: "#7c3aed" },
    { icon: BookOpen, label: "800+ Courses", color: "#0891b2" },
    { icon: Sparkles, label: "Smart Recommendations", color: "#059669" },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #5b21b6 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${120 + i * 80}px`,
                height: `${120 + i * 80}px`,
                top: `${10 + i * 5}%`,
                left: `${-20 + i * 8}%`,
                opacity: 0.3 - i * 0.04,
              }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap size={22} className="text-white" />
            </div>
            <span className="text-white font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.25rem" }}>
              OpportuniTrack
            </span>
          </div>

          <h1 className="text-white leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2.75rem", fontWeight: 800 }}>
            Your gateway to every opportunity that matters.
          </h1>
          <p className="text-white/80 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem" }}>
            Discover internships, scholarships, and courses tailored to your goals. Track your study progress and never miss a deadline again.
          </p>
        </div>

        <div className="relative grid grid-cols-2 gap-4">
          {features.map(({ icon: Icon, label, color }) => (
            <div key={label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/20">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-white" />
              </div>
              <span className="text-white/90 text-sm" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#4f46e5" }}>
              <GraduationCap size={20} className="text-white" />
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#4f46e5" }}>OpportuniTrack</span>
          </div>

          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#1e1b4b", marginBottom: "0.5rem" }}>
            {mode === "login" ? "Welcome back!" : "Create your account"}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280" }}>
            {mode === "login" ? "Sign in to continue your journey." : "Join 50,000+ students already on the platform."}
          </p>

          {/* Tab switcher */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: "#eeedf8" }}>
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2 rounded-lg transition-all"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  background: mode === m ? "#4f46e5" : "transparent",
                  color: mode === m ? "#ffffff" : "#6b7280",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1e1b4b", display: "block", marginBottom: "0.5rem" }}>
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#6b7280" }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Johnson"
                    className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all"
                    style={{ border: "1.5px solid rgba(79,70,229,0.2)", background: "#f8f7ff", fontFamily: "'Nunito', sans-serif", color: "#1e1b4b", fontSize: "0.9rem" }}
                    onFocus={(e) => (e.target.style.border = "1.5px solid #4f46e5")}
                    onBlur={(e) => (e.target.style.border = "1.5px solid rgba(79,70,229,0.2)")}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1e1b4b", display: "block", marginBottom: "0.5rem" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#6b7280" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@university.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all"
                  style={{ border: "1.5px solid rgba(79,70,229,0.2)", background: "#f8f7ff", fontFamily: "'Nunito', sans-serif", color: "#1e1b4b", fontSize: "0.9rem" }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #4f46e5")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid rgba(79,70,229,0.2)")}
                />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#1e1b4b", display: "block", marginBottom: "0.5rem" }}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#6b7280" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl outline-none transition-all"
                  style={{ border: "1.5px solid rgba(79,70,229,0.2)", background: "#f8f7ff", fontFamily: "'Nunito', sans-serif", color: "#1e1b4b", fontSize: "0.9rem" }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #4f46e5")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid rgba(79,70,229,0.2)")}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] mt-2"
              style={{ background: "#4f46e5", color: "#ffffff", fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer" }}
            >
              {mode === "login" ? "Sign In" : "Create Account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 text-center" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.85rem", color: "#6b7280" }}>
            {mode === "login" ? (
              <>Don't have an account?{" "}
                <button onClick={() => setMode("register")} style={{ color: "#4f46e5", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Sign up free</button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => setMode("login")} style={{ color: "#4f46e5", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Sign in</button>
              </>
            )}
          </div>

          <p className="mt-8 text-center" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "#9ca3af" }}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
