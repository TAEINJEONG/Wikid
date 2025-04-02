import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import axiosInstance from '@/lib/api/axios';
import { useState } from 'react';
import { useSnackbar } from '@/lib/context/SnackbarContext';
import axios from 'axios';

export default function MyPage() {
  const { showSnackbar } = useSnackbar();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      showSnackbar('비밀번호가 일치하지 않습니다.', {
        type: 'red',
        position: 'top',
        size: 'large',
      });
      return;
    }
    const passwordDatas = {
      passwordConfirmation: confirmPassword,
      password: newPassword,
      currentPassword: currentPassword,
    };
    try {
      await axiosInstance.patch(`/users/me/password`, passwordDatas);
      showSnackbar('비밀번호가 성공적으로 변경되었습니다.', {
        type: 'green',
        position: 'top',
        size: 'large',
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showSnackbar(`${e.response?.data.message}`, {
          type: 'red',
          position: 'top',
          size: 'large',
        });
      }
    } finally {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const createWiki = async () => {
    if (!question || !answer) {
      showSnackbar('질문과 답을 입력해주세요.', {
        type: 'red',
        position: 'top',
        size: 'large',
      });
      return;
    }

    const wikiDatas = {
      securityAnswer: answer,
      securityQuestion: question,
    };

    try {
      await axiosInstance.post('/profiles', wikiDatas);

      showSnackbar('위키가 성공적으로 생성되었습니다.', {
        type: 'green',
        position: 'top',
        size: 'large',
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showSnackbar(`${e.response?.data.message}`, {
          type: 'red',
          position: 'top',
          size: 'large',
        });
      }
    } finally {
      setAnswer('');
      setQuestion('');
    }
  };

  return (
    <div className="flex flex-col items-center max-w-[335px] md:max-w-100 mx-auto w-full rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mt-[172px] mb-[64px]">
        계정 설정
      </h2>

      {/* 비밀번호 변경 섹션 */}
      <div className="flex flex-col space-y-2">
        <label className="text-[14.5px] font-bold">비밀번호 변경</label>

        <div className="flex flex-col items-center w-full space-y-4">
          <div className="w-[335px] md:w-[400px] flex flex-col space-y-2 relative">
            <Input
              type="password"
              placeholder="기존 비밀번호"
              className="w-full h-[45px] text-[14px] rounded-[10px] text-gray-700"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="새 비밀번호"
              className="w-full h-[45px] text-[14px] rounded-[10px]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              className="w-full h-[45px] text-[14px] rounded-[10px] mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            buttonText="변경하기"
            className="py-2 px-5 w-[90px]"
            onClick={handlePasswordChange}
          />
        </div>
      </div>

      <div className="w-[335px] md:w-[400px] h-[1px] my-[32px] bg-gray-200" />

      {/* 위키 생성하기 섹션 */}
      <div className="flex flex-col space-y-2">
        <label className=" text-[14.5px] font-bold">위키 생성하기</label>

        <div className="flex flex-col items-center w-full space-y-2">
          <div className="w-[335px] md:w-[400px] flex flex-col space-y-2">
            <Input
              placeholder="질문을 입력해 주세요"
              className="w-full h-[45px] text-[14px] rounded-[10px]"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <Input
              placeholder="질문을 입력해 주세요"
              className="w-full h-[45px] text-[14px] rounded-[10px] mb-4"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            buttonText="생성하기"
            className="py-2 px-5 w-[90px]"
            onClick={createWiki}
          />
        </div>
      </div>
    </div>
  );
}
