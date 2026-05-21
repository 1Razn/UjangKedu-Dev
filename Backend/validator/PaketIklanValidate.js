function validateCreatePaketIklan(data) {
    const errors = [];

    if (!data.nama_paket || typeof data.nama_paket !== 'string' || data.nama_paket.trim() === '') {
        errors.push('Nama paket wajib diisi');
    } else if (data.nama_paket.length > 20) {
        errors.push('Nama paket maksimal 20 karakter');
    }

    if (!data.durasi_iklan || typeof data.durasi_iklan !== 'string' || data.durasi_iklan.trim() === '') {
        errors.push('Durasi iklan wajib diisi');
    } else if (data.durasi_iklan.length > 10) {
        errors.push('Durasi iklan maksimal 10 karakter');
    }

    if (!data.harga) {
        errors.push('Harga wajib diisi');
    } else {
        const harga = Number(data.harga);
        if (isNaN(harga) || harga <= 0) {
            errors.push('Harga harus berupa angka positif');
        }
    }

    if (data.deskripsi !== undefined && data.deskripsi !== null) {
        if (typeof data.deskripsi !== 'string') {
            errors.push('Deskripsi harus berupa teks');
        } else if (data.deskripsi.length > 50) {
            errors.push('Deskripsi maksimal 50 karakter');
        }
    }

    return errors.length > 0 ? errors : null;
}

function validateUpdatePaketIklan(data) {
    const errors = [];
    // Sama seperti create, tapi partial update
    if (data.nama_paket !== undefined) {
        if (typeof data.nama_paket !== 'string' || data.nama_paket.trim() === '' || data.nama_paket.length > 20) {
            errors.push('Nama paket maksimal 20 karakter dan tidak boleh kosong');
        }
    }
    if (data.durasi_iklan !== undefined) {
        if (typeof data.durasi_iklan !== 'string' || data.durasi_iklan.trim() === '' || data.durasi_iklan.length > 10) {
            errors.push('Durasi iklan maksimal 10 karakter dan tidak boleh kosong');
        }
    }
    if (data.harga !== undefined) {
        const harga = Number(data.harga);
        if (isNaN(harga) || harga <= 0) {
            errors.push('Harga harus berupa angka positif');
        }
    }
    if (data.deskripsi !== undefined && data.deskripsi !== null) {
        if (typeof data.deskripsi !== 'string' || data.deskripsi.length > 50) {
            errors.push('Deskripsi harus berupa teks dan maksimal 50 karakter');
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