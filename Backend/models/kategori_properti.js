const db = require('../config/database');

class KategoriProperti {
  static getAll(callback) {
    const sql = 'SELECT * FROM kategori_properti';
    db.query(sql, callback);
  }

  static getById(id, callback) {
    const sql = 'SELECT * FROM kategori_properti WHERE id = ?';
    db.query(sql, [id], callback);
  }

  static create(data, callback) {
    const sql = 'INSERT INTO kategori_properti SET ?';
    db.query(sql, [data], callback);
  }

  static update(id, data, callback) {
    const sql = 'UPDATE kategori_properti SET ? WHERE id = ?';
    db.query(sql, [data, id], callback);
  }

  static delete(id, callback) {
    const sql = 'DELETE FROM kategori_properti WHERE id = ?';
    db.query(sql, [id], callback);
  }
}

module.exports = KategoriProperti;