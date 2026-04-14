const Wishlist = require('../models/wishlist');

class WishlistController {
    index(req, res) {
        Wishlist.getAll((err, result) => {
            if (err) {
                return res.json({message: 'Gagal mengambil data'});
            } else {
                return res.json({message: 'Berhasil mengambil data', data: result});
            }
        });
    }

    show(req, res) {
        const { id } = req.params;
        Wishlist.getById(id, (err, result) => {
            if (err) {
                return res.json({message: 'Gagal mengambil data'});
            } 
            res.json({message: 'Detail wishlist', data: result[0]});
        });
    }

    store(req, res) {
        const data = {
            user_id: req.body.user_id,
            properti_id: req.body.properti_id
        };

        if (!data.user_id || !data.properti_id) {
            return res.status(400).json({ message: 'user_id dan properti_id harus diisi' });
        }

        Wishlist.create(data, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal menambahkan wishlist', error: err });
            }
            res.status(201).json({ 
                message: 'Berhasil ditambahkan ke wishlist', 
                id: result.insertId 
            });
        });
    }

    update(req, res) {
        const id = req.params.id;
        const data = {
            user_id: req.body.user_id,
            properti_id: req.body.properti_id
        };

        Wishlist.update(id, data, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal memperbarui data', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Data tidak ditemukan' });
            }
            res.status(200).json({ message: 'Wishlist berhasil diperbarui' });
        });
    }

    destroy(req, res) {
        const id = req.params.id;
        Wishlist.delete(id, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal menghapus data', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Data tidak ditemukan' });
            }
            res.status(200).json({ message: 'Berhasil menghapus dari wishlist' });
        });
    }
}

module.exports = new WishlistController();