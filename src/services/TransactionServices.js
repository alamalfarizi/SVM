import http from '../config/http.common';

const get = () => {
  return http.get('/transaction', {});
};

const getById = (id) => {
  return http.get(`/transaction/${id}`, {});
};

const post = (data) => {
  const formDataToSend = new FormData();
  for (const [key, value] of Object.entries(data)) {
    let actualKey = key;
    if (value !== null && value !== undefined) {
      formDataToSend.append(actualKey, value);
    }
  }
  return http.post('/transaction', formDataToSend);
};

const TransactionService = {
  get,
  getById,
  post
};

export default TransactionService;
