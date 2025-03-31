import { useEffect, useCallback } from 'react';
import axiosInstance from './api/hello';

const Login = () => {
  const email = "tein990105@gmail.com";
  const name = "정태인";
  const password = "y12341234";
  const passwordConfirmation = "y12341234";

  const login = useCallback(async () => {
    try {
      // 이미 가입된 경우 에러가 발생할 수 있으므로, 여기서 에러 처리를 해줍니다.
      await axiosInstance.post('/auth/signUp', { email, name, password, passwordConfirmation });
    } catch (error) {
      console.error('signUp 에러 (이미 가입된 사용자일 수 있음):', error);
    }
    
    try {
      await axiosInstance.post('/auth/signIn', { email, password });
    } catch (error) {
      console.error('signIn 에러:', error);
    }
  }, [email, name, password, passwordConfirmation]);

  useEffect(() => {
    login();
  }, [login]);

  return <div>현재 회원가입이 안되는 문제가 있는것 같음, login page</div>;
};

export default Login;