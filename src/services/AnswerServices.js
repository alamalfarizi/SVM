import http from '../config/http.common';


const put = (id, data) => {
  return http.put(`/answer/${id}`, data);
};

const post = (data) => {
  return http.post(`/answer/`, data);
};

const remove = (id) => {
  return http.delete(`/answer/${id}`);
};

const AnswerService = {
  put,
  post,
  remove
};

export default AnswerService;
