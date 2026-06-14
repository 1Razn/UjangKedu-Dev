import http from "../utils/http.js";

// Login
export async function login(email, password) {
    const response = await http.post("/auth/login", { email, password });
    return response.data;
}

// Register
export async function register(userData) {
    const response = await http.post("/auth/register", userData);
    return response.data;
}

// Get Profile (butuh token)
export async function getProfile() {
    const response = await http.get("/auth/profile");
    return response.data;
}

// Logout (hapus token lokal)
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
}