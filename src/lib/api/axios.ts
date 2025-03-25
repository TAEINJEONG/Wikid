import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://wikied-api.vercel.app/13-3', // 환경변수를 사용해 API 기본 URL 지정
  timeout: 10000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 요청 전 accessToken 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 예시로 localStorage에 저장된 토큰을 사용 (실제 구현에서는 보안 고려)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// // 응답 인터셉터: 401 에러 발생 시 토큰 갱신 시도
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     // 이미 재시도 했는지 확인하여 무한 루프 방지
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // refreshToken을 이용해 새로운 accessToken 요청 (여기서는 예시로 localStorage 사용)
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) throw new Error('No refresh token available');

//         const { data } = await axiosInstance.post('/auth/refresh', { refreshToken });
//         const newAccessToken = data.accessToken;

//         // 새로운 accessToken 저장 (보안에 유의)
//         localStorage.setItem('accessToken', newAccessToken);
//         // 갱신된 accessToken을 원래 요청 헤더에 설정 후 재요청
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // refreshToken도 만료되었거나 갱신에 실패한 경우, 사용자를 로그아웃 처리할 수 있음
//         console.error('토큰 갱신 실패:', refreshError);
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
