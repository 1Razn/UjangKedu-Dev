import http from "../utils/http";

export function getKomentar() {
  return http.get("/komentar");
}