const db = require('../config/database');

class Laporan {
    static getAll = (callback) => {
        const sql = 'SELECT * FROM laporan';
        db.query(sql, callback);
    };
    
    static getById(id, callback) {
        const sql = 'SELECT * FROM laporan WHERE id = ?';
        db.query(sql, [id], callback);  
    }

    static create = (data, callback) => {
        const sql = `
            INSERT INTO laporan SET ?`;
        db.query(sql, [data], callback);
    };

    static delete = (id, callback) => {
        const sql = 'DELETE FROM laporan WHERE id = ?';
        db.query(sql, [id], callback);
    };
}
module.exports = Laporan;