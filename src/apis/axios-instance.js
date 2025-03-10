import axios from 'axios';

export const axios_instance = axios.create({
  baseURL: 'http://gammats.com:8010/api/',
});
