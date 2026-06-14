import http from "../utils/http.js";

// 1. Mengambil semua data user
export async function getUsers() {
    const response = await http.get("/user");
    return response.data.data || response.data;
}

// 2. Mengambil detail user berdasarkan ID
export async function getUserById(id) {
    const response = await http.get(`/user/${id}`);
    return response.data.data;
}

// 3. Menambahkan user baru
export async function createUser(userData) {
    const response = await http.post("/user", userData);
    return response.data;
}

// 4. Memperbarui data user (misal: ganti foto profil atau nama)
export async function updateUser(id, userData) {
    const response = await http.put(`/user/${id}`, userData);
    return response.data;
}

// 5. Menghapus user
export async function deleteUser(id) {
    const response = await http.delete(`/user/${id}`);
    return response.data;
}