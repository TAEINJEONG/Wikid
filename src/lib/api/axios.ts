import axios from 'axios';
import { getToken, setAccessTokenCookie } from '../config/settingToken';

const axiosInstance = axios.create({
  baseURL: 'https://wikied-api.vercel.app/13-3', // 환경변수를 사용해 API 기본 URL 지정
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//요청 인터셉터: 요청 전 accessToken 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getToken('accessToken');

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 발생 시 토큰 갱신 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = getToken('refreshToken');

        if (refreshToken) {
          const { data } = await axiosInstance.post('/auth/refresh-token', {
            refreshToken,
          });
          const newAccessToken = data.accessToken;
          setAccessTokenCookie(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        //refresh 토큰 만료시 에러
        console.error('토큰 갱신 실패:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
