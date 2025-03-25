import { useEffect, useCallback } from 'react';
import axiosInstance from '@/lib/api/axios';

const Login = () => {
  const email = 'test4949@test.com';
  const password = 'y12341234';

  const login = useCallback(async () => {
    // try {
    //   // 이미 가입된 경우 에러가 발생할 수 있으므로, 여기서 에러 처리를 해줍니다.
    //   await axiosInstance.post('/auth/signUp', { email, name, password, passwordConfirmation });
    // } catch (error) {
    //   console.error('signUp 에러 (이미 가입된 사용자일 수 있음):', error);
    // }

    try {
      const res = await axiosInstance.post('/auth/signIn', { email, password });
      localStorage.setItem('accessToken', res.data.accessToken);
    } catch (error) {
      console.error('signIn 에러:', error);
    }
  }, [email, password]);

  useEffect(() => {
    login();
  }, [login]);

  return <div>현재 회원가입이 안되는 문제가 있는것 같음, login page</div>;
};

export default Login;
