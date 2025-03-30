import { useState } from 'react'
import Image from 'next/image';  
import locked from '@/assets/images/locked.jpg';  
import Button from './common/Button';

const styles = {
  buttonBg: "bg-[#4CBFA4]",
  buttonHover: "hover:bg-[#3AA78C]",
  inputBg: "bg-[#F7F7FA]",
  textColor: "text-[#8F95B2]",
};

 
type Props = {
  initialAnswers: Answer[]
  onClose: () => void
  onSubmit: (updatedAnswers: Answer[]) => void
} 
export type Answer = {
  id: number;
  value: string;
  question: string;
};

export default function WikiPageModal({ initialAnswers, onClose, onSubmit }: Props) {
  const [formAnswers] = useState<Answer[]>(initialAnswers)
  const [inputAnswer, setInputAnswer] = useState("")

  const handleSave = () => {
    onSubmit(formAnswers)   
  }
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAnswer(e.target.value);
  }
 
  const handleClick = () => {
    handleSave();
    onClose();
  }
  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[395px] h-[435px] p-6 rounded-lg shadow-lg">
         
        <div className="flex justify-center mt-4">
          <Image
            src={locked}
            alt="Locked"
            width={42}
            height={42}
          />
        </div> 

        <h2 className={`text-center text-[11px] font-regular mt-4.5 ${styles.textColor}`}>
          다음 퀴즈를 맞추고<br />위키를 작성해보세요.
        </h2>
  
             <div>
          <label className="text-[14.5px] mt-9.5 block font-semibold text-gray-700">
            특별히 싫어하는 음식은?
          </label>
          <input
            type="text"
            value={inputAnswer}
            onChange={handleInputChange}
            className={`w-[355px] h-[40px] ${styles.inputBg} text-[12px] rounded-[10px] mt-5.5`}
            placeholder="   답안을 입력해 주세요"
          />
        </div>
  
         <div className="flex justify-center mt-10 w-full">
          <button
            onClick={handleClick}
            className={`w-[355px] h-[40px] ${styles.buttonBg} ${styles.buttonHover} rounded-[10px]`}
          >
            <Button
              buttonText="확인"
              width="100%"
              height="40px"
            />
          </button>
        </div> 
        
        <div className="text-center mt-9.5">
          <p className="text-[9px] text-gray-500">
            위키드는 지인들과 함께하는 즐거운 공간입니다.
          </p>
          <p className="text-[9px] text-gray-500">
            지인에게 상처를 주지 않도록 작성해 주세요.
          </p>
        </div>
      </div>
    </div>
  ) 
};
