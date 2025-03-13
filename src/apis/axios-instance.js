import axios from 'axios';

export const axios_instance = axios.create({
  baseURL: 'http://192.168.1.26:45455/api/',
});
