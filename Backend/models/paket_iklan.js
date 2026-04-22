const db = require('../config/database');

class PaketIklan {
  static getAll(callback) {
    const sql = 'SELECT * FROM paket_iklan';
    db.query(sql, callback);
  }

  static getById(id, callback) {
    const sql = 'SELECT * FROM paket_iklan WHERE id = ?';
    db.query(sql, [id], callback);
  }

  static create(data, callback) {
    const sql = 'INSERT INTO paket_iklan SET ?';
    db.query(sql, data, callback);
  }

  static update(id, data, callback) {
    const sql = 'UPDATE paket_iklan SET ? WHERE id = ?';
    db.query(sql, [data, id], callback);
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM paket_iklan WHERE id = ?';
    db.query(sql, [id], callback);
  }
}

module.exports = PaketIklan;