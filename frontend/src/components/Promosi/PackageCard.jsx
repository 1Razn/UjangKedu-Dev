import "./Promosi.css";

// Helper untuk menentukan class berdasarkan nama paket
function paketToClass(nama) {
  if (!nama) return '';
  const n = nama.toLowerCase();
  if (n.includes('bronze')) return 'bronze';
  if (n.includes('silver')) return 'silver';
  if (n.includes('gold')) return 'gold';
  return '';
}

// Format harga ke Rupiah
function formatHarga(harga) {
  const numHarga = typeof harga === 'string' ? parseInt(harga.replace(/[^0-9]/g, '')) : Number(harga);
  return `Rp ${numHarga.toLocaleString('id-ID')}`;
}

export default function PackageCard({ paket, selected, onSelect }) {
  const typeClass = paketToClass(paket.nama_paket);
  const formattedHarga = formatHarga(paket.harga);

  return (
    <article className={`package-card ${typeClass} ${selected ? 'selected' : ''}`}>
      <div className="package-header">
        <h3>{paket.nama_paket}</h3>
        <span className="package-duration">{paket.durasi_iklan}</span>
      </div>
      
      <p className="package-price">{formattedHarga}</p>
      
      <p className="package-desc">{paket.deskripsi}</p>
      
      <ul className="package-features">
        <li>✓ Tayang di halaman utama</li>
        <li>✓ Prioritas pencarian</li>
        <li>✓ Badge properti unggulan</li>
        {typeClass === 'gold' && <li>✓ Iklan media sosial</li>}
      </ul>

      <button 
        type="button" 
        className={`btn package-select-btn ${selected ? 'btn-primary' : 'btn-outline btn-sm'}`}
        onClick={() => onSelect && onSelect(paket.id)}
      >
        {selected ? 'Paket Dipilih ✓' : 'Pilih Paket'}
      </button>
    </article>
  );
}