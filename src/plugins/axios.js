import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.mocki.io/v2/e61fc365/",
});

instance.interceptors.request.use(
  function (request) {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (request) {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
