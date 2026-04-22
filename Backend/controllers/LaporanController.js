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
        if (error) return errorHandler(res, error, 400, error);

        Laporan.getById(id, (err, results) => {
            if (err) return errorHandler(res, err, 500, "Terjadi kesalahan database");
            
            if (!results || results.length === 0) {
                return errorHandler(res, "Not Found", 404, "Data tidak ditemukan");
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
        if (error) return errorHandler(res, error, 400, error);

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
        if (error) return errorHandler(res, error, 400, error);

        Laporan.delete(id, (err, results) => {
            if (err) return errorHandler(res, err, 500, "Gagal hapus data");
            
            res.json({
                success: true,
                message: 'Laporan berhasil dihapus'
            });
        });
    }
}

module.exports = new LaporanController();