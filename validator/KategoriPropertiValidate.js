/**
 * Validator untuk tabel `kategori_properti`
 */

function validateCreateKategoriProperti(data) {
    const errors = [];

    // 1. Nama Kategori (varchar(50))
    if (!data.nama || typeof data.nama !== 'string' || data.nama.trim() === '') {
        errors.push('Nama kategori wajib diisi');
    } else if (data.nama.length > 50) {
        errors.push('Nama kategori maksimal 50 karakter');
    }

    // 2. Deskripsi (text) - optional
    if (data.deskripsi !== undefined && data.deskripsi !== null) {
        if (typeof data.deskripsi !== 'string') {
            errors.push('Deskripsi harus berupa teks');
        }
    }

    return errors.length > 0 ? errors : null;
}

function validateUpdateKategoriProperti(data) {
    const errors = [];

    // Validasi partial update (hanya cek field yang dikirim)
    if (data.nama !== undefined) {
        if (typeof data.nama !== 'string' || data.nama.trim() === '' || data.nama.length > 50) {
            errors.push('Nama kategori maksimal 50 karakter dan tidak boleh kosong');
        }
    }

    if (data.deskripsi !== undefined && data.deskripsi !== null) {
        if (typeof data.deskripsi !== 'string') {
            errors.push('Deskripsi harus berupa teks');
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

module.exports = { validateCreateKategoriProperti, validateUpdateKategoriProperti, validateId };
