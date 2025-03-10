import { axios_instance as axios } from 'apis/axios-instance';

export function fetchHomeData(lang) {
  return axios.get('/ClientPackage/GetAll', {
    headers: {
      lang,
    },
  });
}

export function searchPackages(queryParams, lang) {
  return axios.get('/ClientPackage/Packages', {
    params: queryParams,
    headers: {
      lang,
    },
  });
}

export function fetchPackageById(PkgId, lang) {
  return axios.get(`/ClientPackage/GetClientPackageById?id=${PkgId}`, {
    headers: {
      lang,
    },
  });
}
export function GetHotelDetailsWebsiteContent(PkgId, startDate, endDate, lang) {
  const url = `/Hotel/GetHotelDetailsWebsiteContent?hotelId=${PkgId}&from_date=${startDate}&to_date=${endDate}`;
  console.log('API URL:', url); // Log the full URL being called
  return axios.get(url, {
    headers: {
      lang,
    },
  });
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
  const url = `/Catering/WebsiteGetById?id=${PkgId}`;
  console.log('API URL:', url); // Log the full URL being called
  return axios.get(url, {
    headers: {
      lang,
    },
  });
}
export function searchHotels(queryParams, lang) {
  return axios.get('/Hotel/SearchInGetHotelWebsiteContent', {
    params: queryParams,
    headers: {
      lang,
    },
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
  return axios.get('/Catering/GetWebsiteContentAllCaterings', {
    params: queryParams,
    headers: {
      lang,
    },
  });
}

export function searchFlights(queryParams, lang) {
  return axios.get('/Flight/GetAllFlightWebsiteContent', {
    params: queryParams,
    headers: {
      lang,
    },
  });
}

export function searchTransportation(queryParams, lang) {
  return axios.get('/TransportationCompany/GetWebsiteContentAllTransportations', {
    params: queryParams,
    headers: {
      lang,
    },
  });
}