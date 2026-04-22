const dotenv = require('dotenv');
const express = require('express');
const router = require('./routes/api');
const db = require('./config/database');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get('/', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            res.json({message: 'Koneksi Gagal'});
        } else {
            res.json({message: 'Koneksi Berhasil', results: results});
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}/`);
});
