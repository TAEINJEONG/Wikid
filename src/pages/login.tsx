import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useAuthService } from '@/lib/hook/useAuthService';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface InputError {
  text: string;
  error: boolean;
}

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailInputError, setEmailInputError] = useState<InputError>({
    text: '',
    error: true,
  });
  const [passwordInputError, setPasswordInputError] = useState<InputError>({
    text: '',
    error: true,
  });
  const [isLoginFormValid, setIsLoginFormValid] = useState<boolean>(false);

  const [isloading, setisloading] = useState<boolean>(false);

  const { login } = useAuthService();
  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value))
      setEmailInputError((prev) => ({ ...prev, error: true }));
    else setEmailInputError((prev) => ({ ...prev, error: false }));
  }

  function changePassward(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    if (e.target.value.length < 8)
      setPasswordInputError((prev) => ({ ...prev, error: true }));
    else setPasswordInputError((prev) => ({ ...prev, error: false }));
  }

  function handleEmailFocusOut() {
    if (emailInputError.error)
      setEmailInputError((prev) => ({
        ...prev,
        text: '이메일 형식으로 작성해 주세요.',
      }));
    else setEmailInputError((prev) => ({ ...prev, text: '' }));
  }

  function handlePasswordFocusOut() {
    if (passwordInputError.error)
      setPasswordInputError((prev) => ({
        ...prev,
        text: '8자 이상 작성해 주세요.',
      }));
    else setPasswordInputError((prev) => ({ ...prev, text: '' }));
  }

  async function btnClick() {
    setisloading(true);
    const error = await login(email, password);
    setisloading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push('/');
  }

  useEffect(() => {
    const isValid = [emailInputError, passwordInputError].every(
      (inputError) => !inputError.error
    );
    setIsLoginFormValid(isValid);
  }, [emailInputError, passwordInputError]);

  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <div className="mt-[261px] mx-auto w-[400px] flex flex-col items-center">
        <div className="mb-[50px] text-2xl-sb text-gray-500">로그인</div>
        <div className="w-[100%] flex flex-col gap-[24px]">
          <Input
            label="이메일"
            width="100%"
            error={emailInputError.text}
            placeholder="이메일을 입력해 주세요"
            onChange={changeEmail}
            onBlur={handleEmailFocusOut}
          />
          <Input
            label="비밀번호"
            width="100%"
            error={passwordInputError.text}
            placeholder="비밀번호를 입력해 주세요"
            isPassword={true}
            onChange={changePassward}
            onBlur={handlePasswordFocusOut}
          />
        </div>
        <div className="mt-[32px] w-[100%]">
          <Button
            className={'w-[100%] h-[45px]'}
            buttonText="로그인"
            isDisabled={!isLoginFormValid}
            isloading={isloading}
            onClick={btnClick}
          />
        </div>
        <div className="mt-[40px]">
          <Link href="/signup" className="font-pre text-md-r text-green-200">
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
