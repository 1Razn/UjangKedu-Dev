const Komentar = require("../models/komentar");
const { validateKomentar, validateId } = require("../validator/komentarValidate");

class KomentarController {
    index(req, res) {
        Komentar.getAll((err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal mengambil data' }); 
            } else {
                return res.status(200).json({ message: 'Berhasil mengambil data', data: result }); 
            }
        });
    }

    show(req, res) {
        const { id } = req.params;
        
        const idError = validateId(id); 
        if (idError) {
            return res.status(400).json({ success: false, error: idError }); 
        }

        Komentar.getById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Gagal mengambil data' }); 
            }
            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'Komentar tidak ditemukan' }); 
            }
            res.status(200).json({ message: 'Detail Komentar', data: result[0] }); 
        });
    }

    show(req, res) {
        const id = req.params.id;
        Komentar.getById(id, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    }

    store(req, res) {
        const validationErrors = validateKomentar(req.body); 
        if (validationErrors) {
            return res.status(400).json({ success: false, errors: validationErrors }); 
        }

        const newKomentar = req.body;
        Komentar.create(newKomentar, (err, result) => {
            if (err) return res.status(500).json({ success: false, error: err.message });
            res.status(201).json({ success: true, message: 'Komentar berhasil dibuat', komentarId: result.insertId }); 
        });
    }

    destroy(req, res) {
        const idError = validateId(req.params.id); 
        if (idError) {
            return res.status(400).json({ success: false, error: idError }); 
        }

        Komentar.delete(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ success: false, error: err.message }); 
            if (result.affectedRows === 0) return res.status(404).json({ success: false, error: 'Komentar tidak ditemukan' });
            res.status(200).json({ success: true, message: 'Komentar berhasil dihapus' }); 
        });
    }
}

const object = new KomentarController(); 
module.exports = object; 