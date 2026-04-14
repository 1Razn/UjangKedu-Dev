const KategoriProperti = require('../models/kategori_properti');

class KategoriPropertiController {
    index(req, res) {
        KategoriProperti.getAll((err, results) => {
            if (err) return res.status(500).json({ message: "Gagal ambil data" });
            res.json({ message: "Daftar Kategori Properti", data: results });
        });
    }

    show(req, res) {
        const id = req.params.id;
        KategoriProperti.getById(id, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    }

    store(req, res) {
        const data = req.body;
        KategoriProperti.create(data, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Data berhasil ditambahkan', results });
        });
    }

    update(req, res) {
        const id = req.params.id;
        const data = req.body;
        KategoriProperti.update(id, data, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Data berhasil diupdate', results });
        });
    }

    destroy(req, res) {
        const id = req.params.id;
        KategoriProperti.delete(id, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Data berhasil dihapus', results });
        });
    }
}

module.exports = new KategoriPropertiController();