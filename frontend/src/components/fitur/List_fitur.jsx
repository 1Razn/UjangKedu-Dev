import React from 'react';
import { Search, FileText, MessageSquare, Heart, ShieldAlert, TrendingUp } from 'lucide-react';
import './List_fitur.css'; // <-- Menghubungkan ke file CSS di atas

const DATA_FITUR = [
  {
    id: 1,
    icon: <Search size={24} />,
    title: 'Pencarian & Filter Lengkap',
    desc: 'Cari berdasarkan lokasi, harga, tipe, luas, dan fasilitas dengan filter mendetail.'
  },
  {
    id: 2,
    icon: <FileText size={24} />,
    title: 'Posting Iklan + Paket Premium',
    desc: 'Pasang iklan dengan paket Featured, Sundul, dan promosi untuk jangkauan maksimal.'
  },
  {
    id: 3,
    icon: <MessageSquare size={24} />,
    title: 'Chat Real-time',
    desc: 'Hubungi pemilik atau agen langsung lewat chat tanpa keluar dari platform.'
  },
  {
    id: 4,
    icon: <Heart size={24} />,
    title: 'Wishlist Properti',
    desc: 'Simpan properti favorit Anda dan bandingkan dengan mudah kapan saja.'
  },
  {
    id: 5,
    icon: <ShieldAlert size={24} />,
    title: 'Laporan & Moderasi',
    desc: 'Laporkan iklan mencurigakan. Tim moderasi menjaga kualitas listing.'
  },
  {
    id: 6,
    icon: <TrendingUp size={24} />,
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
                {fitur.icon}
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