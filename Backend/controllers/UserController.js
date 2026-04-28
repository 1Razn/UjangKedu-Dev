const User = require('../models/user');
const { validateCreateUser, validateUpdateUser, validateId } = require('../validator/userValidate');
const errorHandler = require('../utils/errorHandler');
const path = require('path');
const fs = require('fs');

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
            if (req.file) fs.unlinkSync(req.file.path);
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        const newUser = { ...req.body };
        if (req.file) {
            newUser.foto_profil = `uploads/profile/${req.file.filename}`;
        }

        User.create(newUser, (err, result) => {
            if (err) {
                if (req.file) fs.unlinkSync(req.file.path); 
                return errorHandler(res, err, 500, 'Gagal membuat user');
            }
            res.status(201).json({
                success: true,
                message: 'User berhasil dibuat',
                data: { id: result.insertId, foto_profil: newUser.foto_profil || null }
            });
        });
    }

    update(req, res) {
        const idError = validateId(req.params.id);
        if (idError) return errorHandler(res, new Error(idError), 400, idError);

        const validationError = validateUpdateUser(req.body);
        if (validationError) {
            if (req.file) fs.unlinkSync(req.file.path);
            return errorHandler(res, new Error(validationError.join(', ')), 400, validationError.join(', '));
        }

        User.getById(req.params.id, (err, oldUserResult) => {
            if (err) return errorHandler(res, err, 500, 'Gagal mengambil data user');
            if (oldUserResult.length === 0) {
                if (req.file) fs.unlinkSync(req.file.path);
                return errorHandler(res, new Error('Not Found'), 404, 'User tidak ditemukan');
            }

            const oldFoto = oldUserResult[0].foto_profil;
            const updateData = { ...req.body };

            updateData.foto_profil = req.file ? `uploads/profile/${req.file.filename}` : oldFoto;

            User.update(req.params.id, updateData, (err, result) => {
                if (err) {
                    if (req.file) fs.unlinkSync(req.file.path);
                    return errorHandler(res, err, 500, 'Gagal memperbarui user');
                }
                if (result.affectedRows === 0) {
                    if (req.file) fs.unlinkSync(req.file.path);
                    return errorHandler(res, new Error('Not Found'), 404, 'User tidak ditemukan');
                }

                if (req.file && oldFoto) {
                    const oldFilePath = path.join(__dirname, '..', oldFoto);
                    if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
                }

                res.status(200).json({
                    success: true,
                    message: 'Data user berhasil diperbarui',
                    data: { foto_profil: updateData.foto_profil }
                });
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