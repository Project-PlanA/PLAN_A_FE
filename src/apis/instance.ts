import { logOnDev } from '@/utils/logOnDev';
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    logOnDev(`
      [요청]:
      method: ${config.method},
      url: ${config.url},
      data: ${config.data},
      params: ${config.params},
        `);
    return config;
  },
  (error: AxiosError) => {
    logOnDev(`[API request error]: ${error.config}`);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    logOnDev(`
      [응답]
      status: ${response.status},
      data: ${response.data},

    `);
    return response;
  },
  async function (error: AxiosError) {
    const { response } = error;
    switch (response?.status) {
      case 401:
        logOnDev('401인증 오류');
        break;
      case 403:
        logOnDev('접근 권한이 없습니다.');
        break;
      case 500:
        logOnDev('서버 오류가 발생했습니다.');
        break;
      default:
        logOnDev(`Unhandled error:  ${error.response?.data}`);
    }

    return Promise.reject(error);
  }
);
