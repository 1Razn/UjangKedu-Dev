import http from "../utils/http.js";

export async function getWishlist() {
    const response = await http.get("/wishlist");
    return response.data;
}

export async function addToWishlist(propertiId) {
    const response = await http.post("/wishlist", {
        properti_id: propertiId
    });
    return response.data;
}

export async function removeFromWishlist(wishlistId) {
    const response = await http.delete(`/wishlist/${wishlistId}`);
    return response.data;
}

export async function checkWishlistStatus(propertiId) {
    const response = await http.get(`/wishlist/check/${propertiId}`);
    return response.data;
}