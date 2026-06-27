import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../utils/http.js';
import './Profile.css';

export default function Profile() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [activeTab, setActiveTab] = useState('profile');
	const [wishlistCount, setWishlistCount] = useState(0);
	const [propertiesCount, setPropertiesCount] = useState(0);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		nama: '',
		email: '',
		no_hp: '',
		password: '',
		role: ''
	});

	const BASE_URL = 'http://localhost:3000';

	useEffect(() => {
		fetchUserProfile();
	}, []);

	useEffect(() => {
		if (activeTab === 'wishlist') {
			fetchWishlistCount();
		} else if (activeTab === 'properties') {
			fetchPropertiesCount();
		}
	}, [activeTab]);

	const fetchUserProfile = async () => {
		try {
			setLoading(true);
			const token = localStorage.getItem('token');

			if (!token) {
				navigate('/login');
				return;
			}

			const tokenPayload = JSON.parse(atob(token.split('.')[1]));
			const userId = tokenPayload.id;

			const response = await http.get(`/user/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const userData = response.data.data;
			setUser(userData);
			setFormData({
				nama: userData.nama || '',
				email: userData.email || '',
				no_hp: userData.no_hp || '',
				password: '',
				role: userData.role || 'User'
			});
			setError(null);
		} catch (err) {
			console.error('Error fetching profile:', err);
			setError('Gagal memuat data profil');
		} finally {
			setLoading(false);
		}
	};

	const fetchWishlistCount = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await http.get('/wishlist', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setWishlistCount(response.data.data?.length || 0);
		} catch (err) {
			console.error('Error fetching wishlist count:', err);
		}
	};

	const fetchPropertiesCount = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await http.get('/properti', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const allProperties = response.data.data || response.data;
			const tokenPayload = JSON.parse(atob(token.split('.')[1]));
			const userProperties = allProperties.filter(p => p.user_id === tokenPayload.id);
			setPropertiesCount(userProperties.length);
		} catch (err) {
			console.error('Error fetching properties count:', err);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		if (user) {
			setFormData({
				nama: user.nama || '',
				email: user.email || '',
				no_hp: user.no_hp || '',
				password: '',
				role: user.role || 'User'
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');
			const tokenPayload = JSON.parse(atob(token.split('.')[1]));
			const userId = tokenPayload.id;

			const updateData = new FormData();
			updateData.append('nama', formData.nama);
			updateData.append('email', formData.email);
			updateData.append('no_hp', formData.no_hp);
			if (formData.password) {
				updateData.append('password', formData.password);
			}
			updateData.append('role', formData.role);

			await http.put(`/user/${userId}`, updateData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data'
				}
			});

			alert('Profil berhasil diperbarui');
			setIsEditing(false);
			fetchUserProfile();
		} catch (err) {
			console.error('Error updating profile:', err);
			alert(err.response?.data?.message || 'Gagal memperbarui profil');
		}
	};

	const handleLogout = () => {
		if (window.confirm('Apakah Anda yakin ingin logout?')) {
			localStorage.removeItem('token');
			navigate('/login');
		}
	};

	const getProfileImageUrl = (fotoProfil) => {
		if (!fotoProfil) return null;

		if (fotoProfil.startsWith('http://') || fotoProfil.startsWith('https://')) {
			return fotoProfil;
		}

		return `${BASE_URL}/uploads/profile/${fotoProfil}`;
	};

	if (loading) {
		return (
			<div className="profile-page">
				<div className="profile-loading">
					<div className="loading-spinner"></div>
					<p>Memuat profil...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="profile-page">
				<div className="profile-error">
					<p>⚠️ {error}</p>
					<button onClick={fetchUserProfile}>Coba Lagi</button>
				</div>
			</div>
		);
	}

	const profileImageUrl = getProfileImageUrl(user.foto_profil);

	return (
		<div className="profile-page">
			<div className="profile-container">
				<div className="profile-header">
					<div className="profile-avatar-section">
						<div className="profile-avatar">
							{user.foto_profil ? (
								<img
									src={`http://localhost:3000/uploads/profile/${user.foto_profil}`}
									alt={user.nama}
									onError={(e) => {
										console.error('Failed to load image:', user.foto_profil);
										e.target.style.display = 'none';
										e.target.nextElementSibling.style.display = 'flex';
									}}
								/>
							) : null}
							<div className="avatar-placeholder" style={{ display: user.foto_profil ? 'none' : 'flex' }}>
								{user.nama ? user.nama.charAt(0).toUpperCase() : 'U'}
							</div>
						</div>
						<div className="profile-info-header">
							<h1>{user.nama}</h1>
							<p className="profile-role">{user.role}</p>
							<p className="profile-email">{user.email}</p>
						</div>
					</div>
				</div>

				<div className="profile-tabs">
					<button
						className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
						onClick={() => setActiveTab('profile')}
					>
						<i className="fa-solid fa-user"></i> Profil
					</button>
					<button
						className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
						onClick={() => setActiveTab('wishlist')}
					>
						<i className="fa-solid fa-heart"></i> Wishlist ({wishlistCount})
					</button>
					<button
						className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
						onClick={() => setActiveTab('properties')}
					>
						<i className="fa-solid fa-house"></i> Properti Saya ({propertiesCount})
					</button>
				</div>

				<div className="profile-content">
					{activeTab === 'profile' && (
						<div className="profile-tab-content">
							<div className="profile-section">
								<div className="section-header">
									<h2>Informasi Pribadi</h2>
									{!isEditing ? (
										<button className="btn-edit" onClick={handleEdit}>
											<i className="fa-solid fa-pen"></i> Edit Profil
										</button>
									) : null}
								</div>

								{!isEditing ? (
									<div className="profile-info-grid">
										<div className="info-item">
											<label>Nama Lengkap</label>
											<p>{user.nama}</p>
										</div>
										<div className="info-item">
											<label>Email</label>
											<p>{user.email}</p>
										</div>
										<div className="info-item">
											<label>No. Telepon</label>
											<p>{user.no_hp}</p>
										</div>
										<div className="info-item">
											<label>Role</label>
											<p>
												<span className={`badge badge-${user.role === 'Admin' ? 'success' : 'primary'}`}>
													{user.role}
												</span>
											</p>
										</div>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="profile-form">
										<div className="form-group">
											<label>Nama Lengkap *</label>
											<input
												type="text"
												name="nama"
												value={formData.nama}
												onChange={handleChange}
												required
												placeholder="Masukkan nama lengkap"
											/>
										</div>

										<div className="form-group">
											<label>Email *</label>
											<input
												type="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												required
												placeholder="contoh@email.com"
											/>
										</div>

										<div className="form-group">
											<label>No. Telepon *</label>
											<input
												type="tel"
												name="no_hp"
												value={formData.no_hp}
												onChange={handleChange}
												required
												placeholder="081234567890"
											/>
										</div>

										<div className="form-group">
											<label>Password (kosongkan jika tidak ingin mengubah)</label>
											<input
												type="password"
												name="password"
												value={formData.password}
												onChange={handleChange}
												placeholder="Minimal 6 karakter"
											/>
										</div>

										<div className="form-actions">
											<button type="button" className="btn-cancel" onClick={handleCancel}>
												Batal
											</button>
											<button type="submit" className="btn-save">
												<i className="fa-solid fa-save"></i> Simpan Perubahan
											</button>
										</div>
									</form>
								)}
							</div>
						</div>
					)}

					{activeTab === 'wishlist' && (
						<div className="profile-tab-content">
							<div className="empty-state-placeholder">
								<i className="fa-solid fa-heart"></i>
								<h3>Wishlist Anda</h3>
								<p>Anda memiliki {wishlistCount} properti di wishlist</p>
								<button onClick={() => navigate('/wishlist')} className="btn-primary">
									Lihat Semua Wishlist
								</button>
							</div>
						</div>
					)}

					{activeTab === 'properties' && (
						<div className="profile-tab-content">
							<div className="empty-state-placeholder">
								<i className="fa-solid fa-house"></i>
								<h3>Properti Saya</h3>
								<p>Anda memiliki {propertiesCount} properti yang diposting</p>
								{user.role === 'User' && (
									<button onClick={() => navigate('/posting-iklan')} className="btn-primary">
										Posting Properti Baru
									</button>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}