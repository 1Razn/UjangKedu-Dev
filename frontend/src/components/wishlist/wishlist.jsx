import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http.js";
import "./wishlist.css";

export default function Wishlist() {
	const navigate = useNavigate();
	const [wishlistItems, setWishlistItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchWishlist = async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem('token');

			if (!token) {
				navigate('/login');
				return;
			}

			console.log('🔄 Fetching wishlist...');

			const response = await http.get('/wishlist', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			console.log('✅ Response:', response.data);

			const rawData = response.data.data || response.data;

			const mappedData = Array.isArray(rawData) ? rawData.map(item => ({
				wishlistId: item.wishlist_id || item.id,
				id: item.properti_id,
				title: item.judul || 'Properti Tanpa Nama',
				price: item.harga ? `Rp ${Number(item.harga).toLocaleString('id-ID')}` : 'Hubungi Kami',
				location: item.alamat || 'Lokasi belum diatur',
				type: 'Jual',
				area: item.luas_properti || 0,
				image: item.foto_properti || 'https://placehold.co/600x400?text=Gambar+Properti',
				category: item.nama_kategori || 'Rumah'
			})) : [];

			console.log('Mapped data:', mappedData);
			setWishlistItems(mappedData);
			setError(null);
		} catch (err) {
			console.error('❌ Error fetching wishlist:', err);
			setError(err.response?.data?.message || 'Gagal memuat daftar wishlist');
		} finally {
			setLoading(false);
		}
	};

	const removeFromWishlist = async (wishlistId) => {
		try {
			const token = localStorage.getItem('token');
			
			await http.delete(`/wishlist/${wishlistId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			setWishlistItems(prevItems =>
				prevItems.filter(item => item.wishlistId !== wishlistId)
			);

			alert('Properti dihapus dari wishlist');
		} catch (err) {
			console.error('Error removing from wishlist:', err);
			alert('Gagal menghapus dari wishlist');
		}
	};

	const handleCardClick = (propertyId) => {
		navigate(`/property/${propertyId}`);
	};

	useEffect(() => {
		fetchWishlist();
	}, []);

	if (loading) {
		return (
			<div className="wishlist-page">
				<div className="wishlist-container">
					<div className="wishlist-loading">
						<div className="loading-spinner"></div>
						<p>Memuat wishlist Anda...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="wishlist-page">
			<div className="container">
				{error && (
					<div className="error-message">
						<p>⚠️ {error}</p>
						<button onClick={fetchWishlist}>Coba Lagi</button>
					</div>
				)}

				{wishlistItems.length === 0 ? (
					<div className="wishlist-empty">
						<div className="empty-icon">📭</div>
						<h2>Wishlist Anda Masih Kosong</h2>
						<p>Simpan properti favorit Anda untuk melihatnya nanti</p>
						<Link to="/" className="btn-explore">
							Jelajahi Properti
						</Link>
					</div>
				) : (
					<div className="wishlist-content">
						<div className="wishlist-header">
							<p className="wishlist-count">
								Menampilkan <strong>{wishlistItems.length}</strong> properti
							</p>
						</div>

						<div className="wishlist-grid">
							{wishlistItems.map((item) => (
								<div
									key={item.wishlistId}
									className="wishlist-card"
									onClick={() => handleCardClick(item.id)}
								>
									<div className="wishlist-card-image-wrap">
										<img
											src={item.image}
											alt={item.title}
											loading="lazy"
											className="wishlist-card-image"
										/>
										<span className="wishlist-badge">{item.type}</span>
										<button
											className="wishlist-remove-btn"
											onClick={(e) => {
												e.stopPropagation();
												removeFromWishlist(item.wishlistId);
											}}
											title="Hapus dari Wishlist"
										>
											<i className="fa-solid fa-trash"></i>
										</button>
									</div>

									<div className="wishlist-card-body">
										<h3 className="wishlist-card-price">{item.price}</h3>
										<h4 className="wishlist-card-title">{item.title}</h4>
										<p className="wishlist-card-location">📍 {item.location}</p>

										<div className="wishlist-card-specs">
											{item.area > 0 && (
												<span className="spec-item">
													<i className="fa-solid fa-ruler-combined"></i>
													{item.area} m²
												</span>
											)}
											<span className="spec-item category">
												{item.category}
											</span>
										</div>

										<div className="wishlist-card-actions">
											<Link
												to={`/property/${item.id}`}
												className="btn-detail"
												onClick={(e) => e.stopPropagation()}
											>
												Lihat Detail
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}