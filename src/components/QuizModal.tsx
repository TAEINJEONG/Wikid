import { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';
import Lock from '@/assets/icons/lock.svg';
import CloseIcon from '@/assets/images/close-icon.svg';

type Props = {
  question: string | undefined;
  onClose?: () => void;
  onSubmit: (quizAnswers: string) => void;
};

export default function WikiPageModal({ question, onClose, onSubmit }: Props) {
  const [inputAnswer, setInputAnswer] = useState('');

  const handleSave = () => {
    onSubmit(inputAnswer);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAnswer(e.target.value);
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-screen bg-black/74 backdrop-opacity-5"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="p-5 w-[375px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-1 rounded-[24px] bg-white"
        >
          <div>
            <div className="flex justify-end w-full mb-[10px]">
              <CloseIcon onClick={onClose} className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="flex justify-center mt-4 mb-[10px]">
              <div className="flex items-center justify-center bg-gray-100 rounded-[99px] w-[42px] h-[42px]">
                <Lock className="w-5 h-5" />
              </div>
            </div>

            <h2 className="mb-10 text-center text-md-r text-gray-400">
              다음 퀴즈를 맞추고
              <br />
              위키를 작성해보세요.
            </h2>

            {question && (
              <div className="text-2lg-sb mb-[15px] text-gray-500">
                {question}
              </div>
            )}

            <Input
              placeholder="답안을 입력해 주세요"
              type="text"
              value={inputAnswer}
              className="text-md-r mb-10"
              onChange={handleInputChange}
            />

            <Button
              buttonText="확인"
              className="w-full py-2 text-md-sb mb-5"
              onClick={handleSave}
            />
            <div className="text-center">
              <p className="text-[12px] text-gray-500">
                위키드는 지인들과 함께하는 즐거운 공간입니다.
              </p>
              <p className="text-[12px] text-gray-500">
                지인에게 상처를 주지 않도록 작성해 주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
