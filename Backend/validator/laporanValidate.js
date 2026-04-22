function validateLaporan(data) {
    if (!data.keterangan || data.keterangan.trim() === "") {
        return "Keterangan wajib diisi";
    }

    if (!data.user_id || isNaN(data.user_id)) {
        return "User ID pelapor tidak valid atau wajib diisi";
    }

    if (!data.properti_id || isNaN(data.properti_id)) {
        return "Properti ID tidak valid atau wajib diisi";
    }

    if (!data.status || isNaN(data.status)) {
        return "Status tidak valid atau wajib diisi";
    }

    return null;
}

function validateId(id) {
    if (!id || isNaN(id)) {
        return "ID tidak valid"; 
    }
    return null; 
}

module.exports = { validateLaporan, validateId }; 