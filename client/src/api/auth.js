import api from "./axiosClient";

export const register = async (username, password) => {
  const res = await api.post("/auth/register", { username, password });
  return res.data;
};

export const login = async (username, password) => {
  const res = await api.post("/auth/login", { username, password });
  return res.data; // { token, username }
};
