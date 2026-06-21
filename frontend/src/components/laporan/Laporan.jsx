import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import http from '../../utils/http.js'; 

export default function Laporan() {
  const [searchParams] = useSearchParams();
  
  const initialPropertiId = searchParams.get('properti_id') || '';
  const initialNamaProperti = searchParams.get('nama_properti') || '';

  const [propertiId, setPropertiId] = useState(initialPropertiId);
  const [namaPropertiDisplay, setNamaPropertiDisplay] = useState(initialNamaProperti);
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('success'); 
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const [daftarProperti, setDaftarProperti] = useState([]);
  const [loadingProperti, setLoadingProperti] = useState(true);

  useEffect(() => {
    async function fetchProperti() {
      try {
        const response = await http.get('/properti');
        const data = response.data.data || response.data;
        setDaftarProperti(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Gagal memuat daftar properti:', err);
      } finally {
        setLoadingProperti(false);
      }
    }
    fetchProperti();
  }, []);

  useEffect(() => {
    if (initialPropertiId) {
      setPropertiId(initialPropertiId);
      setNamaPropertiDisplay(decodeURIComponent(initialNamaProperti));
    }
  }, [initialPropertiId, initialNamaProperti]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDataString = localStorage.getItem('user');
      let currentUserId = 1; 
      
      if (userDataString) {
          try {
              const userData = JSON.parse(userDataString);
              if (userData.id) currentUserId = userData.id;
          } catch (e) {
              console.error("Gagal parsing data user", e);
          }
      }

      await http.post('/laporan', {
        user_id: currentUserId,   
        properti_id: propertiId,
        judul_laporan: judul,     
        keterangan: deskripsi,
        status: 'pending' 
      });
      
      setNotificationType('success');
      setNotificationMessage('Laporan Anda telah berhasil terkirim ke sistem!');
      setShowNotification(true);
      
      setJudul('');
      setDeskripsi('');
      
      setTimeout(() => setShowNotification(false), 4000);
    } catch (error) {
      console.error('Error pengiriman:', error.response?.data || error);
      const errorMsg = error.response?.data?.message || 'Gagal mengirim laporan.';
      
      setNotificationType('error');
      setNotificationMessage(errorMsg);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '0 20px', position: 'relative' }}>
    
      {showNotification && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px',
          backgroundColor: notificationType === 'success' ? '#4caf50' : '#f44336',
          color: 'white', padding: '16px 24px', borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)', display: 'flex',
          alignItems: 'center', gap: '12px', zIndex: 9999,
          animation: 'slideIn 0.3s ease-out', fontWeight: '600', fontSize: '15px'
        }}>
          <span style={{ fontSize: '20px' }}>{notificationType === 'success' ? '✅' : '❌'}</span>
          <span>{notificationMessage}</span>
        </div>
      )}

      
      <div style={{ marginBottom: '25px' }}>
        <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            backgroundColor: '#f3f4f6', color: '#1f2937', padding: '10px 18px',
            borderRadius: '20px', textDecoration: 'none', fontSize: '14px',
            fontWeight: '700', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateX(-4px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#1f2937';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
          >
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>←</span> Kembali ke Beranda
        </Link>
      </div>

     
      <div style={{ padding: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff', color: '#333' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontWeight: '700' }}>Form Pengajuan Laporan</h2>
        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Pilih Properti Bermasalah</label>
            <select value={propertiId} required
              onChange={(e) => {
                setPropertiId(e.target.value);
                const selected = daftarProperti.find(p => p.id == e.target.value);
                if (selected) setNamaPropertiDisplay(selected.judul || 'Properti Tanpa Nama');
              }}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">-- Pilih Properti --</option>
              {loadingProperti ? (
                <option value="" disabled>Memuat daftar properti...</option>
              ) : (
                daftarProperti.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.judul || 'Properti Tanpa Nama'} (ID: {p.id})
                  </option>
                ))
              )}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Judul Laporan</label>
            <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required 
              placeholder="Contoh: Info harga tidak sesuai / Iklan palsu"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Deskripsi Masalah</label>
            <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required rows="5"
              placeholder="Tuliskan detail masalah di sini..."
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <button type="submit" style={{ width: '100%', backgroundColor: '#0056b3', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
            Kirim Laporan
          </button>
        </form>
      </div>
      <style>{`@keyframes slideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </div>
  );
}