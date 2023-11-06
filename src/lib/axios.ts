import Axios from "axios";

export const axios = Axios.create();

// Axios Interceptors
// https://github.com/axios/axios#interceptors
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // TODO: notification
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // TODO: notification
    return Promise.reject(error);
  },
);
