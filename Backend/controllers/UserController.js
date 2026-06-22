const bcrypt = require('bcrypt');
const User = require('../models/user');
const db = require('../config/database');
const { validateCreateUser, validateUpdateUser, validateId } = require('../validator/userValidate');
const errorHandler = require('../utils/errorHandler');
const path = require('path');
const fs = require('fs');

class UserController {
	index(req, res) {
		User.getAll((err, result) => {
			if (err) return errorHandler(res, err, 500, 'Gagal mengambil data user');
			res.status(200).json({
				success: true,
				message: 'Berhasil mengambil data user',
				data: result
			});
		});
	}

	show(req, res) {
		const { id } = req.params;

		const idError = validateId(id);
		if (idError) return errorHandler(res, new Error(idError), 400, idError);

		User.getById(id, (err, result) => {
			if (err) return errorHandler(res, err, 500, 'Gagal mengambil data user');
			if (result.length === 0) return errorHandler(res, new Error('Not Found'), 404, 'User tidak ditemukan');

			res.status(200).json({
				message: 'Detail User',
				data: result[0]
			});
		});
	}

	store(req, res) {
		const validationErrors = validateCreateUser(req.body);
		if (validationErrors) {
			if (req.file) fs.unlinkSync(req.file.path);
			return errorHandler(res, new Error(validationErrors.join(', ')), 400, validationErrors.join(', '));
		}

		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

		const newUser = {
			...req.body,
			password: hashedPassword
		};

		if (req.file) {
			newUser.foto_profil = req.file.filename;
		}

		User.create(newUser, (err, result) => {
			if (err) {
				if (req.file) fs.unlinkSync(req.file.path);
				return errorHandler(res, err, 500, 'Gagal membuat user');
			}
			res.status(201).json({
				success: true,
				message: 'User berhasil dibuat',
				data: { id: result.insertId, foto_profil: newUser.foto_profil || null }
			});
		});
	}

	update(req, res) {
		const idError = validateId(req.params.id);
		if (idError) return errorHandler(res, new Error(idError), 400, idError);

		const validationError = validateUpdateUser(req.body);
		if (validationError) {
			if (req.file) fs.unlinkSync(req.file.path);
			return errorHandler(res, new Error(validationError.join(', ')), 400, validationError.join(', '));
		}

		User.getById(req.params.id, (err, oldUserResult) => {
			if (err) return errorHandler(res, err, 500, 'Gagal mengambil data user');
			if (oldUserResult.length === 0) {
				if (req.file) fs.unlinkSync(req.file.path);
				return errorHandler(res, new Error('Not Found'), 404, 'User tidak ditemukan');
			}

			const oldFoto = oldUserResult[0].foto_profil;
			const updateData = { ...req.body };

			if (req.body.password && req.body.password.trim() !== '') {
				const saltRounds = 10;
				updateData.password = bcrypt.hashSync(req.body.password, saltRounds);
			} else {
				delete updateData.password;
			}

			if (req.file) {
				updateData.foto_profil = req.file.filename;

				if (oldFoto) {
					const oldFilePath = path.join(__dirname, '..', 'uploads', 'profile', oldFoto);
					if (fs.existsSync(oldFilePath)) {
						fs.unlinkSync(oldFilePath);
					}
				}
			}

			User.update(req.params.id, updateData, (err, result) => {
				if (err) {
					if (req.file) fs.unlinkSync(req.file.path);
					return errorHandler(res, err, 500, 'Gagal memperbarui user');
				}
				if (result.affectedRows === 0) {
					if (req.file) fs.unlinkSync(req.file.path);
					return errorHandler(res, new Error('Not Found'), 404, 'User tidak ditemukan');
				}

				res.status(200).json({
					success: true,
					message: 'Data user berhasil diperbarui',
					data: { foto_profil: updateData.foto_profil }
				});
			});
		});
	}

	destroy(req, res) {
		const idError = validateId(req.params.id);
		if (idError) return errorHandler(res, new Error(idError), 400, idError);

		const userId = req.params.id;

		User.getById(userId, (err, userResult) => {
			if (err) return errorHandler(res, err, 500, 'Gagal mengambil data user');
			if (userResult.length === 0) {
				return errorHandler(res, new Error('Not Found'), 404, 'User tidak ditemukan');
			}

			const userFoto = userResult[0].foto_profil;

			const deleteRelatedData = async () => {
				try {
					await executeQuery('DELETE FROM wishlist WHERE user_id = ?', [userId]);

					await executeQuery('DELETE FROM komentar WHERE user_id = ?', [userId]);

					await executeQuery('DELETE FROM laporan WHERE user_id = ?', [userId]);

					await executeQuery('DELETE FROM properti WHERE user_id = ?', [userId]);

					await executeQuery('DELETE FROM user WHERE id = ?', [userId]);

					if (userFoto) {
						const fotoPath = path.join(__dirname, '..', 'uploads', 'profile', userFoto);
						if (fs.existsSync(fotoPath)) {
							try {
								fs.unlinkSync(fotoPath);
							} catch (e) {
								console.warn('⚠️ Gagal hapus foto:', e.message);
							}
						}
					}

					res.status(200).json({
						success: true,
						message: 'User dan semua data terkait berhasil dihapus'
					});
				} catch (err) {
					console.error('❌ Error deleting user:', err);
					return errorHandler(res, err, 500, 'Gagal menghapus user: ' + err.message);
				}
			};

			deleteRelatedData();
		});
	}
}

function executeQuery(query, params) {
	return new Promise((resolve, reject) => {
		db.execute(query, params, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

module.exports = new UserController();