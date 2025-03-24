import { axios_instance as axios } from 'apis/axios-instance';

export function signIn(values) {
  return axios.post('/Users/login', values);
}

export function signUp(values) {
  return axios.post('/Users/register', values);
}
