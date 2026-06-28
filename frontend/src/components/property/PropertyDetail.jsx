import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPropertyByIdApi } from "../../api/propertiApi.js";
import KomentarList from "../komentar/KomentarList";
import "./PropertyDetail.css";

// ✅ Helper untuk URL gambar (menggunakan proxy Vite)
const getImageUrl = (filename) => {
  if (!filename) return "";
  // Jika sudah URL lengkap (http/https), kembalikan apa adanya
  if (filename.startsWith("http://") || filename.startsWith("https://")) {
    return filename;
  }
  // Gunakan path relatif yang akan di-proxy oleh Vite
  return `/uploads/properti/${filename}`;
};

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true);
        const data = await getPropertyByIdApi(id);
        console.log("Data property dari API:", data);
        setProperty(data);
      } catch (err) {
        console.error("Gagal memuat detail properti:", err);
        setError("Properti tidak ditemukan");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="container" style={{ textAlign: "center", padding: "40px" }}>
          <p>Memuat detail properti... ⏳</p>
          <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="detail-notfound">
        <h2>Properti tidak ditemukan</h2>
        <p>{error || "Data properti tidak tersedia"}</p>
        <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
      </div>
    );
  }

  const formatWhatsAppNumber = (phone) => {
    if (!phone) return "";
    let cleaned = phone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.substring(1);
    }
    if (!cleaned.startsWith("62") && cleaned.length === 10) {
      cleaned = "62" + cleaned;
    }
    return cleaned;
  };

  return (
    <div className="detail-page">
      <div className="container detail-top">
        <Link to="/" className="detail-back">
          <i className="fa-solid fa-arrow-left"></i> Kembali
        </Link>
      </div>

      <div className="container detail-grid">
        <div className="detail-main">
          <div className="detail-gallery">
            <div className="detail-gallery-main">
              {/* ✅ Gunakan helper getImageUrl */}
              <img src={getImageUrl(property.image)} alt={property.title} />
              <div className="detail-badges">
                <span className="badge badge-primary">{property.type}</span>
                {property.featured && <span className="badge badge-warning">Featured</span>}
              </div>
            </div>
          </div>

          <div className="detail-block">
            <p className="detail-price">{property.price}</p>
            <h1 className="detail-title">{property.title}</h1>
            <p className="detail-location">
              <i className="fa-solid fa-location-dot"></i> {property.location}
            </p>
          </div>

          <div className="detail-specs">
            {property.area && (
              <div className="detail-spec">
                <div>
                  <i className="fa-solid fa-ruler-combined"></i>
                  <strong>{property.area} m²</strong>
                  <span>Luas Properti</span>
                </div>
              </div>
            )}
            {property.tanggal_tayang && (
              <div className="detail-spec">
                <div>
                  <i className="fa-solid fa-calendar-check"></i>
                  <strong>{property.tanggal_tayang.substring(0, 10)}</strong>
                  <span>Tanggal Tayang</span>
                </div>
              </div>
            )}
          </div>

          <div className="detail-block">
            <h2 className="detail-h2">
              <i className="fa-solid fa-clipboard-list"></i> Detail Properti
            </h2>
            <div className="detail-info-grid">
              {property.luas_tanah && (
                <div className="detail-info-item">
                  <strong>Luas Tanah:</strong> {property.luas_tanah} m²
                </div>
              )}
            </div>
          </div>

          {property.location && (
            <div className="detail-block">
              <h2 className="detail-h2">
                <i className="fa-solid fa-map-location-dot"></i> Lokasi & Alamat Lengkap
              </h2>
              <p className="detail-desc">{property.location}</p>
            </div>
          )}

          {property.description && (
            <div className="detail-block">
              <h2 className="detail-h2">
                <i className="fa-solid fa-align-left"></i> Deskripsi
              </h2>
              <p className="detail-desc">{property.description}</p>
            </div>
          )}

          {property.facilities && property.facilities.length > 0 && (
            <div className="detail-block">
              <h2 className="detail-h2">
                <i className="fa-solid fa-list-check"></i> Fasilitas
              </h2>
              <ul className="detail-facilities">
                {property.facilities.map((f, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-check"></i> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="detail-aside">
          <div className="detail-agent-card">
            <div className="detail-agent-head">
              <div className="detail-agent-avatar">
                {property.agent ? property.agent.charAt(0) : "A"}
              </div>
              <div>
                <p className="detail-agent-name">{property.agent || "Agen"}</p>
                <span className="detail-agent-role">
                  <i className="fa-solid fa-shield-check"></i>Terverifikasi
                </span>
              </div>
            </div>
            <p className="detail-agent-price">{property.price}</p>

            {property.no_hp && (
              <a
                className="btn btn-primary detail-agent-btn"
                href={`https://wa.me/${formatWhatsAppNumber(property.no_hp)}?text=${encodeURIComponent(
                  `Halo, saya tertarik dengan properti "${property.title}" yang Anda iklankan di BOTY. Apakah masih tersedia?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp"></i> Hubungi Penjual
              </a>
            )}

            {(property.agent_email || property.user_email || property.email) && (
              <a
                className="btn btn-outline detail-agent-btn"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${property.agent_email || property.user_email || property.email}&su=${encodeURIComponent(
                  `Pertanyaan tentang ${property.title}`
                )}&body=${encodeURIComponent(
                  `Halo,\n\nSaya tertarik dengan properti "${property.title}" yang Anda iklankan di BOTY.\n\nMohon informasi lebih lanjut.\n\nTerima kasih.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-envelope"></i> Kirim Pesan
              </a>
            )}
          </div>
          <KomentarList propertiId={property.id} />
        </aside>
      </div>
    </div>
  );
}