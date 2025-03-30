import { useState } from 'react';

type Props = {
  text: string;
   size: string;
   className?: string;
  onClick: () => void;
};

export default function WikiPageButton({ text, onClick }: Props) {
  const [isClicked, setIsClicked] = useState(false);  

  const handleClick = () => {
    setIsClicked(true);  
    onClick(); 
    
    setIsClicked(true); 
      };

  return (
    <button
      onClick={handleClick}  
      className={`px-4 py-2 rounded transition-all duration-300 ${
        isClicked
          ? 'bg-blue-700 text-white'  
          : 'bg-blue-600 text-white' 
      }`}
    >
      {text}
    </button>
  );
}
