import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import http from '../../utils/http.js';

export default function Laporan() {
  const [searchParams] = useSearchParams();
  
  const initialPropertiId = searchParams.get('properti_id') || '';
  const initialNamaProperti = searchParams.get('nama_properti') || '';

  const isFormMode = initialPropertiId !== '';

  const [propertiId, setPropertiId] = useState(initialPropertiId);
  const [namaPropertiDisplay, setNamaPropertiDisplay] = useState(initialNamaProperti);
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('success'); 
  const [notificationMessage, setNotificationMessage] = useState('');
  
  const [daftarProperti, setDaftarProperti] = useState([]);
  const [loadingProperti, setLoadingProperti] = useState(true);

  const [myReports, setMyReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const getUserIdFromStorage = () => {
    const directId = localStorage.getItem('id') || localStorage.getItem('userId') || localStorage.getItem('user_id');
    if (directId) return Number(directId);

    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      if (!userDataString.startsWith('{') && !userDataString.startsWith('[')) return Number(userDataString);
      try {
        const userData = JSON.parse(userDataString);
        const id = userData.id || userData.user_id || userData.userId || (userData.user && userData.user.id);
        if (id) return Number(id);
      } catch (e) {
        console.error("Gagal parsing data user", e);
      }
    }
    return null;
  };

  useEffect(() => {
    const id = getUserIdFromStorage();
    if (id) setCurrentUserId(id);
  }, []);

  useEffect(() => {
    if (isFormMode) {
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
    } else {
      async function fetchMyReports() {
        const userId = currentUserId || getUserIdFromStorage();
        
        if (!userId) {
          setLoadingReports(false);
          return;
        }

        try {
          const response = await http.get('/laporan');
          const allReports = response.data.data || response.data;
          
          const userReports = Array.isArray(allReports)
            ? allReports.filter(r => Number(r.user_id) === userId)
            : [];
            
          setMyReports(userReports);
        } catch (err) {
          console.error('Gagal memuat laporan saya:', err);
        } finally {
          setLoadingReports(false);
        }
      }
      fetchMyReports();
    }
  }, [isFormMode, currentUserId]);

  useEffect(() => {
    if (initialPropertiId) {
      setPropertiId(initialPropertiId);
      setNamaPropertiDisplay(decodeURIComponent(initialNamaProperti));
    }
  }, [initialPropertiId, initialNamaProperti]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = currentUserId || getUserIdFromStorage() || 1;

    try {
      await http.post('/laporan', {
        user_id: userId,   
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

 
  if (!isFormMode) {
    return (
      <div style={{ maxWidth: '850px', margin: '40px auto', padding: '0 24px', fontFamily: '"Inter", system-ui, sans-serif' }}>
        
        {loadingReports ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>Memuat riwayat laporan Anda... ⏳</p>
          </div>
        ) : myReports.length === 0 ? (
          <div style={{ backgroundColor: '#ffffff', padding: '60px 40px', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px', filter: 'grayscale(0.2)' }}>📋</div>
            <h2 style={{ color: '#0f172a', marginBottom: '12px', fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em' }}>Belum Ada Laporan</h2>
            <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '15px', maxWidth: '440px', margin: '0 auto 32px', lineHeight: '1.6' }}>Anda belum pernah mengajukan laporan pelanggaran atau dugaan penipuan properti di platform ini.</p>
            <Link to="/" style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '15px', display: 'inline-block', boxShadow: '0 4px 12px rgba(37,99,235,0.2)', transition: 'all 0.2s' }}>
              Jelajahi Properti
            </Link>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
              <div>
                <h2 style={{ color: '#0f172a', margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', letterSpacing: '-0.03em' }}>Riwayat Laporan Saya</h2>
                <p style={{ color: '#64748b', margin: 0, fontSize: '14px', fontWeight: '500' }}>Pantau status pengaduan properti penipuan bermasalah Anda.</p>
              </div>
              <span style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', border: '1px solid #e2e8f0' }}>
                Total: {myReports.length} Laporan
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {myReports.map((r) => (
                <div key={r.id} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', borderLeft: '5px solid #cbd5e1', position: 'relative', transition: 'transform 0.2s' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '19px', color: '#0f172a', fontWeight: '700', letterSpacing: '-0.01em' }}>{r.judul_laporan}</h3>
                    
                    {/* Status Badge Modern */}
                    <span style={{ 
                      padding: '6px 14px', borderRadius: '30px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em',
                      backgroundColor: r.status === 'pending' ? '#fffae6' : r.status === 'diterima' ? '#fee2e2' : '#ecfdf5',
                      color: r.status === 'pending' ? '#b45309' : r.status === 'diterima' ? '#991b1b' : '#065f46',
                      border: `1px solid ${r.status === 'pending' ? '#fef08a' : r.status === 'diterima' ? '#fee2e2' : '#a7f3d0'}`
                    }}>
                      {r.status === 'diterima' ? 'Blokir Disetujui' : r.status === 'ditolak' ? 'Laporan Ditolak' : r.status}
                    </span>
                  </div>
                  
                  <p style={{ color: '#475569', margin: '0 0 20px 0', lineHeight: '1.6', fontSize: '14.5px', whiteSpace: 'pre-wrap' }}>{r.keterangan}</p>
                  
                  {/* Meta Data Footer Grid */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '14px', fontWeight: '500' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ filter: 'grayscale(0.3)' }}>🆔</span> Properti ID: <strong style={{ color: '#0f172a' }}>{r.properti_id}</strong>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ filter: 'grayscale(0.3)' }}>📅</span> Dilaporkan: <strong style={{ color: '#0f172a' }}>{r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</strong>
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    );
  }


  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '0 20px', position: 'relative', fontFamily: '"Inter", system-ui, sans-serif' }}>
    
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