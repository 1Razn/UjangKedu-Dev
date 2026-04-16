/**
 * Validator untuk tabel `paket_iklan`
 */

function validateCreatePaketIklan(data) {
    const errors = [];

    // 1. Nama Paket (varchar(50))
    if (!data.nama || typeof data.nama !== 'string' || data.nama.trim() === '') {
        errors.push('Nama paket wajib diisi');
    } else if (data.nama.length > 50) {
        errors.push('Nama paket maksimal 50 karakter');
    }

    // 2. Harga (int)
    if (!data.harga) {
        errors.push('Harga wajib diisi');
    } else {
        const harga = Number(data.harga);
        if (isNaN(harga) || harga <= 0) {
            errors.push('Harga harus berupa angka positif');
        }
    }

    // 3. Durasi (int - dalam hari)
    if (!data.durasi) {
        errors.push('Durasi wajib diisi');
    } else {
        const durasi = Number(data.durasi);
        if (isNaN(durasi) || durasi <= 0 || !Number.isInteger(durasi)) {
            errors.push('Durasi harus berupa angka positif dalam hari');
        }
    }

    // 4. Deskripsi (text) - optional
    if (data.deskripsi !== undefined && data.deskripsi !== null) {
        if (typeof data.deskripsi !== 'string') {
            errors.push('Deskripsi harus berupa teks');
        }
    }

    return errors.length > 0 ? errors : null;
}

function validateUpdatePaketIklan(data) {
    const errors = [];

    // Validasi partial update (hanya cek field yang dikirim)
    if (data.nama !== undefined) {
        if (typeof data.nama !== 'string' || data.nama.trim() === '' || data.nama.length > 50) {
            errors.push('Nama paket maksimal 50 karakter dan tidak boleh kosong');
        }
    }

    if (data.harga !== undefined) {
        const harga = Number(data.harga);
        if (isNaN(harga) || harga <= 0) {
            errors.push('Harga harus berupa angka positif');
        }
    }

    if (data.durasi !== undefined) {
        const durasi = Number(data.durasi);
        if (isNaN(durasi) || durasi <= 0 || !Number.isInteger(durasi)) {
            errors.push('Durasi harus berupa angka positif dalam hari');
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

module.exports = { validateCreatePaketIklan, validateUpdatePaketIklan, validateId };
