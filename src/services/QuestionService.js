import http from '../config/http.common';

const getAll = () => {
  return http.get(`/question`, {});
};

const getById = (id) => {
  return http.get(`/question/${id}`, {});
};

const put = (id, data) => {
  return http.put(`/question/${id}`, data);
};

const post = (data) => {
  return http.post(`/question/`, data);
};

const remove = (id) => {
  return http.delete(`/question/${id}`);
};

const QuestionService = {
  getAll,
  getById,
  put,
  post,
  remove
};

export default QuestionService;
