import { Bookmark, BookmarkX, ExternalLink, MapPin, DollarSign } from "lucide-react";
import { opportunities } from "./data";

type Props = {
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

export function BookmarksPage({ bookmarks, onToggleBookmark }: Props) {
  const saved = opportunities.filter((o) => bookmarks.includes(o.id));

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#1e1b4b" }}>Saved Opportunities</h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280", marginTop: "0.25rem" }}>
          {saved.length} saved {saved.length === 1 ? "opportunity" : "opportunities"}
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-2xl" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "#ede9fe" }}>
            <Bookmark size={28} style={{ color: "#4f46e5" }} />
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#1e1b4b", marginBottom: "0.5rem" }}>No saved opportunities yet</h2>
          <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280", fontSize: "0.9rem" }}>
            Browse internships, scholarships, and courses, then bookmark the ones you're interested in.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map((opp) => {
            const color = typeColors[opp.type];
            const bg = typeBg[opp.type];
            const deadline = opp.deadline === "Rolling" ? null : new Date(opp.deadline);
            const daysLeft = deadline ? Math.ceil((deadline.getTime() - Date.now()) / 86400000) : null;
            const urgency = daysLeft !== null ? (daysLeft <= 14 ? "#ef4444" : daysLeft <= 30 ? "#f59e0b" : "#059669") : null;

            return (
              <div key={opp.id} className="bg-card rounded-2xl p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
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
                    title="Remove from saved"
                    className="p-1.5 rounded-lg hover:opacity-80 transition-all"
                    style={{ background: "#fee2e2", border: "none", cursor: "pointer" }}
                  >
                    <BookmarkX size={16} style={{ color: "#ef4444" }} />
                  </button>
                </div>

                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {opp.description}
                </p>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="flex items-center gap-1" style={{ color: "#6b7280", fontFamily: "'Nunito', sans-serif" }}>
                    <MapPin size={12} /> {opp.location}
                  </span>
                  {(opp.stipend || opp.amount) && (
                    <span className="flex items-center gap-1" style={{ color: "#059669", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                      <DollarSign size={12} /> {opp.stipend || opp.amount}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: bg, color, fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                    {opp.type}
                  </span>
                  {opp.remote && <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "#d1fae5", color: "#059669", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>Remote</span>}
                </div>

                <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: "rgba(79,70,229,0.08)" }}>
                  {daysLeft !== null ? (
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: urgency! }}>
                      {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                    </span>
                  ) : (
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.75rem", color: "#059669", fontWeight: 700 }}>Rolling</span>
                  )}
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                    style={{ background: "#ede9fe", color: "#4f46e5", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.78rem", border: "none", cursor: "pointer" }}
                  >
                    Apply <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
