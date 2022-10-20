import { http } from "../http";

export const getAllusers = () => {
  return http.get("/users");
};

export const getUser = (id) => {
  return http.get(`/users/${id}`);
};

export const createUser = (data) => {
  return http.post("/users", data);
};

export const updateUser = (id, data) => {
  return http.put(`/users/${id}`, data);
};

export const removeUser = (id) => {
  return http.delete(`/users/${id}`);
};

export const loginUser = (data) => {
  return http.post(`/login`, data);
};
