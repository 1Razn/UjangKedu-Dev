const db = require("../config/database");

class Komentar {
    static getAll(callback) {
        const sql = `
      SELECT 
        k.id,
        k.komentar,
        k.properti_id,
        k.user_id,
        k.komentar_id,
        u.nama as nama_user
      FROM komentar k
      LEFT JOIN user u ON k.user_id = u.id
      ORDER BY k.id ASC
    `;
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = `
      SELECT 
        k.id,
        k.komentar,
        k.properti_id,
        k.user_id,
        k.komentar_id,
        u.nama as nama_user
      FROM komentar k
      LEFT JOIN user u ON k.user_id = u.id
      WHERE k.id = ?
    `;
        db.query(sql, [id], callback);
    }

    static getByPropertiId(propertiId, callback) {
        const sql = `
      SELECT 
        k.id,
        k.komentar,
        k.properti_id,
        k.user_id,
        k.komentar_id,
        u.nama as nama_user
      FROM komentar k
      LEFT JOIN user u ON k.user_id = u.id
      WHERE k.properti_id = ?
      ORDER BY k.id ASC
    `;
        db.query(sql, [propertiId], callback);
    }

    static create(data, callback) {
        const sql = "INSERT INTO komentar SET ?";
        db.query(sql, data, callback);
    }

    static update(id, data, callback) {
        const sql = "UPDATE komentar SET ? WHERE id = ?";
        db.query(sql, [data, id], callback);
    }

    static delete(id, callback) {
        const sql = "DELETE FROM komentar WHERE id = ?";
        db.query(sql, [id], callback);
    }
}

module.exports = Komentar;