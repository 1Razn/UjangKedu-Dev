const User = require('../models/user');
class UserController {
    index(req, res) {
        User.getAll((err, result) => {
            if (err) {
                return res.json({message: 'Gagal mengambil data'});
            } else {
                return res.json({message: 'Berhasil mengambil data', data: result});
            }
        });
    }

    show(req, res) {
        const { id } = req.params;
        User.getById(id, (err, result) => {
            if (err) {
                return res.json({message: 'Gagal mengambil data'});
            } 
            res.json({message: 'Detail User', data: result[0]});
        });
    }

    store (req, res) {
        const newUser = req.body;
        if (!newUser.nama || !newUser.email || !newUser.password) {
            return res.status(400).json({ message: 'Nama, Email, dan Password wajib diisi' });
        }

        User.create(newUser, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User berhasil dibuat', userId: result.insertId });
        });
    }

    update (req, res) {
        const id = req.params.id;
        const updatedData = req.body;

        User.update(id, updatedData, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
            res.status(200).json({ message: 'Data user berhasil diperbarui' });
        });
    }

    destroy (req, res) {
        const id = req.params.id;
        User.delete(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
            res.status(200).json({ message: 'User berhasil dihapus' });
        });
    }
}

const object = new UserController();

module.exports = object;