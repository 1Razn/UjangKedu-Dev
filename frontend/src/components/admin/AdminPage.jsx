import { useState } from "react";
import { Link } from "react-router-dom";
import AdminStats from "./AdminStats.jsx";
import UserTable from "./UserTable.jsx";
import ReportTable from "./ReportTable.jsx";
import { initialUsers, initialReports } from "./adminData.js";
import "./AdminPage.css";

export default function AdminPage() {
  const [users, setUsers] = useState(initialUsers);
  const [reports, setReports] = useState(initialReports);
  const [tab, setTab] = useState("dashboard");

  const toggleBan = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "blocked" : "active" }
          : u
      )
    );
  };

  const resolveReport = (reportId, decision) => {
    let targetUserId = null;
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          targetUserId = r.reportedUserId;
          return { ...r, status: decision };
        }
        return r;
      })
    );
    // Jika terbukti penipuan, otomatis blokir user terlapor
    if (decision === "proven" && targetUserId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === targetUserId ? { ...u, status: "blocked" } : u))
      );
    }
  };

  const menu = [
    { key: "dashboard", label: "Statistik", icon: '' },
    { key: "users", label: "Data User", icon: '' },
    { key: "reports", label: "Laporan", icon: '' },
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-logo">
          <span className="admin-logo-icon"></span>
          <span>BOTY <small>Admin</small></span>
        </Link>
        <nav className="admin-nav">
          {menu.map((m) => (
            <button
              key={m.key}
              className={`admin-nav-item ${tab === m.key ? "active" : ""}`}
              onClick={() => setTab(m.key)}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </nav>
        <Link to="/" className="admin-back">
          \ Kembali ke situs
        </Link>
      </aside>

      <main className="admin-content">
        <header className="admin-topbar">
          <h1>Dashboard Admin</h1>
          <p>Kelola user dan tinjau laporan penipuan properti.</p>
        </header>

        {tab === "dashboard" && (
          <>
            <AdminStats users={users} reports={reports} />
            <ReportTable reports={reports} onResolve={resolveReport} />
          </>
        )}
        {tab === "users" && <UserTable users={users} onToggleBan={toggleBan} />}
        {tab === "reports" && <ReportTable reports={reports} onResolve={resolveReport} />}
      </main>
    </div>
  );
}
