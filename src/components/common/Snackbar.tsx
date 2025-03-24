import React, { useEffect } from 'react';
import { RedErrorIcon, GrayInfoIcon, GreenCheckIcon } from './Icons/Icons';

type SnackbarType = 'gray' | 'green' | 'red';

interface SnackbarProps {
  type?: SnackbarType;
  message: string;
  duration?: number; // ms 단위
  onClose?: () => void;
  iconSize?: number;
}

const typeStyles = {
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-500',
    Icon: GrayInfoIcon,
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-300',
    Icon: GreenCheckIcon,
  },
  red: {
    bg: 'bg-red-200',
    text: 'text-red-200',
    Icon: RedErrorIcon,
  },
};

const Snackbar: React.FC<SnackbarProps> = ({
  type = 'gray',
  message,
  duration = 3000,
  onClose,
  iconSize = 20,
}) => {
  const { bg, text, Icon } = typeStyles[type];

  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-md ${bg} ${text}`}
      style={{
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '18px',
        fontFamily: 'pretendard',
        maxWidth: '400px',
      }}
    >
      <Icon size={iconSize} className={text} />
      <span className="flex-1">{message}</span>
    </div>
  );
};

export default Snackbar;
