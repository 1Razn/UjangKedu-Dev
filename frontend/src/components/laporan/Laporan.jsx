import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import http from '../../utils/http.js';

export default function Laporan() {
  const [namaPelapor, setNamaPelapor] = useState('');
  const [propertiId, setPropertiId] = useState('');
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await http.post('/laporan', { 
        nama_pelapor: namaPelapor, 
        properti_id: propertiId,   
        judul, 
        deskripsi 
      });

      setShowNotification(true);
      setNamaPelapor('');
      setPropertiId('');
      setJudul('');
      setDeskripsi('');
      
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);

    } catch (error) {
      setShowNotification(true);
      setNamaPelapor('');
      setPropertiId('');
      setJudul('');
      setDeskripsi('');
      
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '0 20px', position: 'relative' }}>
      
      {showNotification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease-out',
          fontWeight: '600',
          fontSize: '15px'
        }}>
          <span style={{ fontSize: '20px' }}>✅</span>
          <span>Laporan Anda telah berhasil terkirim ke sistem!</span>
        </div>
      )}

      <div style={{ marginBottom: '25px' }}>
        <Link 
          to="/" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#f3f4f6',
            color: '#1f2937',
            padding: '10px 18px',
            borderRadius: '20px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '700',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateX(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 86, 179, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#1f2937';
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)';
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>←</span> Kembali ke Beranda
        </Link>
      </div>

      <div style={{ padding: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff', color: '#333' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontWeight: '700' }}>Form Pengajuan Laporan</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Nama Pelapor</label>
            <input 
              type="text" 
              value={namaPelapor} 
              onChange={(e) => setNamaPelapor(e.target.value)} 
              required 
              placeholder="Masukkan nama Anda..."
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Pilih kategori Properti Bermasalah</label>
            <select 
              value={propertiId} 
              onChange={(e) => setPropertiId(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            >
              <option value="">-- Pilih Properti --</option>
              <option value="1">Rumah Minimalis Asri (ID: 1)</option>
              <option value="2">Apartemen Jakarta (ID: 2)</option>
              <option value="3">Tanah Bogor (ID: 3)</option>
              <option value="4">Villa Bandung (ID: 4)</option>
            </select>
          </div>
         
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Judul Laporan</label>
            <input 
              type="text" 
              value={judul} 
              onChange={(e) => setJudul(e.target.value)} 
              required 
              placeholder="Contoh: Info harga tidak sesuai / Iklan Palsu"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Deskripsi Masalah</label>
            <textarea 
              value={deskripsi} 
              onChange={(e) => setDeskripsi(e.target.value)} 
              required 
              rows="5"
              placeholder="Tuliskan detail masalah properti tersebut di sini..."
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', backgroundColor: '#0056b3', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
            Kirim Laporan
          </button>
        </form>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}