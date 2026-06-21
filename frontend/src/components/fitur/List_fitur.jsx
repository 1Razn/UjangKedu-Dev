import React from 'react';
import './List_fitur.css';

const DATA_FITUR = [
  {
    id: 1,
    icon: "fa-magnifying-glass",
    title: 'Pencarian & Filter Lengkap',
    desc: 'Cari berdasarkan lokasi, harga, tipe, luas, dan fasilitas dengan filter mendetail.'
  },
  {
    id: 2,
    icon: "fa-bullhorn",
    title: 'Posting Iklan + Paket Premium',
    desc: 'Pasang iklan dengan paket Featured, Sundul, dan promosi untuk jangkauan maksimal.'
  },
  {
    id: 3,
    icon: "fa-comments",
    title: 'Chat Real-time',
    desc: 'Hubungi pemilik atau agen langsung lewat chat tanpa keluar dari platform.'
  },
  {
    id: 4,
    icon: "fa-heart",
    title: 'Wishlist Properti',
    desc: 'Simpan properti favorit Anda dan bandingkan dengan mudah kapan saja.'
  },
  {
    id: 5,
    icon: "fa-shield-halved",
    title: 'Laporan & Moderasi',
    desc: 'Laporkan iklan mencurigakan. Tim moderasi menjaga kualitas listing.'
  },
  {
    id: 6,
    icon: "fa-calendar-check",
    title: 'Booking Tanah Online',
    desc: 'Booking tanah & properti langsung dengan sistem pembayaran terintegrasi.'
  }
];

export default function ListFitur() {
  return (
    <section className="list-fitur-section">
      <div className="list-fitur-container">
        {/* Bagian Judul Luar */}
        <div className="list-fitur-header">
          <h2>Fitur Lengkap BOTY</h2>
          <p>Semua yang Anda butuhkan untuk jual, sewa, dan booking properti dalam satu platform.</p>
        </div>
        
        {/* Bagian Grid Kontainer 6 Kartu */}
        <div className="list-fitur-grid">
          {DATA_FITUR.map((fitur) => (
            <div key={fitur.id} className="fitur-card">
              <div className="fitur-icon-box">
                <i className={`fa-solid ${fitur.icon}`}></i>
              </div>
              <h3>{fitur.title}</h3>
              <p>{fitur.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}