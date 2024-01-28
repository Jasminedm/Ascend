import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const update = (id, newNum) => {
  return axios.put(`${baseUrl}/${id}`, newNum).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const getById = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const personService = {
  getAll,
  create,
  update,
  remove,
  getById,
};

export default personService;