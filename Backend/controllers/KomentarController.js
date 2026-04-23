const Komentar = require("../models/komentar");
const { validateKomentar, validateId } = require("../validator/komentarValidate");
const errorHandler = require('../utils/errorHandler');

class KomentarController {
    index(req, res) {
        Komentar.getAll((err, result) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal mengambil data');
            }
            res.status(200).json({ 
                success: true, 
                message: 'Berhasil mengambil data', 
                data: result 
            });
        });
    }

    show(req, res) {
        const { id } = req.params;
        
        const idError = validateId(id); 
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        Komentar.getById(id, (err, result) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal mengambil data'); 
            }
            if (result.length === 0) {
                return errorHandler(res, new Error('Not Found'), 404, 'Komentar tidak ditemukan'); 
            }
            res.status(200).json({ 
                success: true, 
                message: 'Detail Komentar', 
                data: result[0] 
            }); 
        });
    }

    store(req, res) {
        const validationErrors = validateKomentar(req.body); 
        if (validationErrors) {
            return errorHandler(res, new Error(validationErrors), 400, validationErrors); 
        }

        const newKomentar = req.body;
        Komentar.create(newKomentar, (err, result) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal membuat komentar');
            }
            res.status(201).json({ 
                success: true, 
                message: 'Komentar berhasil dibuat', 
                komentarId: result.insertId 
            }); 
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id); 
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError); 
        }

        Komentar.delete(req.params.id, (err, result) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal menghapus komentar'); 
            }
            if (result.affectedRows === 0) {
                return errorHandler(res, new Error('Not Found'), 404, 'Komentar tidak ditemukan');
            }
            res.status(200).json({ 
                success: true, 
                message: 'Komentar berhasil dihapus' 
            }); 
        });
    }
}

module.exports = new KomentarController();