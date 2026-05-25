import { useState } from "react";

export default function PropertyCard({ p }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="property-card">
      <div className="property-img-wrap">
        <img src={p.image} alt={p.title} loading="lazy" />
        <div className="property-badges">
          <span className="badge badge-primary">{p.type}</span>
          {p.featured && <span className="badge badge-warning">Featured</span>}
        </div>
        <button
          className={`property-like ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
          aria-label="Wishlist"
        >
        </button>
      </div>
      <div className="property-body">
        <p className="property-price">{p.price}</p>
        <h3 className="property-title">{p.title}</h3>
        <p className="property-location">
        </p>
        <div className="property-specs">
          {/* {p.bedrooms !== undefined && (
            <span><Bed size={15} /> {p.bedrooms}</span>
          )}
          {p.bathrooms !== undefined && (
            <span><Bath size={15} /> {p.bathrooms}</span>
          )}
          <span className="property-area"><Maximize size={15} /> {p.area} m²</span> */}
        </div>
        {p.agent && (
          <div className="property-agent">
            {/* <BadgeCheck size={15} /> {p.agent} */}
          </div>
        )}
      </div>
    </article>
  );
}
