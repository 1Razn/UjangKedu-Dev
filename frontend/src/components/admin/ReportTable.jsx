import { useState } from "react";
import "./ReportTable.css";

export default function ReportTable({ reports, onResolve }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="admin-panel">
      <div className="panel-head">
        <div>
          <h2 className="panel-title">Tinjau Laporan Penipuan</h2>
          <p className="panel-sub">Tinjau laporan properti yang diduga menipu, lalu putuskan tindakannya.</p>
        </div>
      </div>

      <div className="report-list">
        {reports.map((r) => {
          const open = openId === r.id;
          return (
            <div key={r.id} className="report-card">
              <div className="report-top" onClick={() => setOpenId(open ? null : r.id)}>
                <div className="report-main">
                  <span className="report-property">{r.property}</span>
                  <span className="report-meta">
                    Terlapor: <strong>{r.reportedUser}</strong> · Pelapor: {r.reporter} · {r.date}
                  </span>
                </div>
                <div className="report-right">
                  <span className={`badge badge-${r.status}`}>{r.status}</span>
                  {}
                </div>
              </div>

              {open && (
                <div className="report-detail">
                  <p className="report-reason">
                    {r.reason}
                  </p>
                  {r.status === "pending" ? (
                    <div className="report-actions">
                      <button className="btn-proven" onClick={() => onResolve(r.id, "proven")}>
                        Tandai Penipuan & Ban User
                      </button>
                      <button className="btn-reject" onClick={() => onResolve(r.id, "rejected")}>
                        Tolak Laporan
                      </button>
                    </div>
                  ) : (
                    <p className="report-resolved">
                      Laporan sudah diputuskan: <strong>{r.status}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
