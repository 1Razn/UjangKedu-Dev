const Wishlist = require('../models/wishlist');
const { validateCreateWishlist, validateId } = require('../validator/wishlistValidate');

class WishlistController {
    index(req, res) {
        Wishlist.getAll((err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Gagal mengambil data wishlist' });
            }
            res.status(200).json({ success: true, message: 'Berhasil mengambil data wishlist',  result });
        });
    }

    show(req, res) {
        const { id } = req.params;
        
        const idError = validateId(id);
        if (idError) {
            return res.status(400).json({ success: false, error: idError });
        }

        Wishlist.getById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Gagal mengambil data' });
            }
            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'Wishlist tidak ditemukan' });
            }
            res.status(200).json({ success: true, message: 'Detail Wishlist', data: result[0] });
        });
    }

    store(req, res) {
        const validationErrors = validateCreateWishlist(req.body);
        if (validationErrors) {
            return res.status(400).json({ success: false, errors: validationErrors });
        }

        const newWishlist = req.body;
        Wishlist.create(newWishlist, (err, result) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.status(201).json({ success: true, message: 'Wishlist berhasil dibuat', wishlistId: result.insertId });
        });
    }

    destroy(req, res) {
        const id = req.params.id;
        
        const idError = validateId(id);
        if (idError) {
            return res.status(400).json({ success: false, error: idError });
        }

        Wishlist.delete(id, (err, result) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Wishlist tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Wishlist berhasil dihapus' });
        });
    }
}

module.exports = new WishlistController();