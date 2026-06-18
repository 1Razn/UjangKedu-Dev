import { useState } from "react";
import "./ReportTable.css";

export default function ReportTable({ reports, onRejectReport, onBlockProperty }) {
  const [openId, setOpenId] = useState(null);

  
  const safeReports = Array.isArray(reports) ? reports : [];

  return (
    <div className="admin-panel">
      <div className="panel-head">
        <div>
          <h2 className="panel-title">Tinjau Laporan Penipuan</h2>
          <p className="panel-sub">Tinjau laporan properti yang diduga menipu, lalu putuskan tindakannya.</p>
        </div>
      </div>

      <div className="report-list">
        {safeReports.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            Belum ada laporan yang masuk.
          </p>
        ) : (
          safeReports.map((r) => {
            const open = openId === r.id;
            return (
              <div key={r.id} className="report-card">
                <div className="report-top" onClick={() => setOpenId(open ? null : r.id)}>
                  <div className="report-main">
                    <span className="report-property">{r.judul_laporan || 'Tanpa Judul'}</span>
                    <span className="report-meta">
                      Properti ID: <strong>{r.properti_id}</strong> · Pelapor (User ID): {r.user_id} · {r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID') : '-'}
                    </span>
                  </div>
                  <div className="report-right">
                    <span className={`badge badge-${r.status}`}>{r.status}</span>
                  </div>
                </div>

                {open && (
                  <div className="report-detail">
                    <p className="report-reason">
                      {r.keterangan || 'Tidak ada deskripsi/keterangan.'}
                    </p>
                    
                    {r.status === "pending" ? (
                      <div className="report-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '15px' }}>
                        
                                                <button 
                          style={{ 
                            backgroundColor: '#dc3545', 
                            color: 'white', 
                            border: 'none', 
                            padding: '10px 16px', 
                            borderRadius: '6px', 
                            cursor: 'pointer', 
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 4px rgba(220, 53, 69, 0.2)'
                          }} 
                          onClick={() => onBlockProperty(r.properti_id)}
                        >
                          🚨 Blokir Penipu
                        </button>

                        <button 
                          style={{ 
                            backgroundColor: '#f9fafb', 
                            color: '#4b5563', 
                            border: '1px solid #d1d5db', 
                            padding: '10px 16px', 
                            borderRadius: '6px', 
                            cursor: 'pointer', 
                            fontWeight: 'bold' 
                          }}
                          onClick={() => onRejectReport(r.id)}
                        >
                          Tolak Laporan
                        </button>

                      </div>
                    ) : (
                      <p className="report-resolved">
                        Laporan sudah diputuskan: <strong style={{ textTransform: 'capitalize' }}>{r.status}</strong>
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}