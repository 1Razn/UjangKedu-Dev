import http from "../utils/http.js";

// Mengambil semua kategori properti
export async function getCategories() {
  const response = await http.get("/kategori");
  return response.data.data || response.data;
}

// Mengambil detail kategori berdasarkan ID
export async function getCategoryById(id) {
  const response = await http.get(`/kategori/${id}`);
  return response.data.data;
}

// Menambahkan kategori baru (Admin only)
export async function createCategory(categoryData) {
  const response = await http.post("/kategori", categoryData);
  return response.data;
}

// Memperbarui kategori (Admin only)
export async function updateCategory(id, categoryData) {
  const response = await http.put(`/kategori/${id}`, categoryData);
  return response.data;
}

// Menghapus kategori (Admin only)
export async function deleteCategory(id) {
  const response = await http.delete(`/kategori/${id}`);
  return response.data;
}