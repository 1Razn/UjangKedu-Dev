import "./AdminStats.css";

export default function AdminStats({ users, reports }) {
  const total = users.length;
  const adminCount = users.filter((u) => u.role === "Admin").length;
  const userCount = users.filter((u) => u.role === "User").length;

  const cards = [
    { label: "Total User", value: total, icon: "👥", color: "primary" },
    { label: "Admin", value: adminCount, icon: "🛡️", color: "warning" },
    { label: "User Biasa", value: userCount, icon: "👤", color: "success" },
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