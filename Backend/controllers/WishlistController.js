const Wishlist = require('../models/wishlist');
const { validateCreateWishlist, validateId } = require('../validator/wishlistValidate');
const errorHandler = require('../utils/errorHandler');

class WishlistController {
    index(req, res) {
        Wishlist.getAll((err, result) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal mengambil data wishlist');
            }
            res.status(200).json({ 
                success: true, 
                message: 'Berhasil mengambil data wishlist', 
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

        Wishlist.getById(id, (err, result) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal mengambil data');
            }
            if (result.length === 0) {
                return errorHandler(res, new Error('Not Found'), 404, 'Wishlist tidak ditemukan');
            }
            res.status(200).json({ 
                success: true, 
                message: 'Detail Wishlist', 
                data: result[0] 
            });
        });
    }

    store(req, res) {
        const validationErrors = validateCreateWishlist(req.body);
        if (validationErrors) {
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        const newWishlist = req.body;
        Wishlist.create(newWishlist, (err, result) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal membuat wishlist');
            }
            res.status(201).json({ 
                success: true, 
                message: 'Wishlist berhasil dibuat', 
                wishlistId: result.insertId 
            });
        });
    }

    destroy(req, res) {
        const id = req.params.id;
        
        const idError = validateId(id);
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        Wishlist.delete(id, (err, result) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal menghapus wishlist');
            }
            if (result.affectedRows === 0) {
                return errorHandler(res, new Error('Not Found'), 404, 'Wishlist tidak ditemukan');
            }
            res.status(200).json({ 
                success: true, 
                message: 'Wishlist berhasil dihapus' 
            });
        });
    }
}

module.exports = new WishlistController();