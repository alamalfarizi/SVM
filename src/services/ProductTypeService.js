import http from '../config/http.common';

const get = () => {
  return http.get('/productType', {});
};

const getId = (id) => {
  return http.get(`/productType/${id}`, {});
};

const post = (data) => {
  const formDataToSend = new FormData();
  for (const [key, value] of Object.entries(data)) {
    let actualKey = key;
    if (value !== null && value !== undefined) {
      formDataToSend.append(actualKey, value);
    }
  }
  return http.post('/productType', formDataToSend);
};

const patch = (id, data) => {
  return http.patch(`/productType/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/productType/${id}`);
};

const ProductTypeService = {
  get,
  getId,
  post,
  patch,
  remove,
};

export default ProductTypeService;
