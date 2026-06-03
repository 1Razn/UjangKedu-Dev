import "./AdminStats.css";

export default function AdminStats({ users, reports }) {
  const total = users.length;
  const active = users.filter((u) => u.status === "active").length;
  const blocked = users.filter((u) => u.status === "blocked").length;
  const pending = reports.filter((r) => r.status === "pending").length;

  const cards = [
    { label: "Total User", value: total, icon: '', color: "primary" },
    { label: "User Aktif", value: active, icon: '', color: "success" },
    { label: "User Diblokir", value: blocked, icon: '', color: "danger" },
    { label: "Laporan Menunggu", value: pending, icon: '', color: "warning" },
  ];

  return (
    <div className="admin-stats">
      {cards.map((c) => (
        <div key={c.label} className={`stat-card stat-${c.color}`}>
          <div className="stat-icon">{c.icon}</div>
          <div>
            <div className="stat-value">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
