// Shared property data (dummy/static) used across Featured, Detail & Search pages.

export const PROPERTIES = [
  {
    id: 1,
    title: "Rumah Modern Minimalist 2 Lantai",
    price: "Rp 1,2 M",
    location: "BSD City, Tangerang Selatan",
    type: "Jual",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&auto=format&fit=crop",
    featured: true,
    agent: "Agen Premier",
    year: 2021,
    certificate: "SHM",
    description:
      "Rumah modern minimalist 2 lantai dengan desain kekinian, pencahayaan alami maksimal, dan lokasi strategis di pusat BSD City. Dekat dengan pusat perbelanjaan, sekolah, dan akses tol.",
    facilities: ["Carport 2 mobil", "Taman belakang", "Dapur bersih & kotor", "Air PAM", "Listrik 2200 watt"],
    gallery: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=900&auto=format&fit=crop",
    ],
  }
];

export function getPropertyById(id) {
  return PROPERTIES.find((p) => String(p.id) === String(id));
}
