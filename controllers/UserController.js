const User = require('../models/user');
const { validateCreateUser, validateUpdateUser, validateId } = require('../validator/userValidate');

class UserController {
    index(req, res) {
        User.getAll((err, result) => {
            if (err) {
                return res.status(500).json({message: 'Gagal mengambil data'});
            } else {
                return res.status(200).json({message: 'Berhasil mengambil data', data: result});
            }
        });
    }

    show(req, res) {
        const { id } = req.params;
        
        const idError = validateId(id);
        if (idError) {
            return res.status(400).json({ success: false, error: idError });
        }

        User.getById(id, (err, result) => {
            if (err) {
                return res.status(500).json({message: 'Gagal mengambil data'});
            }
            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
            }
            res.status(200).json({message: 'Detail User', data: result[0]});
        });
    }

    store(req, res) {
        const validationErrors = validateCreateUser(req.body);
        if (validationErrors) {
            return res.status(400).json({ success: false, errors: validationErrors });
        }

        const newUser = req.body;
        User.create(newUser, (err, result) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.status(201).json({ success: true, message: 'User berhasil dibuat', userId: result.insertId });
        });
    }

    update(req, res) {
        const idError = validateId(req.params.id);
        if (idError) {
            return res.status(400).json({ success: false, error: idError });
        }

        const validationError = validateUpdateUser(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, errors: validationError });
        }

        User.update(req.params.id, req.body, (err, result) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Data user berhasil diperbarui' });
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id);
        if (idError) {
            return res.status(400).json({ success: false, error: idError });
        }

        User.delete(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
            res.status(200).json({ success: true, message: 'User berhasil dihapus' });
        });
    }
}

const object = new UserController();
module.exports = object;