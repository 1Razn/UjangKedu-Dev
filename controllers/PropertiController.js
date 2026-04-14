const Properti = require('../models/properti');

class PropertiController {

    index(req, res) {
        Properti.getWithRelation((err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Gagal mengambil data properti',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Berhasil mengambil data properti',
                total: result.length,
                data: result
            });
        });
    }

    show(req, res) {
        const { id } = req.params;

        Properti.getById(id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Gagal mengambil detail properti',
                    error: err
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Properti tidak ditemukan'
                });
            }

            res.status(200).json({
                message: 'Detail properti',
                data: result[0]
            });
        });
    }

    store(req, res) {
        const data = req.body;

        // validasi sederhana
        if (!data.judul || !data.harga || !data.user_id) {
            return res.status(400).json({
                message: 'Judul, harga, dan user_id wajib diisi'
            });
        }

        Properti.create(data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Gagal menambahkan properti',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Properti berhasil ditambahkan',
                insertId: result.insertId,
                data: data
            });
        });
    }

    update(req, res) {
        const { id } = req.params;
        const data = req.body;

        Properti.getById(id, (err, result) => {
            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Properti tidak ditemukan'
                });
            }

            Properti.update(id, data, (errUpdate) => {
                if (errUpdate) {
                    return res.status(500).json({
                        message: 'Gagal update properti',
                        error: errUpdate
                    });
                }

                res.status(200).json({
                    message: 'Properti berhasil diupdate'
                });
            });
        });
    }

    destroy(req, res) {
        const { id } = req.params;

        Properti.getById(id, (err, result) => {
            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Properti tidak ditemukan'
                });
            }

            Properti.delete(id, (errDelete) => {
                if (errDelete) {
                    return res.status(500).json({
                        message: 'Gagal menghapus properti',
                        error: errDelete
                    });
                }

                res.status(200).json({
                    message: 'Properti berhasil dihapus'
                });
            });
        });
    }

}

module.exports = new PropertiController();