const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    // Ambil token dari header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    // Cek apakah token ada
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Akses ditolak',
            error: 'Token tidak ditemukan. Silakan login terlebih dahulu.'
        });
    }

    // Verifikasi token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token telah kedaluwarsa',
                    error: 'Silakan login kembali'
                });
            }

            return res.status(403).json({
                success: false,
                message: 'Token tidak valid',
                error: err.message
            });
        }

        // Simpan data user di request
        req.user = user;
        next(); // Lanjutkan ke controller
    });
};

module.exports = authenticateToken;