import "./Kategori.css";

// const CATEGORIES = [
//   { icon: Home, label: "Rumah", count: "12.450" },
//   { icon: Building, label: "Apartemen", count: "5.230" },
//   { icon: Trees, label: "Tanah", count: "8.920" },
//   { icon: Store, label: "Komersial", count: "3.140" },
// ];

export default function Categories() {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-grid">
          {/* {CATEGORIES.map((c) => ( */}
            <div key="" className="category-card">
              <div className="category-icon"></div>
              <div>
                <h3></h3>
                <p> listing</p>
              </div>
            </div>
          {/* ))} */}
        </div>
      </div>
    </section>
  );
}
