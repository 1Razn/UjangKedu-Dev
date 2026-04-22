function validateKomentar(data) {
    if (!data.komentar) return "komentar wajib diisi";
    if (!data.properti_id) return "properti_id wajib diisi";
    if (!data.user_id) return "user_id wajib diisi";

    if (data.properti_id && isNaN(data.properti_id)) return "properti_id harus angka";
    if (data.user_id && isNaN(data.user_id)) return "user_id harus angka";

    return null;
}

function validateId(id) {
    if (!id || isNaN(id)) return "id tidak valid";
    return null;
}

module.exports = { validateKomentar, validateId };