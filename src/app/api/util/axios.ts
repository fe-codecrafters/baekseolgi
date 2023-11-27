export const axiosErrorHandler = (error: any) => {
  if (error.response) {
    console.log("Axios Body", error.response.data);
    console.log("Status Code", error.response.status);
    console.log("Headers", error.response.headers);
  } else if (error.request) {
    console.log("Request", error.request);
  } else {
    console.log("Error", error.message);
  }
  console.log(error.config);
};
