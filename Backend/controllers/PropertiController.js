const Properti = require('../models/properti');
const { validateCreateProperti, validateUpdateProperti, validateId } = require('../validator/propertiValidate');
const errorHandler = require('../utils/errorHandler');
const path = require('path');
const fs = require('fs');
const db = require('../config/database'); // Sesuaikan jika lokasi database config kamu beda

class PropertiController {
  index(req, res) {
    const query = `
      SELECT 
        p.id, 
        p.judul, 
        p.deskripsi, 
        p.alamat, 
        p.luas_properti, 
        p.harga, 
        p.tanggal_tayang, 
        p.tanggal_kadaluarsa, 
        p.kategori_properti_id,
        p.paket_iklan_id, 
        p.user_id, 
        p.foto_properti,
        k.nama_kategori AS category,  /* Ini kuncinya! */
        u.nama AS agent_name          /* Mengambil nama agen dari tabel user */
      FROM properti p
      LEFT JOIN kategori_properti k ON p.kategori_properti_id = k.id
      LEFT JOIN user u ON p.user_id = u.id
      ORDER BY p.tanggal_tayang DESC
    `;

    db.query(query, (err, result) => {
      if (err) return errorHandler(res, err, 500, 'Gagal mengambil data properti');
      res.status(200).json({
        success: true,
        message: 'Berhasil mengambil data properti',
        total: result.length,
        data: result
      });
    });
  }

  show(req, res) {
    const idError = validateId(req.params.id);
    if (idError) return errorHandler(res, new Error(idError), 400, idError);

    const query = `
      SELECT 
        p.id, p.judul, p.deskripsi, p.alamat, p.luas_properti, p.harga, 
        p.tanggal_tayang, p.tanggal_kadaluarsa, p.kategori_properti_id,
        p.paket_iklan_id, p.user_id, p.foto_properti,
        k.nama_kategori AS category,
        u.nama AS agent_name
      FROM properti p
      LEFT JOIN kategori_properti k ON p.kategori_properti_id = k.id
      LEFT JOIN user u ON p.user_id = u.id
      WHERE p.id = ?
    `;

    db.query(query, [req.params.id], (err, result) => {
      if (err) return errorHandler(res, err, 500, 'Gagal mengambil detail properti');
      if (result.length === 0) return errorHandler(res, new Error('Not Found'), 404, 'Properti tidak ditemukan');
      
      res.status(200).json({ 
        success: true, 
        message: 'Detail properti', 
        data: result[0] 
      });
    });
  }

  store(req, res) {
    const validationErrors = validateCreateProperti(req.body);
    if (validationErrors) {
      if (req.file) fs.unlinkSync(req.file.path);
      return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
    }

    const newProperti = { ...req.body };
    if (req.file) {
      newProperti.foto_properti = `uploads/properti/${req.file.filename}`;
    }

    Properti.create(newProperti, (err, result) => {
      if (err) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorHandler(res, err, 500, 'Gagal menambahkan properti');
      }
      res.status(201).json({
        success: true,
        message: 'Properti berhasil ditambahkan',
        data: { propertiId: result.insertId, foto_properti: newProperti.foto_properti || null }
      });
    });
  }

  update(req, res) {
    const idError = validateId(req.params.id);
    if (idError) {
      if (req.file) fs.unlinkSync(req.file.path);
      return errorHandler(res, new Error(idError), 400, idError);
    }

    const validationErrors = validateUpdateProperti(req.body);
    if (validationErrors) {
      if (req.file) fs.unlinkSync(req.file.path);
      return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
    }

    Properti.getById(req.params.id, (err, oldResult) => {
      if (err) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorHandler(res, err, 500, 'Gagal mengambil data properti');
      }
      if (oldResult.length === 0) {
        if (req.file) fs.unlinkSync(req.file.path);
        return errorHandler(res, new Error('Not Found'), 404, 'Properti tidak ditemukan');
      }

      const oldFoto = oldResult[0].foto_properti;
      const updateData = { ...req.body };
      updateData.foto_properti = req.file ? `uploads/properti/${req.file.filename}` : oldFoto;

      Properti.update(req.params.id, updateData, (err, result) => {
        if (err) {
          if (req.file) fs.unlinkSync(req.file.path);
          return errorHandler(res, err, 500, 'Gagal memperbarui properti');
        }
        if (result.affectedRows === 0) {
          if (req.file) fs.unlinkSync(req.file.path);
          return errorHandler(res, new Error('Not Found'), 404, 'Properti tidak ditemukan');
        }

        if (req.file && oldFoto) {
          const oldFilePath = path.join(__dirname, '..', oldFoto);
          if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }

        res.status(200).json({
          success: true,
          message: 'Properti berhasil diperbarui',
          data: { foto_properti: updateData.foto_properti }
        });
      });
    });
  }

  destroy(req, res) {
    const id = req.params.id;
    const idError = validateId(id);
    if (idError) return errorHandler(res, new Error(idError), 400, idError);

    db.query("DELETE FROM komentar WHERE properti_id = ?", [id], (errKomentar) => {
      if (errKomentar) {
        console.error("Gagal hapus komentar terkait:", errKomentar);
        return errorHandler(res, errKomentar, 500, 'Gagal menghapus komentar terkait properti');
      }

      db.query("DELETE FROM laporan WHERE properti_id = ?", [id], (errLaporan) => {
        if (errLaporan) {
          console.error("Gagal hapus laporan terkait:", errLaporan);
          return errorHandler(res, errLaporan, 500, 'Gagal menghapus laporan terkait properti');
        }

        Properti.delete(id, (err, result) => {
          if (err) return errorHandler(res, err, 500, 'Gagal menghapus properti');
          if (result.affectedRows === 0) return errorHandler(res, new Error('Not Found'), 404, 'Properti tidak ditemukan');
          
          res.status(200).json({ 
            success: true, 
            message: 'Properti beserta komentar dan laporan terkait berhasil diblokir & dihapus' 
          });
        });
      });
    });
  }
}

module.exports = new PropertiController();