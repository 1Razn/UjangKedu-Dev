const db = require('../config/database');

class Wishlist {
    static getAll(callback) {
        const query = 'SELECT * FROM wishlist';
        db.execute(query, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    static getByUserId(user_id, callback) {
        // ✅ Hapus p.tipe karena kolom tidak ada di tabel properti
        const query = `
            SELECT 
                w.id as wishlist_id,
                w.user_id,
                w.properti_id,
                p.judul,
                p.harga,
                p.alamat,
                p.foto_properti,
                p.luas_properti,
                kp.nama_kategori
            FROM wishlist w
            INNER JOIN properti p ON w.properti_id = p.id
            LEFT JOIN kategori_properti kp ON p.kategori_properti_id = kp.id
            WHERE w.user_id = ?
            ORDER BY w.id DESC
        `;
        
        db.execute(query, [user_id], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return callback(err, null);
            }
            callback(null, result);
        });
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM wishlist WHERE id = ?';
        db.execute(query, [id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    static checkByUserAndProperti(user_id, properti_id, callback) {
        const query = `
            SELECT id FROM wishlist 
            WHERE user_id = ? AND properti_id = ?
        `;
        db.execute(query, [user_id, properti_id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    static create(data, callback) {
        const { user_id, properti_id } = data;
        const query = `
            INSERT INTO wishlist (user_id, properti_id) 
            VALUES (?, ?)
        `;
        db.execute(query, [user_id, properti_id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    static delete(id, user_id, callback) {
        const query = 'DELETE FROM wishlist WHERE id = ? AND user_id = ?';
        db.execute(query, [id, user_id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
}

module.exports = Wishlist;