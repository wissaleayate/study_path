import { useState } from "react";
import { User, Mail, GraduationCap, MapPin, Briefcase, Edit3, Save, X, Star, BookOpen, Trophy, Flame } from "lucide-react";

type Props = { userName: string };

const interests = ["Software Engineering", "Machine Learning", "Data Science", "Design", "Product Management", "Finance", "Research"];
const opportunityTypes = ["Internships", "Scholarships", "Online Courses", "Workshops"];

export function ProfilePage({ userName }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userName);
  const [bio, setBio] = useState("Computer Science student at Stanford University. Passionate about AI, open-source software, and building products that matter. Currently seeking summer internships and research opportunities.");
  const [university, setUniversity] = useState("Stanford University");
  const [major, setMajor] = useState("Computer Science, B.S.");
  const [year, setYear] = useState("Junior (Class of 2027)");
  const [location, setLocation] = useState("San Francisco Bay Area");
  const [selectedInterests, setSelectedInterests] = useState(["Software Engineering", "Machine Learning", "Data Science"]);
  const [selectedTypes, setSelectedTypes] = useState(["Internships", "Online Courses"]);
  const [gpa, setGpa] = useState("3.87");

  const toggleInterest = (i: string) =>
    setSelectedInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  const toggleType = (t: string) =>
    setSelectedTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const stats = [
    { label: "Applications", value: "12", icon: Briefcase, color: "#4f46e5" },
    { label: "Study Hours", value: "78h", icon: BookOpen, color: "#7c3aed" },
    { label: "Scholarships Applied", value: "4", icon: Trophy, color: "#d97706" },
    { label: "Day Streak", value: "7", icon: Flame, color: "#dc2626" },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#1e1b4b" }}>My Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
          style={{
            background: editing ? "#f0eeff" : "#4f46e5",
            color: editing ? "#4f46e5" : "#ffffff",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.85rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          {editing ? <><X size={15} /> Cancel</> : <><Edit3 size={15} /> Edit Profile</>}
        </button>
      </div>

      {/* Avatar + basic info */}
      <div className="bg-card rounded-2xl p-6" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
        <div className="flex items-start gap-5">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#ffffff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.75rem" }}
          >
            {initials}
          </div>
          <div className="flex-1">
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-2 px-3 py-2 rounded-xl outline-none w-full"
                style={{ border: "1.5px solid #4f46e5", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#1e1b4b" }}
              />
            ) : (
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1e1b4b", marginBottom: "0.25rem" }}>{name}</h2>
            )}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280" }}>
                <GraduationCap size={14} /> {editing ? (
                  <input value={university} onChange={(e) => setUniversity(e.target.value)} className="outline-none border-b" style={{ borderColor: "#4f46e5", fontFamily: "'Nunito', sans-serif", color: "#6b7280", width: "180px" }} />
                ) : university}
              </span>
              <span className="flex items-center gap-1.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280" }}>
                <MapPin size={14} /> {editing ? (
                  <input value={location} onChange={(e) => setLocation(e.target.value)} className="outline-none border-b" style={{ borderColor: "#4f46e5", fontFamily: "'Nunito', sans-serif", color: "#6b7280", width: "140px" }} />
                ) : location}
              </span>
            </div>
            <div className="mt-3">
              {editing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl outline-none resize-none"
                  style={{ border: "1.5px solid rgba(79,70,229,0.2)", fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem", color: "#4b5563" }}
                />
              ) : (
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.6 }}>{bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card rounded-2xl p-4 text-center" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
            <Icon size={22} className="mx-auto mb-2" style={{ color }} />
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#1e1b4b" }}>{value}</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "#6b7280" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Academic info */}
      <div className="bg-card rounded-2xl p-5" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "1rem" }}>Academic Information</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Major", value: major, setter: setMajor },
            { label: "Year", value: year, setter: setYear },
            { label: "GPA", value: gpa, setter: setGpa },
          ].map(({ label, value, setter }) => (
            <div key={label}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{label}</div>
              {editing ? (
                <input
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl outline-none"
                  style={{ border: "1.5px solid rgba(79,70,229,0.2)", fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem" }}
                />
              ) : (
                <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#1e1b4b" }}>{value}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="bg-card rounded-2xl p-5" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "0.75rem" }}>Fields of Interest</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <button
              key={i}
              onClick={() => editing && toggleInterest(i)}
              className="px-3 py-1.5 rounded-full text-sm transition-all"
              style={{
                background: selectedInterests.includes(i) ? "#4f46e5" : "#eeedf8",
                color: selectedInterests.includes(i) ? "#ffffff" : "#4b5563",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600,
                border: "none",
                cursor: editing ? "pointer" : "default",
              }}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity preferences */}
      <div className="bg-card rounded-2xl p-5" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#1e1b4b", marginBottom: "0.75rem" }}>Opportunity Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {opportunityTypes.map((t) => (
            <button
              key={t}
              onClick={() => editing && toggleType(t)}
              className="px-3 py-1.5 rounded-full text-sm transition-all"
              style={{
                background: selectedTypes.includes(t) ? "#7c3aed" : "#eeedf8",
                color: selectedTypes.includes(t) ? "#ffffff" : "#4b5563",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600,
                border: "none",
                cursor: editing ? "pointer" : "default",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {editing && (
        <button
          onClick={() => setEditing(false)}
          className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ background: "#4f46e5", color: "#ffffff", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: "pointer" }}
        >
          <Save size={16} /> Save Changes
        </button>
      )}
    </div>
  );
}
