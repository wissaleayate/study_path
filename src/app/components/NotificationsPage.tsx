import { useState } from "react";
import { Bell, BellOff, Clock, Zap, Calendar, CheckCheck } from "lucide-react";
import { notifications as initialNotifs } from "./data";

type Notif = { id: string; type: string; message: string; time: string; read: boolean };

type Props = { onUnreadChange: (count: number) => void };

const typeIcon: Record<string, React.ElementType> = {
  deadline: Calendar,
  new: Zap,
  reminder: Bell,
};
const typeColor: Record<string, string> = {
  deadline: "#ef4444",
  new: "#4f46e5",
  reminder: "#d97706",
};
const typeBg: Record<string, string> = {
  deadline: "#fee2e2",
  new: "#ede9fe",
  reminder: "#fef3c7",
};

export function NotificationsPage({ onUnreadChange }: Props) {
  const [notifs, setNotifs] = useState<Notif[]>(initialNotifs);

  const markAllRead = () => {
    const updated = notifs.map((n) => ({ ...n, read: true }));
    setNotifs(updated);
    onUnreadChange(0);
  };

  const markRead = (id: string) => {
    const updated = notifs.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifs(updated);
    onUnreadChange(updated.filter((n) => !n.read).length);
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#1e1b4b" }}>Notifications</h1>
          <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280", marginTop: "0.25rem" }}>
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: "#ede9fe", color: "#4f46e5", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem", border: "none", cursor: "pointer" }}
          >
            <CheckCheck size={15} /> Mark all read
          </button>
        )}
      </div>

      {notifs.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl" style={{ border: "1px solid rgba(79,70,229,0.08)" }}>
          <BellOff size={32} className="mx-auto mb-3" style={{ color: "#9ca3af" }} />
          <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b7280" }}>No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifs.map((notif) => {
            const Icon = typeIcon[notif.type] || Bell;
            const color = typeColor[notif.type] || "#4f46e5";
            const bg = typeBg[notif.type] || "#ede9fe";
            return (
              <div
                key={notif.id}
                onClick={() => !notif.read && markRead(notif.id)}
                className="flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer hover:shadow-sm"
                style={{
                  background: notif.read ? "#ffffff" : "#f8f7ff",
                  border: notif.read ? "1px solid rgba(79,70,229,0.08)" : "1px solid rgba(79,70,229,0.2)",
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: notif.read ? 600 : 700, fontSize: "0.875rem", color: "#1e1b4b", lineHeight: 1.5 }}>
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock size={11} style={{ color: "#9ca3af" }} />
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.72rem", color: "#9ca3af" }}>{notif.time}</span>
                  </div>
                </div>
                {!notif.read && (
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" style={{ background: "#4f46e5" }} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
