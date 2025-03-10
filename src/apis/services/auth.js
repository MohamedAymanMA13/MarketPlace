import { axios_instance as axios } from 'apis/axios-instance';

export function signIn(values) {
  return axios.post('/clientLogin', values);
}

export function signUp(values) {
  return axios.post('/clientSignup', values);
}
