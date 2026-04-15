function validateCreateUser(data) {
    const errors = [];

    if (!data.nama || typeof data.nama !== 'string' || data.nama.trim() === '') {
        errors.push('Nama wajib diisi');
    } else if (data.nama.length > 30) {
        errors.push('Nama maksimal 30 karakter');
    }

    if (!data.no_hp) {
        errors.push('No HP wajib diisi');
    } else {
        const cleanPhone = String(data.no_hp).replace(/\D/g, '');
        if (cleanPhone.length > 14) {
            errors.push('No HP harus kurang dari 14 angka');
        }
    }

    if (!data.email) {
        errors.push('Email wajib diisi');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Format email tidak valid');
    } else if (data.email.length > 35) {
        errors.push('Email maksimal 35 karakter');
    }

    if (!data.password) {
        errors.push('Password wajib diisi');
    } else if (data.password.length < 6) {
        errors.push('Password minimal 6 karakter');
    } else if (data.password.length > 30) {
        errors.push('Password maksimal 30 karakter');
    }

    return errors.length > 0 ? errors : null;
}

function validateUpdateUser(data) {
    const errors = [];

    if (data.nama !== undefined) {
        if (typeof data.nama !== 'string' || data.nama.trim() === '' || data.nama.length > 30) {
            errors.push('Nama maksimal 30 karakter dan tidak boleh kosong');
        }
    }
    if (data.no_hp !== undefined) {
        const cleanPhone = String(data.no_hp).replace(/\D/g, '');
        if (cleanPhone.length > 14) errors.push('No HP harus kurang dari 14 angka');
    }
    if (data.email !== undefined) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 35) {
            errors.push('Format email tidak valid atau melebihi 35 karakter');
        }
    }
    if (data.password !== undefined) {
        if (data.password.length < 6 || data.password.length > 30) {
            errors.push('Password harus antara 6-30 karakter');
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

module.exports = { validateCreateUser, validateUpdateUser, validateId };