import axios from "axios";

const host = process.env.NODE_ENV === 'local' ? 'http://localhost:3333' : 'https://feedev-be-the-hero-api.herokuapp.com';

const api = axios.create({
  baseURL: host,
});

export default api;