import { Link } from "react-router-dom";
import "./Promosi.css";

function paketToClass(nama) {
  if (!nama) return '';
  const n = nama.toLowerCase();
  if (n.includes('bronze')) return 'bronze';
  if (n.includes('silver')) return 'silver';
  if (n.includes('gold')) return 'gold';
  return '';
}

export default function PackageCard({ paket, selected, onSelect, linkTo }) {
  const typeClass = paketToClass(paket.nama_paket);
  return (
    <article className={`package-card ${typeClass} ${selected ? "selected" : ""}`}>
      <div className="package-header">
        <h3>{paket.nama_paket}</h3>
        <span className="package-duration">{paket.durasi_iklan}</span>
      </div>
      <p className="package-price">{paket.harga}</p>
      <p className="package-desc">{paket.deskripsi}</p>
      {linkTo ? (
        <Link to={linkTo} className="btn btn-outline btn-sm package-select-btn">
          Pilih Paket
        </Link>
      ) : (
        <button type="button" className="btn btn-outline btn-sm package-select-btn" onClick={() => onSelect && onSelect(paket.id)}>
          {selected ? "Paket Dipilih" : "Pilih Paket"}
        </button>
      )}
    </article>
  );
}
