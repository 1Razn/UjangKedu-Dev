const db = require('../config/database');

class User {
    static getAll(callback) {
        const sql = 'SELECT * FROM user';
        db.query(sql, callback)
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM user WHERE id = ?';
        db.query(sql, [id], callback);  
    }

    static create(data, callback) {
        const sql = 'INSERT INTO user SET ?';
        db.query(sql, [data], callback);  
    }

    static update(id, data, callback) {
        const sql = 'UPDATE user SET ? WHERE id = ?';
        db.query(sql, [data, id], callback);  
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM user WHERE id = ?';
        db.query(sql, [id], callback);  
    }
}

module.exports = User;