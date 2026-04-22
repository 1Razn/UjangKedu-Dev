const db = require("../config/database");

class Komentar {
    static getAll(callback) {
        const sql = "SELECT * FROM komentar";
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM komentar WHERE id = ?';
        db.query(sql, [id], callback);  
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