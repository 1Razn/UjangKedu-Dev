import http from "../utils/http.js";

// 1. Mengambil semua paket iklan
export async function getPackages() {
  try {
    const response = await http.get("/iklan");
    return response.data.data || response.data || [];
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
}

// 2. Mengambil detail paket berdasarkan ID
export async function getPackageById(id) {
  try {
    const response = await http.get(`/iklan/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching package:", error);
    throw error;
  }
}

// 3. Menambahkan paket iklan baru (Admin only)
export async function createPackage(packageData) {
  try {
    const response = await http.post("/iklan", packageData);
    return response.data;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
}

// 4. Memperbarui paket iklan (Admin only)
export async function updatePackage(id, packageData) {
  try {
    const response = await http.put(`/iklan/${id}`, packageData);
    return response.data;
  } catch (error) {
    console.error("Error updating package:", error);
    throw error;
  }
}

// 5. Menghapus paket iklan (Admin only)
export async function deletePackage(id) {
  try {
    const response = await http.delete(`/iklan/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
}