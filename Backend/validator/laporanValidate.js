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

    if (!data.status) {
        return "Status wajib diisi";
    }

    const validStatuses = ['pending', 'diterima', 'ditolak'];
    
    if (!validStatuses.includes(data.status)) {
        return "Status tidak valid. Pilihan: pending, diterima, atau ditolak";
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