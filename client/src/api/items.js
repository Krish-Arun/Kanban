import api from "./axiosClient";

const API = "http://localhost:5000/items";

// GET all items
export const getAllItems = async () => {
  const res = await api.get(API);
  return res.data;
};

// GET a single item
export const getItem = async (id) => {
  const res = await api.get(`${API}/${id}`);
  return res.data;
};

// POST new item
export const addItem = async (itemData) => {
  const res = await api.post(API, itemData);
  return res.data;
};

// POST review (⭐ NEW)
export const addReview = async (id, data) => {
  const res = await api.post(`${API}/${id}/review`, data);
  return res.data;
};
