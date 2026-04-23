const PaketIklan = require('../models/paket_iklan');
const { validateCreatePaketIklan, validateUpdatePaketIklan, validateId } = require('../validator/PaketIklanValidate');
const errorHandler = require('../utils/errorHandler');

class PaketIklanController {
    index(req, res) {
        PaketIklan.getAll((err, results) => {
            if (err) {
                return errorHandler(res, err, 500, "Gagal ambil data");
            }
            res.status(200).json({ 
                success: true, 
                message: "Daftar Paket Iklan", 
                total: results.length, 
                data: results 
            });
        });
    }

    show(req, res) {
        const idError = validateId(req.params.id);
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        PaketIklan.getById(req.params.id, (err, results) => {
            if (err) {
                return errorHandler(res, err, 500, "Gagal ambil data");
            }
            if (results.length === 0) {
                return errorHandler(res, new Error("Not Found"), 404, "Paket Iklan tidak ditemukan");
            }
            res.status(200).json({ 
                success: true, 
                message: "Detail Paket Iklan", 
                data: results[0] 
            });
        });
    }

    store(req, res) {
        const validationErrors = validateCreatePaketIklan(req.body);
        if (validationErrors) {
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        PaketIklan.create(req.body, (err, results) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal menambahkan paket iklan');
            }
            res.status(201).json({ 
                success: true, 
                message: 'Paket iklan berhasil ditambahkan', 
                paketId: results.insertId 
            });
        });
    }

    update(req, res) {
        const idError = validateId(req.params.id);
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        const validationErrors = validateUpdatePaketIklan(req.body);
        if (validationErrors) {
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        PaketIklan.update(req.params.id, req.body, (err, results) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal update paket iklan');
            }
            if (results.affectedRows === 0) {
                return errorHandler(res, new Error("Not Found"), 404, 'Paket Iklan tidak ditemukan');
            }
            res.status(200).json({ 
                success: true, 
                message: 'Paket iklan berhasil diupdate' 
            });
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id);
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        PaketIklan.delete(req.params.id, (err, results) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal menghapus paket iklan');
            }
            if (results.affectedRows === 0) {
                return errorHandler(res, new Error("Not Found"), 404, 'Paket Iklan tidak ditemukan');
            }
            res.status(200).json({ 
                success: true, 
                message: 'Paket iklan berhasil dihapus' 
            });
        });
    }
}

module.exports = new PaketIklanController();