import http from "../http-common";
class ExampleDataService {
  getAll() {
    return http.get("/examples");
  }
  get(id) {
    return http.get(`/examples/${id}`);
  }
  create(data) {
    return http.post("/examples", data);
  }
  update(id, data) {
    return http.put(`/examples/${id}`, data);
  }
  delete(id) {
    return http.delete(`/examples/${id}`);
  }
  deleteAll() {
    return http.delete(`/examples`);
  }
  findByTitle(title) {
    return http.get(`/examples?title=${title}`);
  }
}
export default new ExampleDataService();
