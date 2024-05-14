import http from '../config/http.common';

const get = () => {
  return http.get(`/article/`);
};

const getById = (id) => {
  return http.get(`/article/${id}`);
};

const post = (data) => {
  return http.post(`/article`, data);
};

const put = (id, data) => {
  return http.put(`/article/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/article/${id}`);
};

const articleService = {
  get,
  getById,
  post,
  put,
  remove
};

export default articleService;
