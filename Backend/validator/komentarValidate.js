const db = require("../config/database");

function validateKomentar(data) {
    if (!data.komentar) return "komentar wajib diisi";
    if (!data.properti_id) return "properti_id wajib diisi";
    if (!data.user_id) return "user_id wajib diisi";
    if (data.properti_id && isNaN(data.properti_id)) return "properti_id harus angka";
    if (data.user_id && isNaN(data.user_id)) return "user_id harus angka";

    return null;
}

// Validasi async untuk mengecek keberadaan user dan properti di database
async function validateKomentarExistence(data) {
    const errors = [];

    // Cek apakah user exists
    if (data.user_id) {
        const userExists = await new Promise((resolve, reject) => {
            db.query("SELECT id FROM user WHERE id = ?", [data.user_id], (err, result) => {
                if (err) reject(err);
                resolve(result.length > 0);
            });
        });

        if (!userExists) {
            errors.push(`User dengan ID ${data.user_id} tidak ditemukan`);
        }
    }

    // Cek apakah properti exists
    if (data.properti_id) {
        const propertiExists = await new Promise((resolve, reject) => {
            db.query("SELECT id FROM properti WHERE id = ?", [data.properti_id], (err, result) => {
                if (err) reject(err);
                resolve(result.length > 0);
            });
        });

        if (!propertiExists) {
            errors.push(`Properti dengan ID ${data.properti_id} tidak ditemukan`);
        }
    }

    return errors.length > 0 ? errors : null;
}

function validateId(id) {
    if (!id || isNaN(id)) return "id tidak valid";
    return null;
}

module.exports = { validateKomentar, validateKomentarExistence, validateId };