const Properti = require('../models/properti');
const { validateCreateProperti, validateUpdateProperti, validateId } = require('../validator/propertiValidate');

class PropertiController {
    index(req, res) {
        Properti.getAll({}, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal mengambil data properti', error: err });
            res.status(200).json({ success: true, message: 'Berhasil mengambil data properti', total: result.length,  result });
        });
    }

    show(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ success: false, error: idError });

        Properti.getById(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal mengambil detail properti', error: err });
            if (result.length === 0) return res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Detail properti', data: result[0] });
        });
    }

    store(req, res) {
        const validationErrors = validateCreateProperti(req.body);
        if (validationErrors) {
            return res.status(400).json({ success: false, errors: validationErrors });
        }

        Properti.create(req.body, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal menambahkan properti', error: err });
            res.status(201).json({ success: true, message: 'Properti berhasil ditambahkan', propertiId: result.insertId });
        });
    }

    update(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ success: false, error: idError });

        const validationError = validateUpdateProperti(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, errors: validationError });
        }

        Properti.update(req.params.id, req.body, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal update properti', error: err });
            if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Properti berhasil diupdate' });
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return res.status(400).json({ success: false, error: idError });

        Properti.delete(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Gagal menghapus properti', error: err });
            if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Properti tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Properti berhasil dihapus' });
        });
    }
}

module.exports = new PropertiController();