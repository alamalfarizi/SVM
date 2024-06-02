import http from '../config/http.common';

const login = (data) => {
  return http.post('/user/login', {
    username: data.email,
    password: data.password
  });
};

const UserService = {
  login
};

export default UserService;
