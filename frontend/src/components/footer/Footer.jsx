import "./Footer.css";

const COLUMNS = [
  { title: "Properti", items: ["Jual Rumah", "Sewa Apartemen", "Tanah Kavling", "Ruko & Komersial"] },
  { title: "Layanan", items: ["Paket Iklan", "Untuk Agen", "Booking Online", "Pusat Bantuan"] },
  { title: "Perusahaan", items: ["Tentang BOTY", "Karir", "Kebijakan Privasi", "Syarat & Ketentuan"] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="navbar-logo">
              <span className="navbar-logo-icon"><img src="logo.png" alt="Logo" /></span>
              <span className="navbar-logo-text">BOTY</span>
            </a>
            <p>Booking Tanah dan Property — platform jual, sewa & booking properti terpercaya di Indonesia.</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              <ul>
                {col.items.map((it) => <li key={it}><a href="#">{it}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">© 2026 BOTY. All rights reserved.</div>
      </div>
    </footer>
  );
}
