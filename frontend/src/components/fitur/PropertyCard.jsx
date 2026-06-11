import { useState } from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ p }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <Link to={`/property/${p.id}`} className="property-card">
      <div className="property-img-wrap">
        <img src={p.image} alt={p.title} loading="lazy" />
        <div className="property-badges">
          <span className="badge badge-primary">{p.type}</span>
          {p.featured && <span className="badge badge-warning">Featured</span>}
        </div>
        <button
          className={`property-like ${liked ? "liked" : ""}`}
          onClick={toggleLike}
          aria-label="Wishlist"
        >
        </button>
      </div>
      <div className="property-body">
        <p className="property-price">{p.price}</p>
        <h3 className="property-title">{p.title}</h3>
        <p className="property-location">
          {p.location}
        </p>
        <div className="property-specs">
          {p.bedrooms !== undefined && (
            <span>{p.bedrooms}</span>
          )}
          {p.bathrooms !== undefined && (
            <span>{p.bathrooms}</span>
          )}
          <span className="property-area"> {p.area} m²</span>
        </div>
        {p.agent && (
          <div className="property-agent">
            {p.agent}
          </div>
        )}
      </div>
    </Link>
  );
}
