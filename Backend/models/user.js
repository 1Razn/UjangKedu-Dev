const db = require('../config/database');

class User {
    static getAll(callback) {
        const query = 'SELECT id, nama, email, no_hp, role, foto_profil FROM user';
        db.execute(query, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    static getById(id, callback) {
        const query = 'SELECT id, nama, email, no_hp, role, foto_profil FROM user WHERE id = ?';
        db.execute(query, [id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    static create(data, callback) {
        const query = `
            INSERT INTO user (nama, email, no_hp, password, role, foto_profil) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.nama,
            data.email,
            data.no_hp,
            data.password,
            data.role || 'User',
            data.foto_profil || null
        ];
        db.execute(query, values, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    static update(id, data, callback) {
        const fields = [];
        const values = [];

        if (data.nama !== undefined) { fields.push('nama = ?'); values.push(data.nama); }
        if (data.email !== undefined) { fields.push('email = ?'); values.push(data.email); }
        if (data.no_hp !== undefined) { fields.push('no_hp = ?'); values.push(data.no_hp); }
        if (data.password !== undefined) { fields.push('password = ?'); values.push(data.password); }
        if (data.role !== undefined) { fields.push('role = ?'); values.push(data.role); }
        if (data.foto_profil !== undefined) { fields.push('foto_profil = ?'); values.push(data.foto_profil); }

        if (fields.length === 0) return callback(null, { affectedRows: 0 });

        values.push(id);
        const query = `UPDATE user SET ${fields.join(', ')} WHERE id = ?`;
        
        db.execute(query, values, (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }

    // ✅ PERBAIKAN: Hapus data terkait dulu, baru hapus user
    static delete(id, callback) {
        // Mulai transaksi
        db.getConnection((err, connection) => {
            if (err) return callback(err, null);

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callback(err, null);
                }

                // ✅ Langkah 1: Hapus wishlist user
                connection.execute('DELETE FROM wishlist WHERE user_id = ?', [id], (err) => {
                    if (err) {
                        connection.rollback(() => {
                            connection.release();
                            callback(err, null);
                        });
                        return;
                    }

                    // ✅ Langkah 2: Hapus komentar user
                    connection.execute('DELETE FROM komentar WHERE user_id = ?', [id], (err) => {
                        if (err) {
                            connection.rollback(() => {
                                connection.release();
                                callback(err, null);
                            });
                            return;
                        }

                        // ✅ Langkah 3: Hapus properti user (jika ada)
                        connection.execute('DELETE FROM properti WHERE user_id = ?', [id], (err) => {
                            if (err) {
                                connection.rollback(() => {
                                    connection.release();
                                    callback(err, null);
                                });
                                return;
                            }

                            // ✅ Langkah 4: Hapus user
                            connection.execute('DELETE FROM user WHERE id = ?', [id], (err, result) => {
                                if (err) {
                                    connection.rollback(() => {
                                        connection.release();
                                        callback(err, null);
                                    });
                                    return;
                                }

                                // Commit transaksi
                                connection.commit((err) => {
                                    connection.release();
                                    if (err) return callback(err, null);
                                    callback(null, result);
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}

module.exports = User;