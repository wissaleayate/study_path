import { useState } from "react";
import { Users, Briefcase, Trophy, BookOpen, TrendingUp, Plus, Trash2, Eye, EyeOff, BarChart3, CheckCircle, XCircle, Settings } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { opportunities } from "./data";

const COLORS = ["#4f46e5", "#7c3aed", "#0891b2", "#059669"];

const userStats = [
  { label: "Total Students", value: "52,418", icon: Users, color: "#4f46e5", change: "+12%" },
  { label: "Active Listings", value: "2,584", icon: Briefcase, color: "#7c3aed", change: "+8%" },
  { label: "Applications This Month", value: "8,231", icon: TrendingUp, color: "#0891b2", change: "+24%" },
  { label: "Avg. Sessions/Day", value: "1,340", icon: BarChart3, color: "#059669", change: "+6%" },
];

const monthlyUsers = [
  { month: "Jan", users: 4200 },
  { month: "Feb", users: 5800 },
  { month: "Mar", users: 7200 },
  { month: "Apr", users: 9100 },
  { month: "May", users: 11400 },
  { month: "Jun", users: 14800 },
];

const contentDist = [
  { name: "Internships", value: 1247 },
  { name: "Scholarships", value: 523 },
  { name: "Courses", value: 614 },
  { name: "Workshops", value: 200 },
];

const pendingListings = [
  { id: "p1", title: "Research Assistant – MIT AI Lab", type: "internship", org: "MIT", submitted: "2026-06-09", status: "pending" },
  { id: "p2", title: "National Merit Scholarship 2026", type: "scholarship", org: "NMSC", submitted: "2026-06-10", status: "pending" },
  { id: "p3", title: "UX Design Sprint Workshop", type: "workshop", org: "Adobe", submitted: "2026-06-10", status: "pending" },
];

type Tab = "overview" | "listings" | "users" | "settings";

const settingsData = [
  { label: "Email Notifications", desc: "Send deadline reminders to students", defaultOn: true },
  { label: "New Listing Approval", desc: "Require admin approval for new submissions", defaultOn: true },
  { label: "Featured Opportunities", desc: "Allow organizations to promote listings", defaultOn: false },
  { label: "Study Tracker Analytics", desc: "Collect anonymized study data for insights", defaultOn: true },
];

function SettingToggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="bg-card rounded-2xl p-4 flex items-center justify-between" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
      <div>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1e1b4b" }}>{label}</div>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#6b7280" }}>{desc}</div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className="w-11 h-6 rounded-full transition-all relative"
        style={{ background: on ? "#4f46e5" : "#d1d5db", border: "none", cursor: "pointer" }}
      >
        <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: on ? "calc(100% - 1.375rem)" : "0.125rem" }} />
      </button>
    </div>
  );
}

function AdminSettings() {
  return (
    <div className="space-y-4 max-w-xl">
      {settingsData.map((s) => <SettingToggle key={s.label} {...s} />)}
    </div>
  );
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [listings, setListings] = useState(pendingListings);

  const approve = (id: string) => setListings(listings.filter((l) => l.id !== id));
  const reject = (id: string) => setListings(listings.filter((l) => l.id !== id));

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "listings", label: "Manage Listings" },
    { key: "users", label: "Users" },
    { key: "settings", label: "Settings" },
  ];

  const typeColors: Record<string, string> = { internship: "#4f46e5", scholarship: "#7c3aed", workshop: "#0891b2", course: "#059669" };
  const typeBg: Record<string, string> = { internship: "#ede9fe", scholarship: "#f3e8ff", workshop: "#e0f2fe", course: "#d1fae5" };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#1e1b4b" }}>Admin Dashboard</h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280", marginTop: "0.25rem" }}>Platform management and analytics</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "#eeedf8" }}>
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="px-4 py-2 rounded-lg transition-all"
            style={{
              background: activeTab === key ? "#4f46e5" : "transparent",
              color: activeTab === key ? "#ffffff" : "#6b7280",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {userStats.map(({ label, value, icon: Icon, color, change }) => (
              <div key={label} className="bg-card rounded-2xl p-4" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
                <div className="flex items-center justify-between mb-3">
                  <Icon size={20} style={{ color }} />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#d1fae5", color: "#059669", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{change}</span>
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#1e1b4b" }}>{value}</div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#6b7280" }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly growth */}
            <div className="bg-card rounded-2xl p-5" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "1rem" }}>Monthly Active Users</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyUsers}>
                  <XAxis dataKey="month" tick={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ fontFamily: "'Nunito', sans-serif", borderRadius: "0.75rem", border: "1px solid rgba(79,70,229,0.1)" }} />
                  <Bar dataKey="users" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie chart */}
            <div className="bg-card rounded-2xl p-5" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "1rem" }}>Content Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={contentDist} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                    {contentDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem" }} />
                  <Tooltip contentStyle={{ fontFamily: "'Nunito', sans-serif", borderRadius: "0.75rem", border: "1px solid rgba(79,70,229,0.1)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === "listings" && (
        <div className="space-y-4">
          {/* Pending approvals */}
          <div className="bg-card rounded-2xl p-5" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "1rem" }}>
              Pending Approvals ({listings.length})
            </h3>
            {listings.length === 0 ? (
              <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280", textAlign: "center", padding: "2rem" }}>No pending submissions.</p>
            ) : (
              <div className="space-y-3">
                {listings.map((l) => (
                  <div key={l.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: "#f8f7ff" }}>
                    <div className="flex-1">
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#1e1b4b" }}>{l.title}</div>
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#6b7280" }}>{l.org} · Submitted {l.submitted}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: typeBg[l.type] || "#ede9fe", color: typeColors[l.type] || "#4f46e5", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                      {l.type}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => approve(l.id)}
                        className="p-2 rounded-lg"
                        style={{ background: "#d1fae5", border: "none", cursor: "pointer" }}
                        title="Approve"
                      >
                        <CheckCircle size={16} style={{ color: "#059669" }} />
                      </button>
                      <button
                        onClick={() => reject(l.id)}
                        className="p-2 rounded-lg"
                        style={{ background: "#fee2e2", border: "none", cursor: "pointer" }}
                        title="Reject"
                      >
                        <XCircle size={16} style={{ color: "#ef4444" }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All listings table */}
          <div className="bg-card rounded-2xl p-5" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b" }}>All Listings</h3>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#4f46e5", color: "#ffffff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.8rem", border: "none", cursor: "pointer" }}>
                <Plus size={14} /> Add Listing
              </button>
            </div>
            <div className="space-y-2">
              {opportunities.slice(0, 6).map((opp) => (
                <div key={opp.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-all" style={{ borderBottom: "1px solid rgba(79,70,229,0.06)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0" style={{ background: typeColors[opp.type], color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>
                    {opp.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#1e1b4b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{opp.title}</div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "#6b7280" }}>{opp.organization}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full shrink-0" style={{ background: typeBg[opp.type], color: typeColors[opp.type], fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                    {opp.type}
                  </span>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "#6b7280", whiteSpace: "nowrap" }}>{opp.deadline}</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg" style={{ background: "#ede9fe", border: "none", cursor: "pointer" }}><Eye size={13} style={{ color: "#4f46e5" }} /></button>
                    <button className="p-1.5 rounded-lg" style={{ background: "#fee2e2", border: "none", cursor: "pointer" }}><Trash2 size={13} style={{ color: "#ef4444" }} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="bg-card rounded-2xl p-5" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "1rem" }}>Recent Students</h3>
          <div className="space-y-2">
            {[
              { name: "Alex Johnson", email: "alex@stanford.edu", school: "Stanford", joined: "Jun 1, 2026", role: "Student" },
              { name: "Priya Sharma", email: "priya@mit.edu", school: "MIT", joined: "Jun 3, 2026", role: "Student" },
              { name: "Marcus Lee", email: "marcus@uchicago.edu", school: "UChicago", joined: "Jun 5, 2026", role: "Student" },
              { name: "Aisha Nwosu", email: "aisha@harvard.edu", school: "Harvard", joined: "Jun 7, 2026", role: "Student" },
              { name: "Jordan Kim", email: "jordan@caltech.edu", school: "Caltech", joined: "Jun 9, 2026", role: "Student" },
            ].map((user) => (
              <div key={user.email} className="flex items-center gap-4 p-3 rounded-xl hover:bg-background transition-all">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "#4f46e5", color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "0.75rem" }}>
                  {user.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div className="flex-1">
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#1e1b4b" }}>{user.name}</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "#6b7280" }}>{user.email} · {user.school}</div>
                </div>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "#9ca3af" }}>{user.joined}</span>
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#ede9fe", color: "#4f46e5", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && <AdminSettings />}
    </div>
  );
}
