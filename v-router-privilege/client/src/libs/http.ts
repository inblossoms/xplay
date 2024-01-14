import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

axios.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status !== 200) {
      return Promise.reject(res);
    }
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { axios };
