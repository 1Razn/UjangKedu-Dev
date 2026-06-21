import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from '../../utils/http.js';
import './PropertySearch.css';

export default function PropertySearch() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from database
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await http.get('/properti');
        const rawData = response.data.data || response.data;
        
        // Map database fields to UI fields
        const mappedData = rawData.map(item => ({
          id: item.id,
          title: item.judul || 'Properti Tanpa Nama',
          price: item.harga ? `Rp ${Number(item.harga).toLocaleString('id-ID')}` : 'Hubungi Kami',
          address: item.alamat || 'Lokasi belum diatur',
          size: item.luas_properti ? `${item.luas_properti} m²` : '-',
          image: item.foto_properti || 'https://placehold.co/600x400?text=Gambar+Properti',
          type: item.tipe || 'Jual',
          bedrooms: item.kamar_tidur || '-',
          bathrooms: item.kamar_mandi || '-',
          agent: item.nama_agen || 'User'
        }));
        
        setProperties(mappedData);
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

  // Filter properties based on search query
  const filteredProperties = properties.filter((property) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      property.title.toLowerCase().includes(searchLower) ||
      property.address.toLowerCase().includes(searchLower)
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
      
      {/* Header text */}
      <div className="search-header-box">
        <h2 className="search-title">Properti Unggulan</h2>
        <p className="search-subtitle">Pilihan terbaik untuk Anda</p>
      </div>

      {/* Search Input */}
      <div className="search-box-wrapper">
        <div className="search-icon-inside">
          🔍
        </div>
        <input
          type="text"
          placeholder="Cari berdasarkan nama (misal: rumah, apartemen)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input-custom"
        />
      </div>

      {/* Grid List Properti */}
      {filteredProperties.length > 0 ? (
        <div className="property-grid-custom">
          {filteredProperties.map((item) => (
            <Link 
              key={item.id} 
              to={`/property/${item.id}`} 
              className="card-custom-link"
            >
              <div className="card-custom">
                
                {/* Gambar Properti */}
                <div className="image-wrapper-custom">
                  <img src={item.image} alt={item.title} className="img-custom" />
                  <span className="badge-jual">{item.type}</span>
                  <div className="badge-heart">❤️</div>
                </div>

                {/* Detail Konten */}
                <div className="content-wrapper-custom">
                  <div>
                    <h3 className="price-custom">{item.price}</h3>
                    <h4 className="title-custom">{item.title}</h4>
                    <p className="address-custom">
                      📍 {item.address}
                    </p>
                  </div>

                  {/* Bagian Bawah Kartu */}
                  <div className="divider-custom">
                    <div className="meta-info-custom">
                      <div>
                        <span style={{ marginRight: '8px' }}>{item.bedrooms}</span>
                        <span>{item.bathrooms}</span>
                      </div>
                      <span>{item.size}</span>
                    </div>

                    <div className="action-buttons-custom">
                      <button 
                        className="btn-user-custom"
                        onClick={(e) => e.preventDefault()}
                      >
                        👤 {item.agent}
                      </button>
                      <button 
                        className="btn-lapor-custom"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Handle lapor functionality here if needed
                        }}
                      >
                        ⚠️ Lapor
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </Link>
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