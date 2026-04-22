const db = require('../config/database');

class Wishlist {
    static getAll(callback) {
        const sql = `
            SELECT wishlist.*, user.nama as nama_user, properti.judul as nama_properti 
            FROM wishlist
            JOIN user ON wishlist.user_id = user.id
            JOIN properti ON wishlist.properti_id = properti.id
        `;
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM wishlist WHERE id = ?';
        db.query(sql, [id], callback);  
    }

    static create(data, callback) {
        // data berisi { user_id, properti_id }
        const sql = 'INSERT INTO wishlist SET ?';
        db.query(sql, [data], callback);  
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM wishlist WHERE id = ?';
        db.query(sql, [id], callback);  
    }
}

module.exports = Wishlist;