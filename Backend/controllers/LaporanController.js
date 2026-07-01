const Laporan = require('../models/laporan');
const { validateLaporan, validateId } = require('../validator/laporanValidate');
const errorHandler = require('../utils/errorHandler');
const db = require('../config/database');

class LaporanController {
	index(req, res) {
		Laporan.getAll((err, results) => {
			if (err) return errorHandler(res, err, 500, "Gagal ambil data");
			res.json({
				success: true,
				message: "Daftar Laporan",
				data: results
			});
		});
	}

	show(req, res) {
		const id = req.params.id;
		const error = validateId(id);
		if (error) return errorHandler(res, new Error(error), 400, error);

		Laporan.getById(id, (err, results) => {
			if (err) return errorHandler(res, err, 500, "Terjadi kesalahan database");
			if (!results || results.length === 0) {
				return errorHandler(res, new Error("Not Found"), 404, "Data tidak ditemukan");
			}
			res.json({
				success: true,
				message: "Detail Laporan",
				data: results[0]
			});
		});
	}

	store(req, res) {
		const data = req.body;
		const error = validateLaporan(data);
		if (error) return errorHandler(res, new Error(error), 400, error);

		Laporan.create(data, (err, results) => {
			if (err) return errorHandler(res, err, 500, "Gagal tambah data");
			res.status(201).json({
				success: true,
				message: 'Laporan berhasil ditambahkan',
				data: data
			});
		});
	}

	destroy(req, res) {
		const id = req.params.id;
		const error = validateId(id);
		if (error) return errorHandler(res, new Error(error), 400, error);

		Laporan.delete(id, (err, results) => {
			if (err) return errorHandler(res, err, 500, "Gagal hapus data");
			if (results.affectedRows === 0) {
				return errorHandler(res, new Error("Not Found"), 404, "Data tidak ditemukan");
			}
			res.json({
				success: true,
				message: 'Laporan berhasil dihapus'
			});
		});
	}

	updateStatusLaporan(req, res) {
		const id = req.params.id;
		const { status } = req.body;

		const validStatuses = ['pending', 'diterima', 'ditolak'];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({ error: 'Status tidak valid' });
		}

		const query = 'UPDATE laporan SET status = ? WHERE id = ?';
		db.query(query, [status, id], (err, result) => {
			if (err) {
				console.error('Error saat update status laporan:', err);
				return res.status(500).json({ error: 'Gagal update status laporan' });
			}
			if (result.affectedRows === 0) {
				return res.status(404).json({ error: 'Laporan tidak ditemukan' });
			}
			res.status(200).json({ message: 'Status laporan berhasil diupdate!' });
		});
	}
}

module.exports = new LaporanController();