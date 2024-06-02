import http from '../config/http.common';

const get = () => {
  return http.get('/product', {});
};

const getById = (id) => {
  return http.get(`/product/${id}`, {});
};

const post = (data) => {
  const formDataToSend = new FormData();
  for (const [key, value] of Object.entries(data)) {
    let actualKey = key;
    if (value !== null && value !== undefined) {
      formDataToSend.append(actualKey, value);
    }
  }
  return http.post('/product', formDataToSend);
};

const patch = (id, data) => {
  return http.patch(`/product/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/product/${id}`);
};

const productServices = {
  get,
  getById,
  post,
  patch,
  remove,
};

export default productServices;
