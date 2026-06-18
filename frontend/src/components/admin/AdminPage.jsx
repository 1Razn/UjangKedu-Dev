import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminStats from "./AdminStats.jsx";
import UserTable from "./UserTable.jsx";
import ReportTable from "./ReportTable.jsx";
import UserForm from "./UserForm.jsx";
import { getUsers } from "../../api/userApi.js";
import http from "../../utils/http.js";
import "./AdminPage.css";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showForm, setShowForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, message: "", onConfirm: null });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const usersData = await getUsers();
        setUsers(usersData);

        const responseLaporan = await http.get('/laporan');
        const dataLaporan = responseLaporan.data.data || responseLaporan.data;
        setReports(Array.isArray(dataLaporan) ? dataLaporan : []);
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
    try {
      const usersData = await getUsers();
      setUsers(usersData);
      setTab("users"); 
    } catch (err) {
      console.error("Gagal reload data:", err);
    }
  };

  const handleDeleteUser = (userId) => {
    setConfirmDialog({
      show: true,
      message: "Apakah Anda yakin ingin menghapus user ini?",
      onConfirm: async () => {
        setConfirmDialog({ show: false, message: "", onConfirm: null }); 
        try {
          const { deleteUser } = await import("../../api/userApi.js");
          await deleteUser(userId);
          setUsers(prev => prev.filter(u => u.id !== userId));
          showToast("User berhasil dihapus!", "success");
        } catch (err) {
          console.error("Gagal menghapus user:", err);
          showToast("Gagal menghapus user: " + (err.response?.data?.message || err.message), "error");
        }
      }
    });
  };

  const handleBlockProperty = (propertiId) => {
    setConfirmDialog({
      show: true,
      message: "🚨 Yakin mau memblokir dan menghapus properti ini dari sistem? Tindakan ini tidak bisa dibatalkan!",
      onConfirm: async () => {
        setConfirmDialog({ show: false, message: "", onConfirm: null }); 
        try {
          await http.delete(`/properti/${propertiId}`);
          showToast("Properti berhasil diblokir dan dihapus dari sistem!", "success");
          
          const responseLaporan = await http.get('/laporan');
          const dataLaporan = responseLaporan.data.data || responseLaporan.data;
          setReports(Array.isArray(dataLaporan) ? dataLaporan : []);
        } catch (err) {
          console.error("Gagal memblokir properti:", err);
          showToast("Gagal memblokir properti. Periksa koneksi server.", "error");
        }
      }
    });
  };

  const handleRejectReport = (reportId) => {
    setConfirmDialog({
      show: true,
      message: "Apakah Anda yakin ingin menolak dan menghapus laporan ini?",
      onConfirm: async () => {
        setConfirmDialog({ show: false, message: "", onConfirm: null }); 
        try {
          await http.delete(`/laporan/${reportId}`);
          showToast("Laporan berhasil ditolak dan dihapus!", "success");
          
          const responseLaporan = await http.get('/laporan');
          const dataLaporan = responseLaporan.data.data || responseLaporan.data;
          setReports(Array.isArray(dataLaporan) ? dataLaporan : []);
        } catch (err) {
          console.error("Gagal menolak laporan:", err);
          showToast("Gagal menolak laporan. Periksa koneksi server.", "error");
        }
      }
    });
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
          setConfirmDialog({
            show: true,
            message: "Apakah Anda yakin ingin keluar dari halaman Admin?",
            onConfirm: () => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }
          });
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
            <ReportTable reports={reports} onRejectReport={handleRejectReport} onBlockProperty={handleBlockProperty} />
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

        {tab === "reports" && <ReportTable reports={reports} onRejectReport={handleRejectReport} onBlockProperty={handleBlockProperty} />}
      </main>

      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: toast.type === 'success' ? '#4caf50' : '#f44336',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          fontWeight: '600',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <span style={{ fontSize: '20px' }}>{toast.type === 'success' ? '✅' : '❌'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {confirmDialog.show && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(3px)'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px 30px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '12px', fontSize: '20px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚠️ Konfirmasi
            </h3>
            <p style={{ marginBottom: '24px', color: '#4b5563', lineHeight: '1.5', fontSize: '15px' }}>
              {confirmDialog.message}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setConfirmDialog({ show: false, message: "", onConfirm: null })}
                style={{ padding: '10px 16px', border: 'none', borderRadius: '6px', backgroundColor: '#e5e7eb', color: '#374151', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Batal
              </button>
              <button 
                onClick={confirmDialog.onConfirm}
                style={{ padding: '10px 16px', border: 'none', borderRadius: '6px', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
    </div>
  );
}