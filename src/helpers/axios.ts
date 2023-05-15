import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export default instance;
