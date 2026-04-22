const KategoriProperti = require('../models/kategori_properti');
const { validateCreateKategoriProperti, validateUpdateKategoriProperti, validateId } = require('../validator/KategoriPropertiValidate');

class KategoriPropertiController {
    index(req, res) {
        KategoriProperti.getAll((err, results) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal ambil data", error: err });
            res.status(200).json({ success: true, message: "Daftar Kategori Properti", total: results.length, data: results });
        });
    }

    show(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ success: false, error: idError });

        KategoriProperti.getById(req.params.id, (err, results) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal ambil data", error: err });
            if (results.length === 0) return res.status(404).json({ success: false, message: "Kategori Properti tidak ditemukan" });
            res.status(200).json({ success: true, message: "Detail Kategori Properti", data: results[0] });
        });
    }

    store(req, res) {
        const validationErrors = validateCreateKategoriProperti(req.body);
        if (validationErrors) {
            return res.status(400).json({ success: false, errors: validationErrors });
        }

        KategoriProperti.create(req.body, (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal menambahkan kategori properti', error: err });
            res.status(201).json({ success: true, message: 'Kategori properti berhasil ditambahkan', kategoriId: results.insertId });
        });
    }

    update(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ success: false, error: idError });

        const validationErrors = validateUpdateKategoriProperti(req.body);
        if (validationErrors) {
            return res.status(400).json({ success: false, errors: validationErrors });
        }

        KategoriProperti.update(req.params.id, req.body, (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal update kategori properti', error: err });
            if (results.affectedRows === 0) return res.status(404).json({ success: false, message: 'Kategori Properti tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Kategori properti berhasil diupdate' });
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ success: false, error: idError });

        KategoriProperti.delete(req.params.id, (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal menghapus kategori properti', error: err });
            if (results.affectedRows === 0) return res.status(404).json({ success: false, message: 'Kategori Properti tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Kategori properti berhasil dihapus' });
        });
    }
}

module.exports = new KategoriPropertiController();