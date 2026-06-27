import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../../api/propertiApi.js';
import http from '../../utils/http.js';
import "./PropertySearch.css";

export default function PropertySearch() {
  const { openLogin } = useAuth();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistStatus, setWishlistStatus] = useState({}); // { propertyId: { isWishlisted, wishlistId } }
  const [wishlistLoading, setWishlistLoading] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        
        // Cek status wishlist untuk setiap properti
        const token = localStorage.getItem('token');
        const propertiesWithStatus = await Promise.all(
          data.map(async (item) => {
            if (!token) return { ...item, isWishlisted: false, wishlistId: null };
            
            try {
              const response = await http.get(`/wishlist/check/${item.id}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              return {
                ...item,
                isWishlisted: response.data.data?.isWishlisted || false,
                wishlistId: response.data.data?.wishlistId || null
              };
            } catch (error) {
              return { ...item, isWishlisted: false, wishlistId: null };
            }
          })
        );
        
        setProperties(propertiesWithStatus);
        setError(null);
      } catch (err) {
        setError('Gagal memuat data properti');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const toggleWishlist = async (e, propertyId) => {
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      openLogin();
      return;
    }

    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    setWishlistLoading(prev => ({ ...prev, [propertyId]: true }));

    try {
      if (property.isWishlisted) {
        // Hapus dari wishlist
        if (property.wishlistId) {
          await http.delete(`/wishlist/${property.wishlistId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
        // Update state
        setProperties(prev =>
          prev.map(item =>
            item.id === propertyId
              ? { ...item, isWishlisted: false, wishlistId: null }
              : item
          )
        );
      } else {
        // Tambah ke wishlist
        const response = await http.post(
          '/wishlist',
          { properti_id: propertyId },
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );
        
        if (response.data.success) {
          setProperties(prev =>
            prev.map(item =>
              item.id === propertyId
                ? { ...item, isWishlisted: true, wishlistId: response.data.wishlistId }
                : item
            )
          );
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Terjadi kesalahan, silakan coba lagi');
    } finally {
      setWishlistLoading(prev => ({ ...prev, [propertyId]: false }));
    }
  };

  const handleReportClick = (e, propertyId, propertyTitle) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    navigate(`/laporan?properti_id=${propertyId}&nama_properti=${encodeURIComponent(propertyTitle || "Properti Tanpa Nama")}`);
  };

  const filteredProperties = properties.filter((property) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      property.title.toLowerCase().includes(searchLower) ||
      property.location.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="search-custom-container">
        <div className="loading-custom">
          <p>Memuat data properti... ⏳</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-custom-container">
        <div className="error-custom">
          <p>⚠️ {error}</p>
          <button onClick={() => window.location.reload()}>Coba Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="search-custom-container">
      <div className="search-header-box">
        <h2 className="search-title">Properti Unggulan</h2>
        <p className="search-subtitle">Pilihan terbaik untuk Anda</p>
      </div>

      <div className="search-box-wrapper">
        <div className="search-icon-inside">🔍</div>
        <input
          type="text"
          placeholder="Cari berdasarkan nama (misal: rumah, apartemen)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input-custom"
        />
      </div>

      {filteredProperties.length > 0 ? (
        <div className="property-grid-custom">
          {filteredProperties.map((item) => (
            <div
              key={item.id}
              className="card-custom-link"
              onClick={() => navigate(`/property/${item.id}`)}
              style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
            >
              <div className="card-custom">
                <div className="image-wrapper-custom">
                  <img src={item.image} alt={item.title} className="img-custom" />
                  <span className="badge-jual">{item.type}</span>
                  
                  {/* Wishlist Button - Sama seperti PropertyCard */}
                  <button
                    className={`property-like ${item.isWishlisted ? 'liked' : ''} ${wishlistLoading[item.id] ? 'loading' : ''}`}
                    onClick={(e) => toggleWishlist(e, item.id)}
                    aria-label="Wishlist"
                    disabled={wishlistLoading[item.id]}
                  >
                    {wishlistLoading[item.id] ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : item.isWishlisted ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </button>
                </div>

                <div className="content-wrapper-custom">
                  <div>
                    <h3 className="price-custom">{item.price}</h3>
                    <h4 className="title-custom">{item.title}</h4>
                    <p className="address-custom">📍 {item.location}</p>
                  </div>

                  <div className="divider-custom">
                    <div className="meta-info-custom">
                      <div>
                        <span style={{ marginRight: '8px' }}>{item.bedrooms}</span>
                        <span>{item.bathrooms}</span>
                      </div>
                      <span>{item.area} m²</span>
                    </div>

                    <div className="action-buttons-custom">
                      <button
                        className="btn-user-custom"
                        onClick={(e) => e.stopPropagation()}
                      >
                        👤 {item.agent}
                      </button>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReportClick(e, item.id, item.title);
                        }}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="not-found-custom">
          <p>Properti dengan kata kunci "{searchQuery}" tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}