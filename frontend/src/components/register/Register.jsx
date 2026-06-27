import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/authApi.js";
import "./Register.css";

export default function Register() {
	const navigate = useNavigate();
	const [showPass, setShowPass] = useState(false);
	const [showConfirmPass, setShowConfirmPass] = useState(false);
	const [form, setForm] = useState({
		nama: "",
		no_hp: "",
		email: "",
		password: "",
		konfirmasi_password: "",
		role: "User"
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const validateForm = () => {
		if (!form.nama || form.nama.trim().length === 0) {
			return "Nama wajib diisi";
		}
		if (form.nama.length > 30) {
			return "Nama maksimal 30 karakter";
		}
		if (!form.no_hp) {
			return "Nomor HP wajib diisi";
		}
		const cleanPhone = form.no_hp.replace(/\D/g, '');
		if (cleanPhone.length < 10 || cleanPhone.length > 13) {
			return "Nomor HP harus 10-13 angka";
		}
		if (!form.email) {
			return "Email wajib diisi";
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(form.email)) {
			return "Format email tidak valid";
		}
		if (form.email.length > 35) {
			return "Email maksimal 35 karakter";
		}
		if (!form.password) {
			return "Password wajib diisi";
		}
		if (form.password.length < 6) {
			return "Password minimal 6 karakter";
		}
		if (form.password.length > 30) {
			return "Password maksimal 30 karakter";
		}
		if (!form.konfirmasi_password) {
			return "Konfirmasi password wajib diisi";
		}
		if (form.password !== form.konfirmasi_password) {
			return "Password dan konfirmasi password tidak cocok";
		}
		return null;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		const validationError = validateForm();
		if (validationError) {
			setError(validationError);
			return;
		}

		setLoading(true);
		try {
			const registerData = {
				nama: form.nama.trim(),
				no_hp: form.no_hp.replace(/\D/g, ''),
				email: form.email.trim(),
				password: form.password,
				role: form.role
			};

			const response = await register(registerData);

			if (response.success) {
				alert("Registrasi berhasil! Silakan login.");
				navigate("/login");
			}
		} catch (err) {
			const message = err.response?.data?.message || "Registrasi gagal. Email atau nomor HP mungkin sudah terdaftar.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
	};

	return (
		<div className="register-page">
			<div className="register-card">
				<div className="register-left">
					<Link to="/" className="register-brand">
						<span className="brand-light">Booking Tanah </span>
						<span className="brand-amp"> dan </span>
						<br />
						<span className="brand-dark">Property</span>
					</Link>

					<p className="register-subtitle">
						Buat akun BOTY baru untuk melanjutkan.
					</p>

					{error && (
						<div className="register-error">
							<i className="fa-solid fa-circle-exclamation"></i> {error}
						</div>
					)}

					<form className="register-form" onSubmit={handleSubmit}>
						<div className="register-field">
							<i className="fa-solid fa-user login-field-icon"></i>
							<input
								type="text"
								name="nama"
								placeholder="Nama Lengkap"
								value={form.nama}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="register-field">
							<i className="fa-solid fa-phone login-field-icon"></i>
							<input
								type="tel"
								name="no_hp"
								placeholder="Nomor HP (08xx)"
								value={form.no_hp}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="register-field">
							<i className="fa-solid fa-envelope login-field-icon"></i>
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={form.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="register-field">
							<i className="fa-solid fa-lock login-field-icon"></i>
							<input
								type={showPass ? "text" : "password"}
								name="password"
								placeholder="Password"
								value={form.password}
								onChange={handleChange}
								required
							/>
							<button
								type="button"
								className="register-eye"
								onClick={() => setShowPass(!showPass)}
								aria-label="Toggle password"
							>
								<i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
							</button>
						</div>

						<div className="register-field">
							<i className="fa-solid fa-lock login-field-icon"></i>
							<input
								type={showConfirmPass ? "text" : "password"}
								name="konfirmasi_password"
								placeholder="Konfirmasi Password"
								value={form.konfirmasi_password}
								onChange={handleChange}
								required
							/>
							<button
								type="button"
								className="register-eye"
								onClick={() => setShowConfirmPass(!showConfirmPass)}
								aria-label="Toggle confirm password"
							>
								<i className={`fa-solid ${showConfirmPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
							</button>
						</div>

						<button type="submit" className="register-submit" disabled={loading}>
							{loading ? (
								<> <i className="fa-solid fa-spinner fa-spin"></i> Memproses... </>
							) : (
								<> <i className="fa-solid fa-user-plus"></i> Daftar </>
							)}
						</button>
					</form>

					<div className="register-login">
						Sudah punya akun? <Link to="/login">Login di sini</Link>
					</div>

					<div className="register-footer">
						<p>© Copyright 2026 BOTY</p>
					</div>
				</div>

				<div className="register-right" />
			</div>
		</div>
	);
}