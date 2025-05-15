import { axios_instance as axios } from 'apis/axios-instance';

export function fetchHomeData(lang) {
  return axios.get('/Offer/MarketPlace', {
    // headers: {
    //   lang,
    // },
  });
}

export function searchPackages(queryParams, lang) {
  return axios.get('/Packages/MarketPlace', {
    params: queryParams,
    // headers: {
    //   lang,
    // },
  });
}

export function fetchPackageById(PkgId, lang) {
  return axios.get(`/Packages/${PkgId}/MarketPlace`, {
    // headers: {
    //   lang,
    // },
  });
}
export function GetHotelDetailsWebsiteContent(Id) {
  const url = `/Hotel/${Id}`;
  console.log('API URL:', url); // Log the full URL being called
  return axios.get(url);
}
export function GetFlightTypeStructure(PkgId,  lang) {
  const url = `/Flight/GetFlightTypeStructure?aircraftTypeId=${PkgId}`;
  console.log('API URL:', url); // Log the full URL being called
  return axios.get(url, {
    headers: {
      lang,
    },
  });
}
export function GetCateringById(PkgId,  lang) {
  const url = `/Caterings/${PkgId}/marketplace`;
  return axios.get(url, {
    headers: {
      lang,
    },
  });
}
export function searchHotels(queryParams, lang) {
  return axios.get('/EntityHotelSeason/MarketPlace', {
    params: queryParams,
    
  });
}
export function searchHotels2( lang) {
  return axios.get('/Hotel/GetWebsiteContentAllHotels', {
    headers: {
      lang,
    },
  });
}

export function searchCatering(queryParams, lang) {
  return axios.get('/Caterings/marketplace', {
    params: queryParams || null,
    headers: {
      lang,
    },
  });
}

export function searchFlights(queryParams, lang) {
  console.log('Query Parameters:', queryParams); // This should log the query parameters
  return axios.get('/Flights/marketplace/travels', {
    params: queryParams,
    // headers: {
    //   lang,
    // },
  });
}

export function searchTransportation(queryParams, lang) {
  return axios.get('/Transportations/marketplace/travels', {
    params: queryParams,
    // headers: {
    //   lang,
    // },
  });
}