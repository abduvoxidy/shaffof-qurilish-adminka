import request from "./axios";

export const fetchUsers = (params) =>
  request({ method: "get", url: "/users", params });

export const deleteUser = (id) =>
  request({ method: "delete", url: `/users/${id}` });

export const postUser = (data, params) =>
  request({ method: "post", url: "/users", data, params });

export const updateUser = (id, data, params) =>
  request({ method: "put", url: `/users/${id}`, data, params });

export const fetchOneUser = (id, params) =>
  request({ method: "get", url: `/users/${id}`, params });
