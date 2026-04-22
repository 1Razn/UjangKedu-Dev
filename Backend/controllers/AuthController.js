const Auth = require('../models/Auth');
const { validateRegister, validateLogin } = require('../validator/authValidator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
    // REGISTER
    async register(req, res) {
        const data = req.body;

        // Validasi input
        const validationErrors = validateRegister(data);
        if (validationErrors) {
            return res.status(400).json({
                success: false,
                message: 'Validasi gagal',
                errors: validationErrors
            });
        }

        try {
            // Cek apakah email sudah terdaftar
            Auth.findByEmail(data.email, async (err, existingUser) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Terjadi kesalahan server',
                        error: err.message
                    });
                }

                if (existingUser) {
                    return res.status(409).json({
                        success: false,
                        message: 'Email sudah terdaftar',
                        error: 'Email sudah digunakan'
                    });
                }

                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(data.password, salt);

                // Simpan user ke database
                const userData = {
                    nama: data.nama.trim(),
                    no_hp: data.no_hp,
                    email: data.email.trim(),
                    password: hashedPassword,
                    role: data.role || 'User'
                };

                Auth.register(userData, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: 'Gagal mendaftarkan user',
                            error: err.message
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: 'Registrasi berhasil',
                        data: {
                            userId: result.insertId,
                            email: userData.email,
                            role: userData.role
                        }
                    });
                });
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server',
                error: error.message
            });
        }
    }

    // LOGIN
    async login(req, res) {
        const data = req.body;

        // Validasi input
        const validationErrors = validateLogin(data);
        if (validationErrors) {
            return res.status(400).json({
                success: false,
                message: 'Validasi gagal',
                errors: validationErrors
            });
        }

        try {
            // Cari user berdasarkan email
            Auth.findByEmail(data.email.trim(), async (err, user) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Terjadi kesalahan server',
                        error: err.message
                    });
                }

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'Email atau password salah',
                        error: 'User tidak ditemukan'
                    });
                }

                // Verifikasi password
                const isPasswordValid = await bcrypt.compare(data.password, user.password);
                
                if (!isPasswordValid) {
                    return res.status(401).json({
                        success: false,
                        message: 'Email atau password salah',
                        error: 'Password tidak sesuai'
                    });
                }

                // Buat JWT Token
                const payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
                });

                res.status(200).json({
                    success: true,
                    message: 'Login berhasil',
                    data: {
                        token: token,
                        user: {
                            id: user.id,
                            nama: user.nama,
                            email: user.email,
                            role: user.role
                        }
                    }
                });
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server',
                error: error.message
            });
        }
    }

    // GET PROFILE (Protected Route)
    getProfile(req, res) {
        // req.user sudah ada dari middleware auth
        res.status(200).json({
            success: true,
            message: 'Profil berhasil diambil',
            data: req.user
        });
    }
}

module.exports = new AuthController();