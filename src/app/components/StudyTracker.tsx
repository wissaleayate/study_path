import { useState } from "react";
import { Plus, Target, Flame, Clock, TrendingUp, CheckCircle2, Circle, Trash2, Edit3, X, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { studyGoals as initialGoals, weeklyStudy, StudyGoal } from "./data";

const subjectColors = ["#4f46e5", "#7c3aed", "#0891b2", "#059669", "#d97706", "#dc2626"];

export function StudyTracker() {
  const [goals, setGoals] = useState<StudyGoal[]>(initialGoals);
  const [showAdd, setShowAdd] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newTarget, setNewTarget] = useState(20);
  const [newDeadline, setNewDeadline] = useState("2026-08-01");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [logHours, setLogHours] = useState<Record<string, string>>({});

  const totalStudied = weeklyStudy.reduce((s, d) => s + d.hours, 0);
  const totalGoalHours = goals.reduce((s, g) => s + g.targetHours, 0);
  const totalCompletedHours = goals.reduce((s, g) => s + g.completedHours, 0);
  const completedGoals = goals.filter((g) => g.completedHours >= g.targetHours).length;

  const addGoal = () => {
    if (!newSubject.trim()) return;
    const newGoal: StudyGoal = {
      id: `g${Date.now()}`,
      subject: newSubject,
      targetHours: newTarget,
      completedHours: 0,
      color: subjectColors[goals.length % subjectColors.length],
      deadline: newDeadline,
    };
    setGoals([...goals, newGoal]);
    setNewSubject("");
    setNewTarget(20);
    setShowAdd(false);
  };

  const deleteGoal = (id: string) => setGoals(goals.filter((g) => g.id !== id));

  const logStudyHours = (id: string) => {
    const hours = parseFloat(logHours[id] || "0");
    if (!hours || isNaN(hours)) return;
    setGoals(goals.map((g) => g.id === id ? { ...g, completedHours: Math.min(g.targetHours, g.completedHours + hours) } : g));
    setLogHours({ ...logHours, [id]: "" });
    setEditingId(null);
  };

  const monthlyData = [
    { month: "Feb", hours: 18 },
    { month: "Mar", hours: 24 },
    { month: "Apr", hours: 31 },
    { month: "May", hours: 27 },
    { month: "Jun", hours: totalStudied },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#1e1b4b" }}>Study Tracker</h1>
          <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280", marginTop: "0.25rem" }}>
            Monitor your learning goals and stay on track.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:opacity-90"
          style={{ background: "#4f46e5", color: "#ffffff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.875rem", border: "none", cursor: "pointer" }}
        >
          <Plus size={16} /> Add Goal
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "This Week", value: `${totalStudied.toFixed(1)}h`, icon: Clock, color: "#4f46e5", bg: "#ede9fe" },
          { label: "Study Streak", value: "7 days 🔥", icon: Flame, color: "#d97706", bg: "#fef3c7" },
          { label: "Goals Complete", value: `${completedGoals}/${goals.length}`, icon: CheckCircle2, color: "#059669", bg: "#d1fae5" },
          { label: "Total Goal Hours", value: `${totalCompletedHours}/${totalGoalHours}h`, icon: Target, color: "#7c3aed", bg: "#f3e8ff" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-card rounded-2xl p-4" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1e1b4b" }}>{value}</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.8rem", color: "#6b7280" }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Goals list */}
        <div className="lg:col-span-3 space-y-3">
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#1e1b4b" }}>Your Study Goals</h2>

          {/* Add goal form */}
          {showAdd && (
            <div className="bg-card rounded-2xl p-4 space-y-3" style={{ border: "2px solid #4f46e5" }}>
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1e1b4b" }}>New Study Goal</span>
                <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}><X size={16} /></button>
              </div>
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Subject or skill (e.g. Machine Learning)"
                className="w-full px-3 py-2.5 rounded-xl outline-none"
                style={{ border: "1.5px solid rgba(79,70,229,0.2)", background: "#f8f7ff", fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem" }}
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#6b7280", display: "block", marginBottom: "0.25rem" }}>Target Hours</label>
                  <input
                    type="number"
                    value={newTarget}
                    onChange={(e) => setNewTarget(Number(e.target.value))}
                    min={1}
                    className="w-full px-3 py-2.5 rounded-xl outline-none"
                    style={{ border: "1.5px solid rgba(79,70,229,0.2)", background: "#f8f7ff", fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem" }}
                  />
                </div>
                <div className="flex-1">
                  <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#6b7280", display: "block", marginBottom: "0.25rem" }}>Deadline</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl outline-none"
                    style={{ border: "1.5px solid rgba(79,70,229,0.2)", background: "#f8f7ff", fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem" }}
                  />
                </div>
              </div>
              <button
                onClick={addGoal}
                className="w-full py-2.5 rounded-xl transition-all hover:opacity-90"
                style={{ background: "#4f46e5", color: "#ffffff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, border: "none", cursor: "pointer" }}
              >
                Add Goal
              </button>
            </div>
          )}

          {goals.map((goal) => {
            const pct = Math.min(100, Math.round((goal.completedHours / goal.targetHours) * 100));
            const done = pct >= 100;
            return (
              <div key={goal.id} className="bg-card rounded-2xl p-4" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: goal.color }} />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#1e1b4b" }}>{goal.subject}</span>
                    {done && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#d1fae5", color: "#059669", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>Complete!</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditingId(editingId === goal.id ? null : goal.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "4px" }}>
                      <Edit3 size={14} />
                    </button>
                    <button onClick={() => deleteGoal(goal.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "4px" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between mb-2">
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#6b7280" }}>
                    {goal.completedHours}h completed of {goal.targetHours}h target
                  </span>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: goal.color }}>{pct}%</span>
                </div>

                <div className="rounded-full h-2.5 mb-2" style={{ background: "#eeedf8" }}>
                  <div
                    className="h-2.5 rounded-full transition-all"
                    style={{ width: `${pct}%`, background: done ? "#059669" : goal.color }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "#9ca3af" }}>
                    Deadline: {new Date(goal.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  {editingId === goal.id && (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={logHours[goal.id] || ""}
                        onChange={(e) => setLogHours({ ...logHours, [goal.id]: e.target.value })}
                        placeholder="hours"
                        className="w-20 px-2 py-1 rounded-lg text-xs outline-none"
                        style={{ border: "1.5px solid #4f46e5", fontFamily: "'Nunito', sans-serif" }}
                        min="0.5"
                        step="0.5"
                      />
                      <button
                        onClick={() => logStudyHours(goal.id)}
                        className="px-3 py-1 rounded-lg text-xs flex items-center gap-1"
                        style={{ background: "#4f46e5", color: "#fff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, border: "none", cursor: "pointer" }}
                      >
                        <Check size={12} /> Log
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card rounded-2xl p-4" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "1rem" }}>This Week</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={weeklyStudy} barCategoryGap="30%">
                <XAxis dataKey="day" tick={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", borderRadius: "0.75rem", border: "1px solid rgba(79,70,229,0.1)" }}
                  formatter={(v: number) => [`${v}h`, "Studied"]}
                />
                <Bar dataKey="hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-2xl p-4" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "1rem" }}>Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(79,70,229,0.08)" />
                <XAxis dataKey="month" tick={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", borderRadius: "0.75rem", border: "1px solid rgba(79,70,229,0.1)" }}
                  formatter={(v: number) => [`${v}h`, "Hours"]}
                />
                <Line type="monotone" dataKey="hours" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 4, fill: "#7c3aed" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Goal distribution */}
          <div className="bg-card rounded-2xl p-4" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "0.75rem" }}>Goal Breakdown</h3>
            <div className="space-y-2">
              {goals.map((goal) => {
                const pct = Math.min(100, Math.round((goal.completedHours / goal.targetHours) * 100));
                return (
                  <div key={goal.id} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: goal.color }} />
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#4b5563", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {goal.subject}
                    </span>
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: goal.color }}>{pct}%</span>
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
