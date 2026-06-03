import { useState } from "react";
import { statusLabel } from "./adminData.js";
import "./UserTable.css";

export default function UserTable({ users, onToggleBan }) {
  const [query, setQuery] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <div className="panel-head">
        <div>
          <h2 className="panel-title">Data User</h2>
          <p className="panel-sub">Kelola seluruh user agar terdata lengkap untuk mencegah penipuan.</p>
        </div>
        <div className="search-box">
          
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Bergabung</th>
              <th>Iklan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td className="cell-name">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.joinedAt}</td>
                <td>{u.listings}</td>
                <td>
                  <span className={`badge badge-${u.status}`}>{statusLabel[u.status]}</span>
                </td>
                <td>
                  {u.status === "active" ? (
                    <button className="row-btn row-ban" onClick={() => onToggleBan(u.id)}>
                      Ban
                    </button>
                  ) : (
                    <button className="row-btn row-restore" onClick={() => onToggleBan(u.id)}>
                      Aktifkan
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="empty">Tidak ada user yang cocok.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
