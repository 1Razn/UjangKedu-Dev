import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PropertyCard({ p }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Mencegah klik like membuka detail properti
    setLiked(!liked);
  };

  const handleReportClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Mencegah klik lapor membuka detail properti
    // ✅ Navigasi ke halaman laporan dengan membawa ID dan Nama Properti
    navigate(`/laporan?properti_id=${p.id}&nama_properti=${encodeURIComponent(p.title || "Properti Tanpa Nama")}`);
  };

  return (
    <Link to={`/property/${p.id}`} className="property-card">
      <div className="property-img-wrap">
        <img src={p.image} alt={p.title} loading="lazy" />
        <div className="property-badges">
          <span className="badge badge-primary">{p.type}</span>
          {p.featured && <span className="badge badge-warning">Featured</span>}
        </div>
        <button
          className={`property-like ${liked ? "liked" : ""}`}
          onClick={toggleLike}
          aria-label="Wishlist"
        ></button>
      </div>
  
      <div className="property-body">
        <p className="property-price">{p.price}</p>
        <h3 className="property-title">{p.title}</h3>
        <p className="property-location">{p.location}</p>
      
        <div className="property-specs">
          {p.bedrooms !== undefined && <span>{p.bedrooms}</span>}
          {p.bathrooms !== undefined && <span>{p.bathrooms}</span>}
          <span className="property-area">{p.area} m²</span>
        </div>

        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginTop: "12px",
          paddingTop: "8px",
          borderTop: "1px solid #f0f0f0" 
        }}>
          {p.agent && (
            <div className="property-agent" style={{ margin: 0 }}>
              {p.agent}
            </div>
          )}

          {/* ✅ Tombol Lapor menggunakan BUTTON, bukan Link */}
          <button
            type="button"
            onClick={handleReportClick}
            title="Laporkan Properti Ini"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              backgroundColor: "#ff4d4f", 
              color: "white", 
              padding: "4px 10px",
              borderRadius: "4px",
              border: "none",
              fontSize: "12px",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(255, 77, 79, 0.3)",
              cursor: "pointer",
              transition: "background 0.2s",
              zIndex: 10
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#d9363e"} 
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ff4d4f"}
          >
            🏳️ Lapor
          </button>
        </div>
      </div>
    </Link>
  );
}