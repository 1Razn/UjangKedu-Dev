const authorize = (...roles) => {
    return (req, res, next) => {
        // Cek apakah user sudah terautentikasi
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User belum terautentikasi',
                error: 'Silakan login terlebih dahulu'
            });
        }

        // Cek apakah role user ada dalam daftar role yang diizinkan
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                error: `Role '${req.user.role}' tidak memiliki akses ke resource ini`
            });
        }

        next(); // Lanjutkan ke controller
    };
};

module.exports = authorize;