function validateRegister(data) {
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
        if (cleanPhone.length < 10 || cleanPhone.length > 13) {
            errors.push('No HP harus antara 10-13 angka');
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

    if (data.role && !['Admin', 'User'].includes(data.role)) {
        errors.push('Role harus Admin atau User');
    }

    return errors.length > 0 ? errors : null;
}

function validateLogin(data) {
    const errors = [];

    if (!data.email) {
        errors.push('Email wajib diisi');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Format email tidak valid');
    }

    if (!data.password) {
        errors.push('Password wajib diisi');
    }

    return errors.length > 0 ? errors : null;
}

module.exports = { validateRegister, validateLogin };