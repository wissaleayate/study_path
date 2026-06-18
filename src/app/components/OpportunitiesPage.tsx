import { useState } from "react";
import { Search, SlidersHorizontal, Bookmark, BookmarkCheck, MapPin, Clock, DollarSign, ExternalLink, Filter, X } from "lucide-react";
import { opportunities, Opportunity } from "./data";

type OppType = "internship" | "scholarship" | "workshop" | "course";

type Props = {
  type: OppType | "all";
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
};

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

const allTags = ["STEM", "Engineering", "Design", "Business", "Finance", "AI/ML", "Web Dev", "Free", "Paid", "Remote", "Full Ride", "Graduate", "Undergraduate"];

export function OpportunitiesPage({ type, bookmarks, onToggleBookmark }: Props) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"deadline" | "stipend" | "default">("default");

  const pageTitle =
    type === "internship" ? "Internships" :
    type === "scholarship" ? "Scholarships" :
    type === "workshop" || type === "course" ? "Courses & Workshops" :
    "All Opportunities";

  let filtered = opportunities.filter((o) =>
    (type === "all" || o.type === type || (type === "workshop" && o.type === "course"))
  );

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (o) => o.title.toLowerCase().includes(q) || o.organization.toLowerCase().includes(q) || o.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (selectedTags.length > 0) {
    filtered = filtered.filter((o) => selectedTags.some((t) => o.tags.includes(t)));
  }

  if (remoteOnly) {
    filtered = filtered.filter((o) => o.remote);
  }

  if (sortBy === "deadline") {
    filtered = filtered.sort((a, b) => {
      if (a.deadline === "Rolling") return 1;
      if (b.deadline === "Rolling") return -1;
      return a.deadline.localeCompare(b.deadline);
    });
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#1e1b4b" }}>{pageTitle}</h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280", marginTop: "0.25rem" }}>
          {filtered.length} opportunities found
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, organization, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none"
            style={{ border: "1.5px solid rgba(79,70,229,0.15)", background: "#ffffff", fontFamily: "'Nunito', sans-serif", fontSize: "0.875rem", color: "#1e1b4b" }}
            onFocus={(e) => (e.target.style.border = "1.5px solid #4f46e5")}
            onBlur={(e) => (e.target.style.border = "1.5px solid rgba(79,70,229,0.15)")}
          />
        </div>

        <button
          onClick={() => setRemoteOnly(!remoteOnly)}
          className="px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all"
          style={{
            background: remoteOnly ? "#4f46e5" : "#ffffff",
            color: remoteOnly ? "#ffffff" : "#4b5563",
            border: "1.5px solid",
            borderColor: remoteOnly ? "#4f46e5" : "rgba(79,70,229,0.15)",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          Remote only
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2.5 rounded-xl outline-none"
          style={{ border: "1.5px solid rgba(79,70,229,0.15)", background: "#ffffff", fontFamily: "'Nunito', sans-serif", fontSize: "0.85rem", color: "#4b5563", cursor: "pointer" }}
        >
          <option value="default">Sort: Featured</option>
          <option value="deadline">Sort: Deadline</option>
        </select>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all"
          style={{
            background: showFilters ? "#ede9fe" : "#ffffff",
            color: "#4f46e5",
            border: "1.5px solid rgba(79,70,229,0.2)",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          <Filter size={15} /> Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
        </button>
      </div>

      {/* Tag filters */}
      {showFilters && (
        <div className="mb-4 p-4 rounded-2xl" style={{ background: "#ffffff", border: "1px solid rgba(79,70,229,0.1)" }}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", color: "#1e1b4b" }}>Filter by Tags</span>
            {selectedTags.length > 0 && (
              <button onClick={() => setSelectedTags([])} className="flex items-center gap-1 text-xs" style={{ color: "#ef4444", fontFamily: "'Nunito', sans-serif", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>
                <X size={12} /> Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-3 py-1 rounded-full text-xs transition-all"
                style={{
                  background: selectedTags.includes(tag) ? "#4f46e5" : "#eeedf8",
                  color: selectedTags.includes(tag) ? "#ffffff" : "#4b5563",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔍</div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1e1b4b" }}>No results found</p>
          <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280", fontSize: "0.9rem" }}>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((opp) => (
            <OpportunityCard key={opp.id} opp={opp} bookmarked={bookmarks.includes(opp.id)} onToggleBookmark={onToggleBookmark} />
          ))}
        </div>
      )}
    </div>
  );
}

function OpportunityCard({ opp, bookmarked, onToggleBookmark }: { opp: Opportunity; bookmarked: boolean; onToggleBookmark: (id: string) => void }) {
  const color = typeColors[opp.type];
  const bg = typeBg[opp.type];

  const deadline = opp.deadline === "Rolling" ? null : new Date(opp.deadline);
  const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
  const urgency = daysLeft !== null ? (daysLeft <= 14 ? "#ef4444" : daysLeft <= 30 ? "#f59e0b" : "#059669") : null;

  return (
    <div className="bg-card rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg transition-all" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: color, color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "0.9rem" }}>
            {opp.logo}
          </div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#1e1b4b", lineHeight: 1.3 }}>{opp.title}</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.78rem", color: "#6b7280" }}>{opp.organization}</div>
          </div>
        </div>
        <button
          onClick={() => onToggleBookmark(opp.id)}
          className="p-1.5 rounded-lg transition-all hover:opacity-80 shrink-0"
          style={{ background: bookmarked ? "#ede9fe" : "#f5f4ff", border: "none", cursor: "pointer" }}
        >
          {bookmarked ? <BookmarkCheck size={16} style={{ color: "#4f46e5" }} /> : <Bookmark size={16} style={{ color: "#9ca3af" }} />}
        </button>
      </div>

      {/* Description */}
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {opp.description}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="flex items-center gap-1" style={{ color: "#6b7280", fontFamily: "'Nunito', sans-serif" }}>
          <MapPin size={12} /> {opp.location}
        </span>
        {opp.duration && (
          <span className="flex items-center gap-1" style={{ color: "#6b7280", fontFamily: "'Nunito', sans-serif" }}>
            <Clock size={12} /> {opp.duration}
          </span>
        )}
        {(opp.stipend || opp.amount) && (
          <span className="flex items-center gap-1" style={{ color: "#059669", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
            <DollarSign size={12} /> {opp.stipend || opp.amount}
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: bg, color, fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
          {opp.type}
        </span>
        {opp.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-full text-xs" style={{ background: "#eeedf8", color: "#4b5563", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
            {tag}
          </span>
        ))}
        {opp.remote && (
          <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "#d1fae5", color: "#059669", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
            Remote
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: "rgba(79,70,229,0.08)" }}>
        {daysLeft !== null ? (
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: urgency! }}>
            {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
          </span>
        ) : (
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "#059669", fontWeight: 700 }}>Rolling admissions</span>
        )}
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
          style={{ background: "#ede9fe", color: "#4f46e5", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.78rem", border: "none", cursor: "pointer" }}
        >
          Apply <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}
