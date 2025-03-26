import { useAuthService } from '@/lib/hook/useAuthService';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuthService();

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function changePassward(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function btnClick() {
    login(email, password);
  }

  return (
    <>
      <div>헤더</div>
      <div className="">
        <div>
          <span>이메일</span>
          <input onChange={changeEmail}></input>
        </div>
        <div>
          <span>비밀번호</span>
          <input onChange={changePassward}></input>
        </div>
        <button onClick={btnClick}>로그인</button>
      </div>
    </>
  );
}

export default Login;
