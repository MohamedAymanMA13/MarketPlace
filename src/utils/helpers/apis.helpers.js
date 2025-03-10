export function httpErrorHandler(error, customErrorMsg) {
  let errorMsg;

  if (error.response) {
    console.log({
      data: error.response.data,
      status: error.response.status,
      headers: error.response.headers,
    });

    errorMsg =
      error.response.data && error.response.data.errors[0]
        ? error.response.data.errors[0]
        : customErrorMsg;
  } else if (error.request) {
    console.log(error.request);
    errorMsg = customErrorMsg;
  } else {
    console.log('Error', error.message);
    errorMsg = error.message || customErrorMsg;
  }

  return errorMsg;
}
