const Properti = require('../models/properti');
const { validateCreateProperti, validateUpdateProperti, validateId } = require('../validator/propertiValidate');
const errorHandler = require('../utils/errorHandler');

class PropertiController {
    index(req, res) {
        Properti.getAll({}, (err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal mengambil data properti');
            res.status(200).json({ 
                success: true, 
                message: 'Berhasil mengambil data properti', 
                total: result.length, 
                data: result 
            });
        });
    }

    show(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return errorHandler(res, new Error(idError), 400, idError);

        Properti.getById(req.params.id, (err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal mengambil detail properti');
            if (result.length === 0) return errorHandler(res, new Error('Not Found'), 404, 'Properti tidak ditemukan');
            
            res.status(200).json({ 
                success: true, 
                message: 'Detail properti', 
                data: result[0] 
            });
        });
    }

    store(req, res) {
        const validationErrors = validateCreateProperti(req.body);
        if (validationErrors) {
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        Properti.create(req.body, (err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal menambahkan properti');
            
            res.status(201).json({ 
                success: true, 
                message: 'Properti berhasil ditambahkan', 
                propertiId: result.insertId 
            });
        });
    }

    update(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return errorHandler(res, new Error(idError), 400, idError);

        const validationError = validateUpdateProperti(req.body);
        if (validationError) {
            return errorHandler(res, new Error(validationError.join(', ')), 400, validationError.join(', '));
        }

        Properti.update(req.params.id, req.body, (err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal update properti');
            if (result.affectedRows === 0) return errorHandler(res, new Error('Not Found'), 404, 'Properti tidak ditemukan');
            
            res.status(200).json({ 
                success: true, 
                message: 'Properti berhasil diupdate' 
            });
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return errorHandler(res, new Error(idError), 400, idError);

        Properti.delete(req.params.id, (err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal menghapus properti');
            if (result.affectedRows === 0) return errorHandler(res, new Error('Not Found'), 404, 'Properti tidak ditemukan');
            
            res.status(200).json({ 
                success: true, 
                message: 'Properti berhasil dihapus' 
            });
        });
    }
}

module.exports = new PropertiController();