import "./Promosi.css";

export default function PackageCard({ paket, selected, onSelect }) {
  return (
    <article className={`package-card ${selected ? "selected" : ""}`}>
      <div className="package-header">
        <h3>{paket.nama_paket}</h3>
        <span className="package-duration">{paket.durasi_iklan}</span>
      </div>
      <p className="package-price">{paket.harga}</p>
      <p className="package-desc">{paket.deskripsi}</p>
      <button type="button" className="btn btn-outline btn-sm package-select-btn" onClick={() => onSelect(paket.id)}>
        {selected ? "Paket Dipilih" : "Pilih Paket"}
      </button>
    </article>
  );
}
