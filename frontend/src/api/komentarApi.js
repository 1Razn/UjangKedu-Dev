import http from "../utils/http";

export function getKomentar() {
  return http.get("/komentar");
}

export function createKomentar(data, token) {
  return http.post(
    "/komentar",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}