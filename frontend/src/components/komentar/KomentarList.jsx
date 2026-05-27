import { useState, useEffect } from "react";
import { getKomentar } from "../../api/komentarApi";
import "./KomentarList.css"; 

export default function KomentarList() {
  const [komentar, setKomentar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchKomentarData() {
      try {
        setLoading(true);
        const response = await getKomentar();
        setKomentar(response.data.data || response.data); 
      } catch (err) {
        setError(`Gagal: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchKomentarData();
  }, []);

  if (loading) return <div className="komentar-status">Memuat komentar... ⏳</div>;
  if (error) return <div className="komentar-status komentar-error">{error}</div>;

  return (
    <section className="komentar-section">
      <div className="komentar-container">
        <h2 className="section-title komentar-title">Komentar Properti</h2>
        
        <div className="komentar-list">
          {komentar.length === 0 ? (
            <p>Belum ada komentar untuk ditampilkan.</p>
          ) : (
            komentar.map((item) => (
              <div key={item.id} className="komentar-item">
                <div className="komentar-header">
                  <span className="komentar-name">{item.nama || "Pengguna Anonim"}</span>
                  <span className="komentar-id">ID Properti: {item.properti_id}</span>
                </div>
                <p className="komentar-text">
                  {item.isi_komentar || item.komentar}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}