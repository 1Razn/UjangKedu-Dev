const db = require('../config/database');


const getAllLaporan = (callback) => {
    const sql = 'SELECT * FROM laporan';
    db.query(sql, callback);
};

const createLaporan = (data, callback) => {
    const sql = `
        INSERT INTO laporan (keterangan, user_id, properti_id, user_id1)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [
        data.keterangan,
        data.user_id,
        data.properti_id,
        data.user_id1
    ], callback);
};

const deleteLaporan = (id, callback) => {
    const sql = 'DELETE FROM laporan WHERE id = ?';
    db.query(sql, [id], callback);
};

module.exports = {
    getAllLaporan,
    createLaporan,
    deleteLaporan
};