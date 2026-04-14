const Laporan = require('../models/laporan');

class LaporanController {
    index(req, res) {
        Laporan.getAll((err, results) => {    
            if (err) return res.status(500).json({ message: "Gagal ambil data" });
            res.json({ message: "Daftar Laporan", data: results });
        });
    }

    show(req, res) {
        const id = req.params.id;
        Laporan.getById(id, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    }

    store(req, res) {
        const data = req.body;
        Laporan.create(data, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({
                message: 'Laporan berhasil ditambahkan',
                data: results
            });
        });
    }

    destroy(req, res) {
        const id = req.params.id;
        Laporan.delete(id, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({
                message: 'Laporan berhasil dihapus'
            });
        });
    }
}

module.exports = new LaporanController();