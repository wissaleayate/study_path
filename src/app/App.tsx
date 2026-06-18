import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthPage } from "./components/AuthPage";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { OpportunitiesPage } from "./components/OpportunitiesPage";
import { StudyTracker } from "./components/StudyTracker";
import { BookmarksPage } from "./components/BookmarksPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { ProfilePage } from "./components/ProfilePage";
import { AdminDashboard } from "./components/AdminDashboard";
import { notifications } from "./components/data";

/* MARKER-MAKE-KIT-INVOKED */

type Page = "dashboard" | "internships" | "scholarships" | "workshops" | "tracker" | "bookmarks" | "notifications" | "profile" | "admin";

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [bookmarks, setBookmarks] = useState<string[]>(["i1", "s1", "w4"]);
  const [unreadCount, setUnreadCount] = useState(notifications.filter((n) => !n.read).length);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAuth = (name: string) => setUser(name);
  const handleLogout = () => { setUser(null); setActivePage("dashboard"); };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]);
  };

  const navigate = (page: string) => {
    setActivePage(page as Page);
    setSidebarOpen(false);
  };

  if (!user) return <AuthPage onAuth={handleAuth} />;

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard userName={user} bookmarks={bookmarks} onNavigate={navigate} />;
      case "internships":
        return <OpportunitiesPage type="internship" bookmarks={bookmarks} onToggleBookmark={toggleBookmark} />;
      case "scholarships":
        return <OpportunitiesPage type="scholarship" bookmarks={bookmarks} onToggleBookmark={toggleBookmark} />;
      case "workshops":
        return <OpportunitiesPage type="workshop" bookmarks={bookmarks} onToggleBookmark={toggleBookmark} />;
      case "tracker":
        return <StudyTracker />;
      case "bookmarks":
        return <BookmarksPage bookmarks={bookmarks} onToggleBookmark={toggleBookmark} />;
      case "notifications":
        return <NotificationsPage onUnreadChange={setUnreadCount} />;
      case "profile":
        return <ProfilePage userName={user} />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <Dashboard userName={user} bookmarks={bookmarks} onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f5f4ff", fontFamily: "'Nunito', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "16rem", zIndex: 30 }} className="lg:hidden">
          <Sidebar activePage={activePage} onNavigate={navigate} userName={user} unreadCount={unreadCount} onLogout={handleLogout} />
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-full">
        <Sidebar activePage={activePage} onNavigate={navigate} userName={user} unreadCount={unreadCount} onLogout={handleLogout} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3" style={{ background: "#ffffff", borderBottom: "1px solid rgba(79,70,229,0.1)" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#4f46e5" }}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1e1b4b" }}>OpportuniTrack</span>
          <div className="w-6" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
