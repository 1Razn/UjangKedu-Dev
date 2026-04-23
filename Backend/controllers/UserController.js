const User = require('../models/user');
const { validateCreateUser, validateUpdateUser, validateId } = require('../validator/userValidate');
const errorHandler = require('../utils/errorHandler');

class UserController {
    index(req, res) {
        User.getAll((err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal mengambil data user');
            
            res.status(200).json({ 
                success: true, 
                message: 'Berhasil mengambil data user', 
                data: result 
            });
        });
    }

    show(req, res) {
        const { id } = req.params;
        
        const idError = validateId(id);
        if (idError) return errorHandler(res, new Error(idError), 400, idError);

        User.getById(id, (err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal mengambil data user');
            if (result.length === 0) return errorHandler(res, new Error('Not Found'), 404, 'User tidak ditemukan');
            
            res.status(200).json({ 
                message: 'Detail User', 
                data: result[0] 
            });
        });
    }

    store(req, res) {
        const validationErrors = validateCreateUser(req.body);
        if (validationErrors) {
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        const newUser = req.body;
        User.create(newUser, (err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal membuat user');
            
            res.status(201).json({ 
                success: true, 
                message: 'User berhasil dibuat', 
                userId: result.insertId 
            });
        });
    }

    update(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return errorHandler(res, new Error(idError), 400, idError);

        const validationError = validateUpdateUser(req.body);
        if (validationError) {
            return errorHandler(res, new Error(validationError.join(', ')), 400, validationError.join(', '));
        }

        User.update(req.params.id, req.body, (err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal memperbarui user');
            if (result.affectedRows === 0) return errorHandler(res, new Error('Not Found'), 404, 'User tidak ditemukan');
            
            res.status(200).json({ 
                success: true, 
                message: 'Data user berhasil diperbarui' 
            });
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return errorHandler(res, new Error(idError), 400, idError);

        User.delete(req.params.id, (err, result) => {
            if (err) return errorHandler(res, err, 500, 'Gagal menghapus user');
            if (result.affectedRows === 0) return errorHandler(res, new Error('Not Found'), 404, 'User tidak ditemukan');
            
            res.status(200).json({ 
                success: true, 
                message: 'User berhasil dihapus' 
            });
        });
    }
}

module.exports = new UserController();