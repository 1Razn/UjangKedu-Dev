// utils/errorHandler.js

const errorHandler = (res, error, status = 500, message = "Terjadi kesalahan") => {
    console.error(error); // Untuk melihat detail error di terminal/console [cite: 391]
    
    return res.status(status).json({
        success: false,
        message: message,
        error: error?.message || error // Mengambil pesan error jika ada [cite: 400]
    });
};

module.exports = errorHandler;