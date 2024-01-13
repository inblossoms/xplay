import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import qs from "qs";

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

async function HTTP_post(url: string, data: unknown) {
  try {
    const response = await axios.post(url, qs.stringify(data));
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { axios, HTTP_post };
