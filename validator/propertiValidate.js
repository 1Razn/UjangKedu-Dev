/**
 * Validator untuk tabel `properti`
 * Sesuai skema database botydb.sql
 */

function validateCreateProperti(data) {
    const errors = [];

    // 1. Judul (varchar(20))
    if (!data.judul || typeof data.judul !== 'string' || data.judul.trim() === '') {
        errors.push('Judul wajib diisi');
    } else if (data.judul.length > 30) {
        errors.push('Judul maksimal 30 karakter');
    }

    // 2. Deskripsi (text)
    if (!data.deskripsi || typeof data.deskripsi !== 'string' || data.deskripsi.trim() === '') {
        errors.push('Deskripsi wajib diisi');
    }

    // 3. Alamat (text)
    if (!data.alamat || typeof data.alamat !== 'string' || data.alamat.trim() === '') {
        errors.push('Alamat wajib diisi');
    }

    // 4. Luas Properti (char(10))
    if (!data.luas_properti) {
        errors.push('Luas properti wajib diisi');
    } else {
        const luas = Number(data.luas_properti);
        if (isNaN(luas) || luas <= 0) {
            errors.push('Luas properti harus berupa angka positif');
        } else if (String(data.luas_properti).length > 10) {
            errors.push('Luas properti maksimal 10 karakter');
        }
    }

    // 5. Harga (char(15))
    if (!data.harga) {
        errors.push('Harga wajib diisi');
    } else {
        const harga = Number(data.harga);
        if (isNaN(harga) || harga <= 0) {
            errors.push('Harga harus berupa angka positif');
        } else if (String(data.harga).length > 15) {
            errors.push('Harga maksimal 15 karakter');
        }
    }

    // 6. Tanggal Tayang (date)
    if (!data.tanggal_tayang) {
        errors.push('Tanggal tayang wajib diisi');
    } else if (!isValidDate(data.tanggal_tayang)) {
        errors.push('Format tanggal tayang tidak valid (YYYY-MM-DD)');
    }

    // 7. Tanggal Kadaluarsa (date)
    if (!data.tanggal_kadaluarsa) {
        errors.push('Tanggal kadaluarsa wajib diisi');
    } else if (!isValidDate(data.tanggal_kadaluarsa)) {
        errors.push('Format tanggal kadaluarsa tidak valid (YYYY-MM-DD)');
    } else if (data.tanggal_tayang && isValidDate(data.tanggal_tayang) && new Date(data.tanggal_kadaluarsa) <= new Date(data.tanggal_tayang)) {
        errors.push('Tanggal kadaluarsa harus lebih besar dari tanggal tayang');
    }

    // 8. Kategori Properti ID (int, FK)
    if (!data.kategori_properti_id) {
        errors.push('Kategori properti ID wajib diisi');
    } else {
        const katId = Number(data.kategori_properti_id);
        if (isNaN(katId) || katId <= 0 || !Number.isInteger(katId)) {
            errors.push('Kategori properti ID harus berupa angka positif');
        }
    }

    // 9. Paket Iklan ID (int, FK)
    if (!data.paket_iklan_id) {
        errors.push('Paket iklan ID wajib diisi');
    } else {
        const paketId = Number(data.paket_iklan_id);
        if (isNaN(paketId) || paketId <= 0 || !Number.isInteger(paketId)) {
            errors.push('Paket iklan ID harus berupa angka positif');
        }
    }

    // 10. User ID (int, FK)
    if (!data.user_id) {
        errors.push('User ID wajib diisi');
    } else {
        const userId = Number(data.user_id);
        if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
            errors.push('User ID harus berupa angka positif');
        }
    }

    return errors.length > 0 ? errors : null;
}

function validateUpdateProperti(data) {
    const errors = [];

    // Validasi partial update (hanya cek field yang dikirim)
    if (data.judul !== undefined) {
        if (typeof data.judul !== 'string' || data.judul.trim() === '' || data.judul.length > 20) {
            errors.push('Judul maksimal 20 karakter dan tidak boleh kosong');
        }
    }
    if (data.deskripsi !== undefined) {
        if (typeof data.deskripsi !== 'string' || data.deskripsi.trim() === '') {
            errors.push('Deskripsi tidak boleh kosong');
        }
    }
    if (data.alamat !== undefined) {
        if (typeof data.alamat !== 'string' || data.alamat.trim() === '') {
            errors.push('Alamat tidak boleh kosong');
        }
    }
    if (data.luas_properti !== undefined) {
        const luas = Number(data.luas_properti);
        if (isNaN(luas) || luas <= 0 || String(data.luas_properti).length > 10) {
            errors.push('Luas properti harus berupa angka positif maksimal 10 karakter');
        }
    }
    if (data.harga !== undefined) {
        const harga = Number(data.harga);
        if (isNaN(harga) || harga <= 0 || String(data.harga).length > 15) {
            errors.push('Harga harus berupa angka positif maksimal 15 karakter');
        }
    }
    if (data.tanggal_tayang !== undefined) {
        if (!isValidDate(data.tanggal_tayang)) {
            errors.push('Format tanggal tayang tidak valid (YYYY-MM-DD)');
        }
    }
    if (data.tanggal_kadaluarsa !== undefined) {
        if (!isValidDate(data.tanggal_kadaluarsa)) {
            errors.push('Format tanggal kadaluarsa tidak valid (YYYY-MM-DD)');
        } else if (data.tanggal_tayang && isValidDate(data.tanggal_tayang) && new Date(data.tanggal_kadaluarsa) <= new Date(data.tanggal_tayang)) {
            errors.push('Tanggal kadaluarsa harus lebih besar dari tanggal tayang');
        }
    }
    if (data.kategori_properti_id !== undefined) {
        const katId = Number(data.kategori_properti_id);
        if (isNaN(katId) || katId <= 0 || !Number.isInteger(katId)) {
            errors.push('Kategori properti ID harus berupa angka positif');
        }
    }
    if (data.paket_iklan_id !== undefined) {
        const paketId = Number(data.paket_iklan_id);
        if (isNaN(paketId) || paketId <= 0 || !Number.isInteger(paketId)) {
            errors.push('Paket iklan ID harus berupa angka positif');
        }
    }
    if (data.user_id !== undefined) {
        const userId = Number(data.user_id);
        if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
            errors.push('User ID harus berupa angka positif');
        }
    }

    return errors.length > 0 ? errors : null;
}

function validateId(id) {
    const numId = Number(id);
    if (!id || isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
        return 'ID harus berupa angka positif';
    }
    return null;
}

// Helper: Validasi format tanggal YYYY-MM-DD
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString === date.toISOString().split('T')[0];
}

module.exports = { validateCreateProperti, validateUpdateProperti, validateId };