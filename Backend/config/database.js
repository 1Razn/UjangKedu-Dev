const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'botydb'
});

db.connect((err) => {
    if (err) {
        console.error('Gagal terhubung ke database', err);
        return;
    } else {
        console.log('Berhasil terhubung ke database');
    }
});

module.exports = db;