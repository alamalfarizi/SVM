import http from '../config/http.common';

const getAll = () => {
  return http.get(`/report`, {});
};

const getById = (id) => {
  return http.get(`/report/${id}`, {});
};

const put = (id, data) => {
  return http.put(`/report/${id}`, data);
};

const post = (data) => {
  return http.post(`/report/`, data);
};

const remove = (id) => {
  return http.delete(`/report/${id}`);
};

const postTikcket = (data) => {
  return http.post('/ticket', data);
};

const PengaduanService = {
  getAll,
  getById,
  put,
  post,
  remove,
  postTikcket
};

export default PengaduanService;
