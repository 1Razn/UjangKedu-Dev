const Wishlist = require('../models/wishlist');
const { validateCreateWishlist, validateId } = require('../validator/wishlistValidate');
const errorHandler = require('../utils/errorHandler');

class WishlistController {
    index(req, res) {
        const user_id = req.user.id;
        
        console.log('📋 Fetching wishlist for user:', user_id);
        
        Wishlist.getByUserId(user_id, (err, result) => {
            if (err) {
                console.error('❌ Error:', err);
                return errorHandler(res, err, 500, 'Gagal mengambil data wishlist');
            }
            
            console.log('✅ Result:', result);
            
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

        const newWishlist = {
            ...req.body,
            user_id: req.user.id
        };

        Wishlist.create(newWishlist, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return errorHandler(res, err, 400, 'Properti sudah ada di wishlist');
                }
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
        const user_id = req.user.id;
        
        const idError = validateId(id);
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        Wishlist.delete(id, user_id, (err, result) => {
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

    checkStatus(req, res) {
        const { properti_id } = req.params;
        const user_id = req.user.id;

        const idError = validateId(properti_id);
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        Wishlist.checkByUserAndProperti(user_id, properti_id, (err, result) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal mengecek status wishlist');
            }

            res.status(200).json({
                success: true,
                data: {
                    isWishlisted: result.length > 0,
                    wishlistId: result.length > 0 ? result[0].id : null
                }
            });
        });
    }
}

module.exports = new WishlistController();