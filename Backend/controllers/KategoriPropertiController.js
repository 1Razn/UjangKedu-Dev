const KategoriProperti = require('../models/kategori_properti');
const { validateCreateKategoriProperti, validateUpdateKategoriProperti, validateId } = require('../validator/KategoriPropertiValidate');
const errorHandler = require('../utils/errorHandler');

class KategoriPropertiController {
    index(req, res) {
        KategoriProperti.getAll((err, results) => {
            if (err) {
                return errorHandler(res, err, 500, "Gagal ambil data");
            }
            res.status(200).json({ 
                success: true, 
                message: "Daftar Kategori Properti", 
                total: results.length, 
                data: results 
            });
        });
    }

    show(req, res) {
        const idError = validateId(req.params.id);
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        KategoriProperti.getById(req.params.id, (err, results) => {
            if (err) {
                return errorHandler(res, err, 500, "Gagal ambil data");
            }
            if (results.length === 0) {
                return errorHandler(res, new Error("Not Found"), 404, "Kategori Properti tidak ditemukan");
            }
            res.status(200).json({ 
                success: true, 
                message: "Detail Kategori Properti", 
                data: results[0] 
            });
        });
    }

    store(req, res) {
        const validationErrors = validateCreateKategoriProperti(req.body);
        if (validationErrors) {
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        KategoriProperti.create(req.body, (err, results) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal menambahkan kategori properti');
            }
            res.status(201).json({ 
                success: true, 
                message: 'Kategori properti berhasil ditambahkan', 
                kategoriId: results.insertId 
            });
        });
    }

    update(req, res) {
        const idError = validateId(req.params.id);
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        const validationErrors = validateUpdateKategoriProperti(req.body);
        if (validationErrors) {
            return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
        }

        KategoriProperti.update(req.params.id, req.body, (err, results) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal update kategori properti');
            }
            if (results.affectedRows === 0) {
                return errorHandler(res, new Error("Not Found"), 404, 'Kategori Properti tidak ditemukan');
            }
            res.status(200).json({ 
                success: true, 
                message: 'Kategori properti berhasil diupdate' 
            });
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id);
        if (idError) {
            return errorHandler(res, new Error(idError), 400, idError);
        }

        KategoriProperti.delete(req.params.id, (err, results) => {
            if (err) {
                return errorHandler(res, err, 500, 'Gagal menghapus kategori properti');
            }
            if (results.affectedRows === 0) {
                return errorHandler(res, new Error("Not Found"), 404, 'Kategori Properti tidak ditemukan');
            }
            res.status(200).json({ 
                success: true, 
                message: 'Kategori properti berhasil dihapus' 
            });
        });
    }
}

module.exports = new KategoriPropertiController();