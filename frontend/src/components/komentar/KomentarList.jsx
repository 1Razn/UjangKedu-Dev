import { useState, useEffect } from "react";
import http from "../../utils/http.js"; 
import "./KomentarList.css";

export default function KomentarList({ propertiId }) {
  const [komentar, setKomentar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({ nama: "", isi_komentar: "" });

  const fetchKomentarData = async () => {
    try {
      setLoading(true);
      const response = await http.get("/komentar");
      const allData = response.data.data || response.data;

      if (propertiId) {
        const filteredData = allData.filter(item => String(item.properti_id) === String(propertiId));
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
    if (!formData.isi_komentar) return;

    setSubmitLoading(true);
    try {
      await http.post("/komentar", {
        properti_id: propertiId,
        komentar: formData.isi_komentar,
        user_id: 1 
      });
      
      setFormData({ nama: "", isi_komentar: "" });
      fetchKomentarData(); 
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim komentar.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="komentar-status">Memuat komentar... ⏳</div>;
  if (error) return <div className="komentar-status komentar-error">{error}</div>;

  return (
    <div className="komentar-widget">
      <h3 className="komentar-title">
        Komentar Properti {komentar.length > 0 && `(${komentar.length})`}
      </h3>
      {propertiId && (
        <form onSubmit={handleSubmit} className="komentar-form">
          <input
            type="text"
            placeholder="Nama (Opsional / Anonim)"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            disabled={submitLoading}
          />
          <textarea
            placeholder="Tulis pertanyaan atau komentar..."
            rows="3"
            value={formData.isi_komentar}
            onChange={(e) => setFormData({ ...formData, isi_komentar: e.target.value })}
            required
            disabled={submitLoading}
          />
          <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={submitLoading}>
            {submitLoading ? "Mengirim..." : "Kirim Komentar"}
          </button>
        </form>
      )}

      <div className="komentar-list">
        {komentar.length === 0 ? (
          <p className="komentar-empty">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          komentar.map((item) => (
            <div key={item.id} className="komentar-item">
              <div className="komentar-header">
                <span className="komentar-name">User ID: {item.user_id} </span>
              </div>
              <p className="komentar-text">
                {item.komentar}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}