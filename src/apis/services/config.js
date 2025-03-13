import { axios_instance as axios } from 'apis/axios-instance';

export function fetchConfigTables(lang) {
  return axios.get('Configurations/marketplace', {
    headers: {
      lang,
    },
  });
}

// export function GetCountries(lang) {
//   return axios.get('/Lookup/GetCountries', {
//     headers: {
//       lang,
//     },
//   });
// }
// export function GetCities(id,lang) {
//   return axios.get(`/Lookup/GetCities?countryId=${id}`, {
//     headers: {
//       lang,
//     },
//   });
// }