import { Briefcase, Trophy, BookOpen, Brain, TrendingUp, Clock, Star, ArrowRight, Flame, Target, CheckCircle2, Bell } from "lucide-react";
import { opportunities, studyGoals, weeklyStudy, notifications } from "./data";

type Props = {
  userName: string;
  bookmarks: string[];
  onNavigate: (page: string) => void;
};

const statCards = [
  { label: "Internships", value: "1,247", icon: Briefcase, color: "#4f46e5", bg: "#ede9fe" },
  { label: "Scholarships", value: "523", icon: Trophy, color: "#7c3aed", bg: "#f3e8ff" },
  { label: "Courses & Workshops", value: "814", icon: BookOpen, color: "#0891b2", bg: "#e0f2fe" },
  { label: "Applications Saved", value: "8", icon: Star, color: "#d97706", bg: "#fef3c7" },
];

export function Dashboard({ userName, bookmarks, onNavigate }: Props) {
  const featured = opportunities.filter((o) => o.featured).slice(0, 4);
  const deadlineSoon = opportunities
    .filter((o) => o.deadline !== "Rolling")
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 3);

  const unread = notifications.filter((n) => !n.read);
  const totalStudied = weeklyStudy.reduce((s, d) => s + d.hours, 0);

  const typeColors: Record<string, string> = {
    internship: "#4f46e5",
    scholarship: "#7c3aed",
    workshop: "#0891b2",
    course: "#059669",
  };
  const typeBg: Record<string, string> = {
    internship: "#ede9fe",
    scholarship: "#f3e8ff",
    workshop: "#e0f2fe",
    course: "#d1fae5",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#1e1b4b", lineHeight: 1.2 }}>
            Good morning, {userName.split(" ")[0]}! 👋
          </h1>
          <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280", marginTop: "0.25rem" }}>
            Thursday, June 11, 2026 — You have {unread.length} new notifications and 3 approaching deadlines.
          </p>
        </div>
        <button
          onClick={() => onNavigate("notifications")}
          className="relative p-2.5 rounded-xl transition-all hover:opacity-80"
          style={{ background: "#ede9fe", border: "none", cursor: "pointer" }}
        >
          <Bell size={20} style={{ color: "#4f46e5" }} />
          {unread.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#ef4444", color: "#fff", fontSize: "0.6rem", fontWeight: 800 }}>
              {unread.length}
            </span>
          )}
        </button>
      </div>

      {/* Streak Banner */}
      <div className="rounded-2xl p-4 flex items-center gap-4" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#ffffff" }}>
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Flame size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1rem" }}>7-Day Study Streak! 🔥</div>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.85rem", opacity: 0.85 }}>You've studied {totalStudied.toFixed(1)}h this week. Keep it up!</div>
        </div>
        <button
          onClick={() => onNavigate("tracker")}
          className="px-4 py-2 rounded-xl flex items-center gap-2 transition-all hover:opacity-90"
          style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#ffffff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
        >
          View Tracker <ArrowRight size={15} />
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-2xl p-4 bg-card" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#1e1b4b" }}>{value}</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.82rem", color: "#6b7280", marginTop: "2px" }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Featured Opportunities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1e1b4b" }}>
              Featured Opportunities
            </h2>
            <button onClick={() => onNavigate("internships")} className="flex items-center gap-1 transition-all hover:opacity-70" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "#4f46e5", background: "none", border: "none", cursor: "pointer" }}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {featured.map((opp) => (
              <div key={opp.id} className="bg-card rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: typeColors[opp.type], color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "0.9rem" }}>
                  {opp.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1e1b4b" }}>{opp.title}</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.8rem", color: "#6b7280" }}>{opp.organization} · {opp.location}</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: typeBg[opp.type], color: typeColors[opp.type], fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                    {opp.type}
                  </span>
                  {(opp.stipend || opp.amount) && (
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#059669" }}>
                      {opp.stipend || opp.amount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Upcoming Deadlines */}
          <div className="bg-card rounded-2xl p-4" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "0.75rem" }}>
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {deadlineSoon.map((opp) => {
                const deadline = new Date(opp.deadline);
                const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / 86400000);
                const urgentColor = daysLeft <= 14 ? "#ef4444" : daysLeft <= 30 ? "#f59e0b" : "#059669";
                return (
                  <div key={opp.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: urgentColor }} />
                    <div className="flex-1 min-w-0">
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#1e1b4b" }}>{opp.title}</div>
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "#6b7280" }}>{opp.organization}</div>
                    </div>
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: urgentColor, whiteSpace: "nowrap" }}>
                      {daysLeft}d left
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Study Goals Progress */}
          <div className="bg-card rounded-2xl p-4" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b" }}>
                Study Goals
              </h3>
              <button onClick={() => onNavigate("tracker")} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#4f46e5", background: "none", border: "none", cursor: "pointer" }}>
                View all
              </button>
            </div>
            <div className="space-y-3">
              {studyGoals.slice(0, 3).map((goal) => {
                const pct = Math.round((goal.completedHours / goal.targetHours) * 100);
                return (
                  <div key={goal.id}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "#1e1b4b" }}>{goal.subject}</span>
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "#6b7280" }}>{goal.completedHours}h / {goal.targetHours}h</span>
                    </div>
                    <div className="rounded-full h-1.5" style={{ background: "#eeedf8" }}>
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: goal.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
