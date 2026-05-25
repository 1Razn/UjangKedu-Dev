import "./Promosi.css";

export default function CTA() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-card">
          <div className="cta-left">
            <div className="cta-stars">
              
            </div>
            <h2 className="section-title">Anda Agen Properti?</h2>
            <p className="cta-desc">
              Bergabung dengan ribuan agen profesional di BOTY. Dapatkan akses ke paket iklan premium,
              dashboard analitik, dan tools untuk mengelola listing dengan mudah.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg">Daftar Sebagai Agen</button>
              <button className="btn btn-outline btn-lg">Lihat Paket Iklan</button>
            </div>
          </div>
          <div className="cta-right">
            <div className="cta-stats">
              <div><strong>10K+</strong><span>Agen Aktif</span></div>
              <div><strong>50K+</strong><span>Listing</span></div>
              <div><strong>200+</strong><span>Kota</span></div>
              <div><strong>4.8★</strong><span>Rating Pengguna</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
