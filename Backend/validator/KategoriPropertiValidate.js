function validateCreateKategoriProperti(data) {
    const errors = [];

    if (!data.nama_kategori || typeof data.nama_kategori !== 'string' || data.nama_kategori.trim() === '') {
        errors.push('Nama kategori wajib diisi');
    } else if (data.nama_kategori.length > 30) {
        errors.push('Nama kategori maksimal 30 karakter');
    }

    return errors.length > 0 ? errors : null;
}

function validateUpdateKategoriProperti(data) {
    const errors = [];

    if (data.nama_kategori !== undefined) {
        if (typeof data.nama_kategori !== 'string' || data.nama_kategori.trim() === '' || data.nama_kategori.length > 30) {
            errors.push('Nama kategori maksimal 30 karakter dan tidak boleh kosong');
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