const Auth = require('../models/Auth');
const { validateRegister, validateLogin } = require('../validator/authValidate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const errorHandler = require('../utils/errorHandler');
require('dotenv').config();

class AuthController {
    async register(req, res) {
        const data = req.body;
        
        const validationErrors = validateRegister(data);
        if (validationErrors) {
            if (req.file) fs.unlinkSync(req.file.path); 
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        try {
            Auth.findByEmail(data.email, async (err, existingUser) => {
                if (err) {
                    if (req.file) fs.unlinkSync(req.file.path);
                    return errorHandler(res, err, 500, 'Terjadi kesalahan server');
                }

                if (existingUser) {
                    if (req.file) fs.unlinkSync(req.file.path);
                    return errorHandler(res, new Error('Email sudah digunakan'), 409, 'Email sudah terdaftar');
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(data.password, salt);

                const userData = {
                    nama: data.nama.trim(),
                    no_hp: data.no_hp,
                    email: data.email.trim(),
                    password: hashedPassword,
                    role: data.role || 'User',
                    foto_profil: req.file ? `uploads/profile/${req.file.filename}` : null 
                };

                Auth.register(userData, (err, result) => {
                    if (err) {
                        if (req.file) fs.unlinkSync(req.file.path); 
                        return errorHandler(res, err, 500, 'Gagal mendaftarkan user');
                    }

                    res.status(201).json({
                        success: true,
                        message: 'Registrasi berhasil',
                        data: {
                            userId: result.insertId,
                            email: userData.email,
                            role: userData.role,
                            foto_profil: userData.foto_profil 
                        }
                    });
                });
            });
        } catch (error) {
            if (req.file) fs.unlinkSync(req.file.path);
            errorHandler(res, error, 500, 'Terjadi kesalahan server');
        }
    }

    async login(req, res) {
        const data = req.body;
        const validationErrors = validateLogin(data);
        if (validationErrors) {
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        try {
            Auth.findByEmail(data.email.trim(), async (err, user) => {
                if (err) return errorHandler(res, err, 500, 'Terjadi kesalahan server');
                if (!user) return errorHandler(res, new Error('User tidak ditemukan'), 401, 'Email atau password salah');

                const isPasswordValid = await bcrypt.compare(data.password, user.password);
                if (!isPasswordValid) return errorHandler(res, new Error('Password tidak sesuai'), 401, 'Email atau password salah');

                const payload = { id: user.id, email: user.email, role: user.role };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });

                res.status(200).json({
                    success: true,
                    message: 'Login berhasil',
                    data: {
                        token: token,
                        user: {
                            id: user.id,
                            nama: user.nama,
                            email: user.email,
                            role: user.role,
                            foto_profil: user.foto_profil 
                        }
                    }
                });
            });
        } catch (error) {
            errorHandler(res, error, 500, 'Terjadi kesalahan server');
        }
    }

    getProfile(req, res) {
        res.status(200).json({
            success: true,
            message: 'Profil berhasil diambil',
            data: req.user
        });
    }
}

module.exports = new AuthController();