import { axios_instance as axios } from 'apis/axios-instance';

// export function fetchBookingById(id, lang, token) {
//   return axios.get(`/Booking/Id?id=${id}`, {
//     headers: {
//       lang,
//       Authorization: 'Bearer ' + token,
//     },
//   });
// }

// export function updateBooking(values, token) {
//   return axios.put('/Booking', values, {
//     headers: {
//       Authorization: 'Bearer ' + token,
//     },
//   });
// }

// export function scanPassport(values) {
//   return axios.post('/scanPassport', values);
// }

// export function fetchUserBookings(lang, token) {
//   return axios.get('/Booking', {
//     headers: {
//       lang,
//       Authorization: 'Bearer ' + token,
//     },
//   });
// }

// // the lang is needed here for the error message if the request fails.
// export function cancelBooking(bookingId, lang, token) {
//   return axios.delete(`/Booking?id=${bookingId}`, {
//     headers: {
//       lang,
//       Authorization: 'Bearer ' + token,
//     },
//   });
// }


//-------------------------------------------------------------------------------------------------------------------------

export function fetchUserCateringBookings(lang, token) {
  return axios.get('/Catering/GetCateringWebsiteBookings', {
    headers: {
      lang,
      Authorization: 'Bearer ' + token,
    },
  });
}

export function fetchUserFlightBookings(lang, token) {
  return axios.get('/Catering/GetFlightWebsiteBookings', {
    headers: {
      lang,
      Authorization: 'Bearer ' + token,
    },
  });
}

export function fetchUserHotelBookings(lang, token) {
  return axios.get('/Catering/GetHotelWebsiteBookings', {
    headers: {
      lang,
      Authorization: 'Bearer ' + token,
    },
  });
}

export function fetchUserPackagesBookings(lang, token) {
  return axios.get('/Package/GetPackageWebsiteBookings', {
    headers: {
      lang,
      Authorization: 'Bearer ' + token,
    },
  });
}