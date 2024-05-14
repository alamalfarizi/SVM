import http from '../config/http.common';

const get = () => {
  return http.get(`/setting-aplikasi/`);
};

const getById = (id) => {
  return http.get(`/setting-aplikasi/${id}`);
};

const post = (data) => {
  const formDataToSend = new FormData(); 
  for (const [key, value] of Object.entries(data)) {
    let actualKey = key;
    if (value !== null && value !== undefined) {
      formDataToSend.append(actualKey, value);
    }
  }

  return http.post(`/setting-aplikasi/`, formDataToSend);
};

const put = (id, data) => {
  const formDataToSend = new FormData(); 
  for (const [key, value] of Object.entries(data)) {
    let actualKey = key;
    if (value !== null && value !== undefined) {
      formDataToSend.append(actualKey, value);
    }
  }
  return http.put(`/setting-aplikasi/${id}`, formDataToSend);
};

const remove = (id) => {
  return http.delete(`/setting-aplikasi/${id}`);
};

const ApplicationService = {
  get,
  getById,
  post,
  put,
  remove
};

export default ApplicationService;
