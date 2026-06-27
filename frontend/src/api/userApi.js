import http from "../utils/http.js";

export async function getUsers() {
    const response = await http.get("/user");
    return response.data.data || response.data;
}

export async function getUserById(id) {
    const response = await http.get(`/user/${id}`);
    return response.data.data;
}

export async function createUser(userData) {
    const response = await http.post("/user", userData);
    return response.data;
}

export async function updateUser(id, userData) {
    const response = await http.put(`/user/${id}`, userData);
    return response.data;
}

export async function deleteUser(id) {
    const response = await http.delete(`/user/${id}`);
    return response.data;
}