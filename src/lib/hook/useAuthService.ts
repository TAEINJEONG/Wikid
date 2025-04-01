import { useRouter } from 'next/router';
import axiosInstance from '../api/axios';
import {
  deleteToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from '../config/settingToken';
import { useAuth } from '../context/authProvider';

export function useAuthService() {
  const router = useRouter();

  const { setIsLoggedIn } = useAuth();

  async function login(email: string, password: string) {
    try {
      const res = await axiosInstance.post('/auth/signIn', { email, password });
      const { accessToken, refreshToken } = res.data;
      setAccessTokenCookie(accessToken);
      setRefreshTokenCookie(refreshToken);
      setIsLoggedIn(true);
      router.push('/');
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
  }

  function logout() {
    deleteToken('accessToken');
    deleteToken('refreshToken');
    router.push('/login');
  }

  async function signUp(
    email: string,
    name: string,
    password: string,
    passwordConfirmation: string
  ) {
    try {
      await axiosInstance.post('/auth/signUp', {
        email,
        name,
        password,
        passwordConfirmation,
      });
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    }
  }

  return { login, logout, signUp };
}
