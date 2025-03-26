import { useAuthService } from "@/lib/hook/useAuthService";
import { useState } from "react";


const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const { signUp } = useAuthService();

  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function changePassward(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function changePasswordConfirmation(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordConfirmation(e.target.value);
  }

  function btnClick(){
    signUp(email, name, password, passwordConfirmation);  
  }

  return (
    <>
      <div>헤더</div>
      <div className="">
        <div>
          <span>이름</span>
          <input onChange={changeName}></input>
        </div>
        <div>
          <span>이메일</span>
          <input onChange={changeEmail}></input>
        </div>
        <div>
          <span>비밀번호</span>
          <input onChange={changePassward}></input>
        </div>
        <div>
          <span>비밀번호 확인</span>
          <input onChange={changePasswordConfirmation}></input>
        </div>
        <button onClick={btnClick}>회원가입</button>
      </div>
    </>
  );
}

export default SignUp;