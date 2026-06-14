import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPropertyByIdApi } from "../../api/propertiApi.js"; 
import "./PropertyDetail.css";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true);
        const data = await getPropertyByIdApi(id);
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

  // Loading state
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

  // Error state
  if (error || !property) {
    return (
      <div className="detail-notfound">
        <h2>Properti tidak ditemukan</h2>
        <p>{error || "Data properti tidak tersedia"}</p>
        <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
      </div>
    );
  }

  // Pastikan gallery ada
  const gallery = property.gallery && property.gallery.length ? property.gallery : [property.image];

  return (
    <div className="detail-page">
      <div className="container detail-top">
        <Link to="/" className="detail-back">Kembali</Link>
      </div>

      <div className="container detail-grid">
        <div className="detail-main">
          {/* Gallery */}
          <div className="detail-gallery">
            <div className="detail-gallery-main">
              <img src={gallery[active]} alt={property.title} />
              <div className="detail-badges">
                <span className="badge badge-primary">{property.type}</span>
                {property.featured && <span className="badge badge-warning">Featured</span>}
              </div>
            </div>
            {gallery.length > 1 && (
              <div className="detail-thumbs">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    className={`detail-thumb ${i === active ? "active" : ""}`}
                    onClick={() => setActive(i)}
                  >
                    <img src={g} alt={`${property.title} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Dasar */}
          <div className="detail-block">
            <p className="detail-price">{property.price}</p>
            <h1 className="detail-title">{property.title}</h1>
            <p className="detail-location">{property.location}</p>
          </div>

          {/* Spesifikasi */}
          <div className="detail-specs">
            {property.bedrooms !== undefined && (
              <div className="detail-spec">
                <div>
                  <strong>{property.bedrooms}</strong>
                  <span>Kamar Tidur</span>
                </div>
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="detail-spec">
                <div>
                  <strong>{property.bathrooms}</strong>
                  <span>Kamar Mandi</span>
                </div>
              </div>
            )}
            <div className="detail-spec">
              <div>
                <strong>{property.area} m²</strong>
                <span>Luas</span>
              </div>
            </div>
            {property.certificate && (
              <div className="detail-spec">
                <div>
                  <strong>{property.certificate}</strong>
                  <span>Sertifikat</span>
                </div>
              </div>
            )}
            {property.year && (
              <div className="detail-spec">
                <div>
                  <strong>{property.year}</strong>
                  <span>Tahun</span>
                </div>
              </div>
            )}
          </div>

          {/* Deskripsi */}
          {property.description && (
            <div className="detail-block">
              <h2 className="detail-h2">Deskripsi</h2>
              <p className="detail-desc">{property.description}</p>
            </div>
          )}

          {/* Fasilitas */}
          {property.facilities && property.facilities.length > 0 && (
            <div className="detail-block">
              <h2 className="detail-h2">Fasilitas</h2>
              <ul className="detail-facilities">
                {property.facilities.map((f, index) => (
                  <li key={index}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Agen */}
        <aside className="detail-aside">
          <div className="detail-agent-card">
            <div className="detail-agent-head">
              <div className="detail-agent-avatar">
                {property.agent ? property.agent.charAt(0) : "A"}
              </div>
              <div>
                <p className="detail-agent-name">{property.agent || "Agen"}</p>
                <span className="detail-agent-role">Agen Terverifikasi</span>
              </div>
            </div>
            <p className="detail-agent-price">{property.price}</p>
            <button className="btn btn-primary detail-agent-btn">Hubungi Agen</button>
            <button className="btn btn-outline detail-agent-btn">Kirim Pesan</button>
          </div>
        </aside>
      </div>
    </div>
  );
}