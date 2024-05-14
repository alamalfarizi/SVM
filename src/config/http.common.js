import axios from 'axios';
import { API_URL } from '../shared/constant';

const http = axios.create({
  baseURL: API_URL,
  headers: { 'Access-Control-Allow-Origin': '*' }
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    console.log(`here Success ${res.data.message}`, res);
    return res;
  },
  async (err) => {
    if (err.response.status === 403) {
      console.log('here error', err);
    }
    return Promise.reject(err);
  }
);

export default http;
