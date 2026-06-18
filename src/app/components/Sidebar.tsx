import {
  GraduationCap, LayoutDashboard, Briefcase, Trophy, BookOpen,
  Brain, Bookmark, Bell, User, Settings, ChevronRight, LogOut,
  Shield
} from "lucide-react";

type Page = "dashboard" | "internships" | "scholarships" | "workshops" | "tracker" | "bookmarks" | "notifications" | "profile" | "admin";

type Props = {
  activePage: Page;
  onNavigate: (page: Page) => void;
  userName: string;
  unreadCount: number;
  onLogout: () => void;
};

const navItems: { page: Page; icon: React.ElementType; label: string; badge?: string }[] = [
  { page: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { page: "internships", icon: Briefcase, label: "Internships", badge: "1.2k" },
  { page: "scholarships", icon: Trophy, label: "Scholarships", badge: "500+" },
  { page: "workshops", icon: BookOpen, label: "Courses & Workshops", badge: "800+" },
  { page: "tracker", icon: Brain, label: "Study Tracker" },
  { page: "bookmarks", icon: Bookmark, label: "Saved" },
];

const secondaryItems: { page: Page; icon: React.ElementType; label: string }[] = [
  { page: "notifications", icon: Bell, label: "Notifications" },
  { page: "profile", icon: User, label: "My Profile" },
  { page: "admin", icon: Shield, label: "Admin Dashboard" },
];

export function Sidebar({ activePage, onNavigate, userName, unreadCount, onLogout }: Props) {
  const initials = userName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <aside className="flex flex-col h-full" style={{ background: "#ffffff", borderRight: "1px solid rgba(79,70,229,0.1)" }}>
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(79,70,229,0.08)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#4f46e5" }}>
          <GraduationCap size={18} className="text-white" />
        </div>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1e1b4b", lineHeight: 1.2 }}>
            OpportuniTrack
          </div>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: "#6b7280", lineHeight: 1.2 }}>Student Platform</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-6">
          <div className="px-2 mb-2" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Explore
          </div>
          {navItems.map(({ page, icon: Icon, label, badge }) => {
            const active = activePage === page;
            return (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all group"
                style={{
                  background: active ? "#4f46e5" : "transparent",
                  color: active ? "#ffffff" : "#4b5563",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: active ? 700 : 600,
                  fontSize: "0.875rem",
                  textAlign: "left",
                }}
              >
                <Icon size={17} style={{ opacity: active ? 1 : 0.7 }} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-md"
                    style={{
                      background: active ? "rgba(255,255,255,0.2)" : "#ede9fe",
                      color: active ? "#ffffff" : "#4f46e5",
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                    }}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div>
          <div className="px-2 mb-2" style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Account
          </div>
          {secondaryItems.map(({ page, icon: Icon, label }) => {
            const active = activePage === page;
            return (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all relative"
                style={{
                  background: active ? "#4f46e5" : "transparent",
                  color: active ? "#ffffff" : "#4b5563",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: active ? 700 : 600,
                  fontSize: "0.875rem",
                  textAlign: "left",
                }}
              >
                <Icon size={17} style={{ opacity: active ? 1 : 0.7 }} />
                <span className="flex-1">{label}</span>
                {page === "notifications" && unreadCount > 0 && (
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: "#ef4444", color: "#ffffff", fontWeight: 700, fontSize: "0.65rem" }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User footer */}
      <div className="px-3 pb-4">
        <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: "#f5f4ff" }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "#4f46e5", color: "#ffffff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "0.8rem" }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#1e1b4b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userName}
            </div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: "#6b7280" }}>Student</div>
          </div>
          <button onClick={onLogout} title="Logout" style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "4px" }}>
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
