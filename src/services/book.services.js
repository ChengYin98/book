import http from "../http-common";

class BookDataService {
  getAll() {
    return http.get("/books");
  }

  get(id) {
    return http.get(`/book/${id}`);
  }

  create(data) {
    return http.post("/book", data);
  }

  update(id, data) {
    return http.put(`/book/${id}`, data);
  }

  delete(id) {
    return http.delete(`/book/${id}`);
  }

  deleteAll() {
    return http.delete(`/book`);
  }

  findByName(name) {
    return http.get(`/books?name=${name}`);
  }
}

export default new BookDataService();