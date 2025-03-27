import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAuthService } from "@/lib/hook/useAuthService";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface InputError {
  text: string;
  error: boolean;
}

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const [nameInputError, setNameInputError] = useState<InputError>({ text:"", error: true });
  const [emailInputError, setEmailInputError] = useState<InputError>({ text:"", error: true });
  const [passwordInputError, setPasswordInputError] = useState<InputError>({ text:"", error: true });
  const [passwordConfirmationInputError, setPasswordConfirmationInputError] = useState<InputError>({ text:"", error: true });
  const [isSignInfoInvalid, setIsSignInfoInvalid] = useState<boolean>(false);

  const { signUp } = useAuthService();
  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    if( e.target.value.length > 10) setNameInputError(prev => ({...prev, error: true}));
    else setNameInputError(prev => ({...prev, error: false}));
  }

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if(!emailRegex.test(e.target.value)) setEmailInputError(prev => ({...prev, error: true}));
    else setEmailInputError(prev => ({...prev, error: false}));
  }

  function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    if(e.target.value.length < 8) setPasswordInputError(prev => ({...prev, error: true}));
    else setPasswordInputError(prev => ({...prev, error: false}));
  }

  function changePasswordConfirmation(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordConfirmation(e.target.value);
    if(e.target.value !== password) setPasswordConfirmationInputError(prev => ({...prev, error: true}));
    else setPasswordConfirmationInputError(prev => ({...prev, error: false}));
  }

  function handleNameFocusOut() {
    if(nameInputError.error) setNameInputError(prev => ({...prev, text:"열자 이하로 적어주세요."}));
    else setNameInputError(prev => ({...prev, text:""}));
  }

  function handleEmailFocusOut() {
    if(emailInputError.error) setEmailInputError(prev => ({...prev, text:"이메일 형식으로 작성해 주세요."}));
    else setEmailInputError(prev => ({...prev, text:""}));
  }

  function handlePasswordFocusOut() {
    if(passwordInputError.error) setPasswordInputError(prev => ({...prev, text:"8자 이상 입력해주세요."}));
    else setPasswordInputError(prev => ({...prev, text:""}));
  }

  function handlePasswordConfirmationFocusOut() {
    if(passwordConfirmationInputError.error) setPasswordConfirmationInputError(prev => ({...prev, text:"비밀번호가 일치하지 않습니다."}));
    else setPasswordConfirmationInputError(prev => ({...prev, text:""}));
  }

  async function btnClick(){
    try{
      await signUp(email, name, password, passwordConfirmation);
      alert("가입이 완료되었습니다.");
      router.push('/login');
    } catch {
      alert("회원가입 실패");
    }
  }

  useEffect(() => {
    const isValid = [nameInputError, emailInputError, passwordInputError, passwordConfirmationInputError].every(inputError => !inputError.error );
    setIsSignInfoInvalid(isValid);
  },[nameInputError, emailInputError, passwordInputError, passwordConfirmationInputError])

  return (
    <>
    <div>헤더</div>
    <div className="mt-[153px] mx-auto w-[400px] flex flex-col items-center">
      <div className="mb-[64px] font-pre text-2xl-sb text-gray-500">회원가입</div>
      <div className="w-[100%] flex flex-col items-center">
        <div className="w-[100%] flex flex-col gap-[24px]">
          <Input label="이름" width="100%" error={nameInputError.text} placeholder="이름을 입력해 주세요" onChange={changeName} onBlur={handleNameFocusOut} />
          <Input label="이메일" width="100%" error={emailInputError.text} placeholder="이메일을 입력해 주세요" onChange={changeEmail} onBlur={handleEmailFocusOut} />
          <Input label="비밀번호" width="100%" error={passwordInputError.text} placeholder="비밀번호를 입력해 주세요" onChange={changePassword} onBlur={handlePasswordFocusOut} />
          <Input label="비밀번호 확인" width="100%" error={passwordConfirmationInputError.text} placeholder="비밀번호를 입력해 주세요" onChange={changePasswordConfirmation} onBlur={handlePasswordConfirmationFocusOut} />
        </div>
        <div className="mt-[32px] w-[100%]">
          <Button variant="primary" width="100%" height="45px" buttonText="가입하기" loading={!isSignInfoInvalid} onClick={btnClick}/>
        </div>
        <div className="mt-[40px] flex gap-[10px]">
          <span className="font-pre text-md-r text-gray-400">이미 회원이신가요?</span>
          <Link href="/login" className="font-pre text-md-r text-green-200">로그인하기</Link>
        </div>
      </div>
      
    </div>
    </>
  );
}

export default SignUp;