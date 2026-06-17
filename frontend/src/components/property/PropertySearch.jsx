import React, { useState } from 'react';
import { Search, MapPin, AlertTriangle, User } from 'lucide-react';
import './PropertySearch.css';

const INITIAL_PROPERTIES = [
  {
    id: 1,
    title: 'Kost Eksklusif Jaks',
    price: 'Rp 2.500.000',
    address: 'Jl. Fatmawati No. 45',
    size: '200 m²',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    title: 'Ruko 2 Lantai Bdg',
    price: 'Rp 1.800.000.000',
    address: 'Jl. Dago Atas No. 88',
    size: '100 m²',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    title: 'Apartemen Studio Jkt',
    price: 'Rp 650.000.000',
    address: 'Jl. Sudirman Kav. 52',
    size: '36 m²',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    title: 'Rumah Mewah 3 Kamar',
    price: 'Rp 1.500.000.000',
    address: 'Jl. Anggrek No. 45, Dago',
    size: '200 m²',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80'
  }
];

export default function PropertySearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = INITIAL_PROPERTIES.filter((property) => {
    return property.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
          <Search size={16} />
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
            <div key={item.id} className="card-custom">
              
              {/* Gambar Properti */}
              <div className="image-wrapper-custom">
                <img src={item.image} alt={item.title} className="img-custom" />
                <span className="badge-jual">Jual</span>
                <div className="badge-heart">❤️</div>
              </div>

              {/* Detail Konten */}
              <div className="content-wrapper-custom">
                <div>
                  <h3 className="price-custom">{item.price}</h3>
                  <h4 className="title-custom">{item.title}</h4>
                  <p className="address-custom">
                    <MapPin size={12} style={{ flexShrink: 0 }} />
                    {item.address}
                  </p>
                </div>

                {/* Bagian Bawah Kartu */}
                <div className="divider-custom">
                  <div className="meta-info-custom">
                    <div>
                      <span style={{ marginRight: '8px' }}>-</span>
                      <span>-</span>
                    </div>
                    <span>{item.size}</span>
                  </div>

                  <div className="action-buttons-custom">
                    <button className="btn-user-custom">
                      <User size={14} /> User
                    </button>
                    <button className="btn-lapor-custom">
                      <AlertTriangle size={12} /> Lapor
                    </button>
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