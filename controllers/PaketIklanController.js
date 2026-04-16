const PaketIklan = require('../models/paket_iklan');
const { validateCreatePaketIklan, validateUpdatePaketIklan, validateId } = require('../validator/PaketIklanValidate');

class PaketIklanController {
    index(req, res) {
        PaketIklan.getAll((err, results) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal ambil data", error: err });
            res.status(200).json({ success: true, message: "Daftar Paket Iklan", total: results.length, data: results });
        });
    }

    show(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ success: false, error: idError });

        PaketIklan.getById(req.params.id, (err, results) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal ambil data", error: err });
            if (results.length === 0) return res.status(404).json({ success: false, message: "Paket Iklan tidak ditemukan" });
            res.status(200).json({ success: true, message: "Detail Paket Iklan", data: results[0] });
        });
    }

    store(req, res) {
        const validationErrors = validateCreatePaketIklan(req.body);
        if (validationErrors) {
            return res.status(400).json({ success: false, errors: validationErrors });
        }

        PaketIklan.create(req.body, (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal menambahkan paket iklan', error: err });
            res.status(201).json({ success: true, message: 'Paket iklan berhasil ditambahkan', paketId: results.insertId });
        });
    }

    update(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ success: false, error: idError });

        const validationErrors = validateUpdatePaketIklan(req.body);
        if (validationErrors) {
            return res.status(400).json({ success: false, errors: validationErrors });
        }

        PaketIklan.update(req.params.id, req.body, (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal update paket iklan', error: err });
            if (results.affectedRows === 0) return res.status(404).json({ success: false, message: 'Paket Iklan tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Paket iklan berhasil diupdate' });
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ success: false, error: idError });

        PaketIklan.delete(req.params.id, (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal menghapus paket iklan', error: err });
            if (results.affectedRows === 0) return res.status(404).json({ success: false, message: 'Paket Iklan tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Paket iklan berhasil dihapus' });
        });
    }
}    

module.exports = new PaketIklanController();