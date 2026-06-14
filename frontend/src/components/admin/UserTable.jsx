import { useState } from "react";
import "./UserTable.css";

export default function UserTable({ users, onEdit, onDelete, onAdd }) {
  const [query, setQuery] = useState("");

  const filtered = users.filter(
    (u) =>
      u.nama.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <div className="panel-head">
        <div>
          <h2 className="panel-title">Data User</h2>
          <p className="panel-sub">
            Kelola seluruh user agar terdata lengkap untuk mencegah penipuan.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            className="btn-action btn-success btn-sm"
            onClick={onAdd}
          >
            + Tambah User
          </button>
          <div className="search-box">
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td className="cell-name">{u.nama}</td>
                <td>{u.email}</td>
                <td>{u.no_hp}</td>
                <td>
                  <span className={`badge badge-${u.role === 'Admin' ? 'success' : 'primary'}`}>
                    {u.role}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-action btn-warning btn-sm"
                      onClick={() => onEdit(u.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-action btn-danger btn-sm"
                      onClick={() => onDelete(u.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  Tidak ada user yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}