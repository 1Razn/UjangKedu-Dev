const Laporan = require('../models/laporan');
const { validateLaporan, validateId } = require('../validator/laporanValidate');
const errorHandler = require('../utils/errorHandler');

class LaporanController {
    index(req, res) {
        Laporan.getAll((err, results) => {
            if (err) return errorHandler(res, err, 500, "Gagal ambil data");
            
            res.json({ 
                success: true, 
                message: "Daftar Laporan", 
                data: results 
            });
        });
    }

    show(req, res) {
        const id = req.params.id;
        
        const error = validateId(id);
        if (error) return errorHandler(res, new Error(error), 400, error);

        Laporan.getById(id, (err, results) => {
            if (err) return errorHandler(res, err, 500, "Terjadi kesalahan database");
            
            if (!results || results.length === 0) {
                return errorHandler(res, new Error("Not Found"), 404, "Data tidak ditemukan");
            }

            res.json({
                success: true,
                message: "Detail Laporan",
                data: results[0]
            });
        });
    }

    store(req, res) {
        const data = req.body;
        
        const error = validateLaporan(data);
        if (error) return errorHandler(res, new Error(error), 400, error);

        Laporan.create(data, (err, results) => {
            if (err) return errorHandler(res, err, 500, "Gagal tambah data");
            
            res.status(201).json({
                success: true,
                message: 'Laporan berhasil ditambahkan',
                data: data 
            });
        });
    }

    destroy(req, res) {
        const id = req.params.id;
        
        const error = validateId(id);
        if (error) return errorHandler(res, new Error(error), 400, error);

        Laporan.delete(id, (err, results) => {
            if (err) return errorHandler(res, err, 500, "Gagal hapus data");
            
            if (results.affectedRows === 0) {
                return errorHandler(res, new Error("Not Found"), 404, "Data tidak ditemukan");
            }
            
            res.json({
                success: true,
                message: 'Laporan berhasil dihapus'
            });
        });
    }
}

const db = require('../config/database'); 

// Fungsi untuk nerima form dari User (POST)
exports.createLaporan = (req, res) => {
  const { user_id, properti_id, judul_laporan, keterangan } = req.body;

  const query = 'INSERT INTO laporan (user_id, properti_id, judul_laporan, keterangan) VALUES (?, ?, ?, ?)';
  
  // Karena pakai connectionPool dari temen lu, kita bisa langsung pakai db.query
  db.query(query, [user_id, properti_id, judul_laporan, keterangan], (err, result) => {
    if (err) {
        console.error('Error saat insert laporan:', err);
        return res.status(500).json({ error: 'Gagal menyimpan laporan ke database' });
    }
    res.status(201).json({ message: 'Laporan berhasil dikirim!' });
  });
};

// Fungsi untuk ngirim data ke Admin Dashboard (GET)
exports.getAllLaporan = (req, res) => {
  const query = 'SELECT * FROM laporan ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
        console.error('Error saat get laporan:', err);
        return res.status(500).json({ error: 'Gagal mengambil data laporan' });
    }
    res.status(200).json(results);
  });
};

module.exports = new LaporanController();