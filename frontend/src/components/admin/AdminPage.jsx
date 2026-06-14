import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminStats from "./AdminStats.jsx";
import UserTable from "./UserTable.jsx";
import ReportTable from "./ReportTable.jsx";
import UserForm from "./UserForm.jsx";
import { getUsers } from "../../api/userApi.js";
import "./AdminPage.css";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk form
  const [showForm, setShowForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (err) {
        console.error("Gagal memuat data admin:", err);
        setError("Gagal memuat data admin.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddUser = () => {
    setEditingUserId(null);
    setShowForm(true);
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUserId(null);
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingUserId(null);
    // Reload data user
    try {
      const usersData = await getUsers();
      setUsers(usersData);
      setTab("users"); // Kembali ke tab users
    } catch (err) {
      console.error("Gagal reload data:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      return;
    }

    try {
      const { deleteUser } = await import("../../api/userApi.js");
      await deleteUser(userId);
      // Update state lokal
      setUsers(prev => prev.filter(u => u.id !== userId));
      alert("User berhasil dihapus!");
    } catch (err) {
      console.error("Gagal menghapus user:", err);
      alert("Gagal menghapus user: " + (err.response?.data?.message || err.message));
    }
  };

  const menu = [
    { key: "dashboard", label: "Statistik", icon: "📊" },
    { key: "users", label: "Data User", icon: "👥" },
    { key: "reports", label: "Laporan", icon: "🚨" },
  ];

  if (loading) {
    return (
      <div className="admin-shell">
        <main className="admin-content">
          <p style={{ textAlign: "center", padding: "40px" }}>Memuat data admin... ⏳</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-shell">
        <main className="admin-content">
          <p style={{ textAlign: "center", padding: "40px", color: "red" }}>{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-logo">
          <span className="admin-logo-icon">🏠</span>
          <span>BOTY</span>
        </Link>

        <div className="admin-user-info">
          <strong>Admin</strong>
          <small>admin@boty.com</small>
        </div>

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

        <Link to="/" className="admin-back-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali ke Situs
        </Link>

        <button onClick={() => {
          if (confirm("Yakin ingin logout?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }
        }} className="admin-logout-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <header className="admin-topbar">
          <h1>Dashboard Admin</h1>
          <p>Kelola user dan tinjau laporan penipuan properti.</p>
        </header>

        {tab === "dashboard" && (
          <>
            <AdminStats users={users} reports={reports} />
            <ReportTable reports={reports} onResolve={() => {}} />
          </>
        )}

        {tab === "users" && (
          showForm ? (
            <UserForm
              userId={editingUserId}
              onCancel={handleCancelForm}
              onSuccess={handleFormSuccess}
            />
          ) : (
            <UserTable 
              users={users} 
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onAdd={handleAddUser}
            />
          )
        )}

        {tab === "reports" && <ReportTable reports={reports} onResolve={() => {}} />}
      </main>
    </div>
  );
}