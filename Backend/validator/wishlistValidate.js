function validateCreateWishlist(data) {
    const errors = [];

    if (!data.user_id) {
        errors.push('User ID wajib diisi');
    } else {
        const userId = Number(data.user_id);
        if (isNaN(userId) || userId <= 0 || !Number.isInteger(userId)) {
            errors.push('User ID harus berupa angka positif');
        }
    }

    if (!data.properti_id) {
        errors.push('Properti ID wajib diisi');
    } else {
        const propertiId = Number(data.properti_id);
        if (isNaN(propertiId) || propertiId <= 0 || !Number.isInteger(propertiId)) {
            errors.push('Properti ID harus berupa angka positif');
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

module.exports = { validateCreateWishlist, validateId };