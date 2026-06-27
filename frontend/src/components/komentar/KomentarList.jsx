import { useState, useEffect } from "react";
import http from "../../utils/http.js";
import "./KomentarList.css";

export default function KomentarList({ propertiId }) {
  const [komentar, setKomentar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({ isi_komentar: "" });
  
  // ✅ Ambil data user yang sedang login dari localStorage
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchKomentarData = async () => {
    try {
      setLoading(true);
      const response = await http.get("/komentar");
      const allData = response.data.data || response.data;
      
      if (propertiId) {
        const filteredData = allData.filter(
          item => String(item.properti_id) === String(propertiId)
        );
        setKomentar(filteredData);
      } else {
        setKomentar(allData);
      }
    } catch (err) {
      setError(`Gagal: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKomentarData();
  }, [propertiId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.isi_komentar || !token) return;
    
    setSubmitLoading(true);
    try {
      await http.post(
        "/komentar",
        {
          properti_id: propertiId,
          komentar: formData.isi_komentar,
          user_id: currentUser.id,
          nama_user: currentUser.nama // ✅ Kirim nama user saat posting
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFormData({ isi_komentar: "" });
      fetchKomentarData();
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim komentar. Sesi mungkin telah habis.");
    } finally {
      setSubmitLoading(false);
    }
  };

  // ✅ Helper function untuk mendapatkan nama user
  const getUserName = (item) => {
    // Prioritas 1: Nama dari backend (jika ada)
    if (item.nama_user) return item.nama_user;
    
    // Prioritas 2: Jika komentar dari user yang sedang login, ambil dari localStorage
    if (item.user_id === currentUser.id && currentUser.nama) {
      return currentUser.nama;
    }
    
    // Fallback: Tampilkan "User" + ID
    return `User ID: ${item.user_id}`;
  };

  if (loading) return <div className="komentar-status">Memuat komentar... ⏳</div>;
  if (error) return <div className="komentar-status komentar-error">{error}</div>;

  return (
    <div className="komentar-widget">
      <h3 className="komentar-title">
        Komentar Properti {komentar.length > 0 && `(${komentar.length})`}
      </h3>
      
      {propertiId && token ? (
        <form onSubmit={handleSubmit} className="komentar-form">
          <textarea
            placeholder="Tulis pertanyaan atau komentar..."
            rows="3"
            value={formData.isi_komentar}
            onChange={(e) => setFormData({ ...formData, isi_komentar: e.target.value })}
            required
            disabled={submitLoading}
          />
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: "100%" }} 
            disabled={submitLoading}
          >
            {submitLoading ? "Mengirim..." : "Kirim Komentar"}
          </button>
        </form>
      ) : propertiId && !token ? (
        <div style={{ 
          textAlign: "center", 
          padding: "15px", 
          background: "#f1f5f9", 
          borderRadius: "8px", 
          marginBottom: "20px" 
        }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#475569" }}>
            Silakan <strong>Login</strong> terlebih dahulu untuk menulis komentar.
          </p>
        </div>
      ) : null}

      <div className="komentar-list">
        {komentar.length === 0 ? (
          <p className="komentar-empty">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          komentar.map((item) => (
            <div key={item.id} className="komentar-item">
              <div className="komentar-header">
                <span className="komentar-name">
                  {getUserName(item)}
                </span>
              </div>
              <p className="komentar-text">{item.komentar}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}