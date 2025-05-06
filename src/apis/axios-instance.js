import axios from 'axios';

export const axios_instance = axios.create({
  baseURL: 'http://gammats.com:7010/be/api',
});
