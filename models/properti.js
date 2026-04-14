const db = require('../config/database');

class Properti {
    static getAll(params, callback) {
        let sql = `SELECT * FROM properti WHERE 1=1`;
        let values = [];

        // filter by user_id
        if (params.user_id) {
            sql += ` AND user_id = ?`;
            values.push(params.user_id);
        }

        // search by judul
        if (params.search) {
            sql += ` AND judul LIKE ?`;
            values.push(`%${params.search}%`);
        }

        // sorting
        if (params.sortBy) {
            const order = params.order === 'desc' ? 'DESC' : 'ASC';
            sql += ` ORDER BY ${params.sortBy} ${order}`;
        } else {
            sql += ` ORDER BY id DESC`;
        }

        db.query(sql, values, callback);
    }

    static getById(id, callback) {
        const sql = `
            SELECT 
                p.*,
                k.nama_kategori,
                pk.nama_paket,
                u.nama AS nama_user
            FROM properti p
            LEFT JOIN kategori_properti k ON p.kategori_properti_id = k.id
            LEFT JOIN paket_iklan pk ON p.paket_iklan_id = pk.id
            LEFT JOIN user u ON p.user_id = u.id
            WHERE p.id = ?
        `;
        db.query(sql, [id], callback);
    }

    static create(data, callback) {
        const sql = `INSERT INTO properti SET ?`;
        db.query(sql, data, callback);
    }

    // UPDATE (partial update)
    static update(id, data, callback) {
        const sql = `UPDATE properti SET ? WHERE id = ?`;
        db.query(sql, [data, id], callback);
    }

    // DELETE
    static delete(id, callback) {
        const sql = `DELETE FROM properti WHERE id = ?`;
        db.query(sql, [id], callback);
    }

    // CHECK EXIST
    static exists(id, callback) {
        const sql = `SELECT id FROM properti WHERE id = ?`;
        db.query(sql, [id], callback);
    }

    // GET BY USER
    static getByUser(user_id, callback) {
        const sql = `SELECT * FROM properti WHERE user_id = ? ORDER BY id DESC`;
        db.query(sql, [user_id], callback);
    }

    // PAGINATION
    static getPaginated(limit, offset, callback) {
        const sql = `SELECT * FROM properti LIMIT ? OFFSET ?`;
        db.query(sql, [parseInt(limit), parseInt(offset)], callback);
    }

    // COUNT TOTAL DATA
    static count(callback) {
        const sql = `SELECT COUNT(*) as total FROM properti`;
        db.query(sql, callback);
    }

}

module.exports = Properti;