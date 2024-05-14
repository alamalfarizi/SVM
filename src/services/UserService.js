import http from '../config/http.common';

const login = (data) => {
  return http.post('/auth/login', {
    username: data.email,
    password: data.password
  });
};

const getAll = () => {
  return http.get(`/users/`, {
    params: {
      limit: 2000,
      offset: 0
    }
  });
};

const get = (meta, search, filter) => {
  let params = {
    limit: meta.rowsPerPage,
    offset: meta.offset,
    keyword: search,
    role_user: filter.role_user,
    tanggal_awal_registrasi: filter.tanggal_awal_registrasi,
    tanggal_akhir_registrasi: filter.tanggal_akhir_registrasi
  };
  return http.get(`/users/`, {
    params: params
  });
};

const getById = (id) => {
  return http.get(`/users/${id}`, {});
};

const put = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const changeStatus = (id) => {
  return http.put(`/users/${id}/is-active`);
};

const reset = (id) => {
  return http.put(`/users/${id}/reset-password`);
};

const changePassword = (id, data) => {
  return http.put(`/users/${id}/change-password`, data);
};

const remove = (id) => {
  return http.delete(`/users/${id}`);
};

const UserService = {
  login,
  getAll,
  get,
  getById,
  put,
  changeStatus,
  reset,
  changePassword,
  remove
};

export default UserService;
