import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http.js";
import "./PropertyCard.css";

const getImageUrl = (filename) => {
  if (!filename) return "";
  if (filename.startsWith("http://") || filename.startsWith("https://")) {
    return filename;
  }
  return `/uploads/properti/${filename}`;
};

export default function PropertyCard({ p }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await http.get(`/wishlist/check/${p.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setIsWishlisted(response.data.data?.isWishlisted || false);
        setWishlistId(response.data.data?.wishlistId || null);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };

    checkWishlistStatus();
  }, [p.id]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Silakan login untuk menambahkan ke wishlist');
      navigate('/login'); // Sesuaikan dengan route login Anda
      return;
    }

    setLoading(true);

    try {
      if (isWishlisted) {
        // Hapus dari wishlist
        if (wishlistId) {
          await http.delete(`/wishlist/${wishlistId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        setIsWishlisted(false);
        setWishlistId(null);
      } else {
        // Tambah ke wishlist
        const response = await http.post('/wishlist',
          { properti_id: p.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setIsWishlisted(true);
          setWishlistId(response.data.wishlistId);
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Terjadi kesalahan, silakan coba lagi');
    } finally {
      setLoading(false);
    }
  };

  const handleReportClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/laporan?properti_id=${p.id}&nama_properti=${encodeURIComponent(p.title || "Properti Tanpa Nama")}`);
  };

  return (
    <Link to={`/property/${p.id}`} className="property-card">
      <div className="property-img-wrap">
        {/* ✅ Gunakan helper getImageUrl untuk path gambar */}
        <img src={getImageUrl(p.image)} alt={p.title} loading="lazy" />
        <div className="property-badges">
          <span className="badge badge-primary">{p.type}</span>
          {p.featured && <span className="badge badge-warning">Featured</span>}
        </div>
        <button
          className={`property-like ${isWishlisted ? "liked" : ""} ${loading ? "loading" : ""}`}
          onClick={toggleWishlist}
          aria-label="Wishlist"
          disabled={loading}
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : isWishlisted ? (
            <i className="fa-solid fa-heart"></i>
          ) : (
            <i className="fa-regular fa-heart"></i>
          )}
        </button>
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

        <div className="property-card-footer">
          {p.agent && (
            <div className="property-agent">
              <i className="fa-solid fa-user"></i> {p.agent}
            </div>
          )}

          <button
            type="button"
            className="property-report-btn"
            onClick={handleReportClick}
            title="Laporkan Properti Ini"
          >
            <i className="fa-solid fa-flag"></i> Lapor
          </button>
        </div>
      </div>
    </Link>
  );
}