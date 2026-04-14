const PaketIklan = require('../models/paket_iklan');

class PaketIklanController {
    index(req, res) {
        PaketIklan.getAll((err, results) => {
            if (err) return res.status(500).json({ message: "Gagal ambil data" });
            res.json({ message: "Daftar Paket Iklan", data: results });
        });
    }

    show(req, res) {
        const id = req.params.id;    
        PaketIklan.getById(id, (err, results) => {
            if (err) return res.status(500).json({ message: "Gagal ambil data" });
            if (results.length === 0) return res.status(404).json({ message: "Paket Iklan tidak ditemukan" });
            res.json({ message: "Detail Paket Iklan", data: results[0] });
        })
    }

    store(req, res) {
        const data = req.body;
        PaketIklan.create(data, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Data berhasil ditambahkan', results });
        });
    }

    update(req, res) {
        const id = req.params.id;
        const data = req.body;
        PaketIklan.update(id, data, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Data berhasil diupdate', results });
        });
    }

    destroy(req, res) {
        const id = req.params.id;    
        PaketIklan.delete(id, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Data berhasil dihapus', results });    
        });
    }
}    

module.exports = new PaketIklanController();