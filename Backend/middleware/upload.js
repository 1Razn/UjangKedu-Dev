// middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const createStorage = (subfolder) => {
    const dest = path.join(__dirname, '../uploads', subfolder);
    ensureDir(dest);

    return multer.diskStorage({
        destination: (req, file, cb) => cb(null, dest),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
            cb(null, uniqueName);
        }
    });
};

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Format file tidak didukung. Hanya JPG, PNG, atau WEBP.'), false);
    }
};

module.exports = {
    profile: multer({
        storage: createStorage('profile'),
        fileFilter,
        limits: { fileSize: 2 * 1024 * 1024 }
    }),
    properti: multer({
        storage: createStorage('properti'),
        fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }
    })
};