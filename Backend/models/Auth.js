const db = require('../config/database');

class Auth {
    // Register user baru
    static register(data, callback) {
        const sql = `INSERT INTO user (nama, no_hp, email, password, role) VALUES (?, ?, ?, ?, ?)`;
        const values = [data.nama, data.no_hp, data.email, data.password, data.role || 'User'];
        
        db.query(sql, values, callback);
    }

    // Cari user berdasarkan email
    static findByEmail(email, callback) {
        const sql = `SELECT * FROM user WHERE email = ?`;
        db.query(sql, [email], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0] || null);
        });
    }

    // Cari user berdasarkan ID
    static findById(id, callback) {
        const sql = `SELECT id, nama, email, role FROM user WHERE id = ?`;
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0] || null);
        });
    }

    // Update last login (opsional)
    static updateLastLogin(id, callback) {
        const sql = `UPDATE user SET last_login = NOW() WHERE id = ?`;
        db.query(sql, [id], callback);
    }
}

module.exports = Auth;