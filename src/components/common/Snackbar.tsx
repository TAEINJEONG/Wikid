import React, { useEffect } from 'react';
import { RedErrorIcon, GreenCheckIcon, GrayInfoIcon } from './Icons/Icons';

type SnackbarType = 'gray' | 'green' | 'red';
type SnackbarPosition = 'top' | 'bottom';
type SnackbarSize = 'large' | 'small';

interface SnackbarProps {
  type?: SnackbarType;
  message: string;
  duration?: number;
  onClose?: () => void;
  iconSize?: number;
  position?: SnackbarPosition;
  size?: SnackbarSize;
}

const typeStyles = {
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-500',
    border: '',
    Icon: GrayInfoIcon,
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-100',
    border: 'border border-green-200',
    Icon: GreenCheckIcon,
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-200',
    border: 'border border-red-200',
    Icon: RedErrorIcon,
  },
};

const sizeStyles = {
  large: {
    height: 'h-[50px]',
    fontSize: 'text-[14px]',
    lineHeight: 'leading-[24px]',
    iconSize: 20,
  },
  small: {
    height: 'h-[42px]',
    fontSize: 'text-[12px]',
    lineHeight: 'leading-[18px]',
    iconSize: 18,
  },
};

const Snackbar: React.FC<SnackbarProps> = ({
  type = 'gray',
  message,
  duration = 3000,
  onClose,
  position = 'top',
  size = 'large',
}) => {
  const { bg, text, border, Icon } = typeStyles[type];
  const { height, fontSize, lineHeight, iconSize } = sizeStyles[size];

  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const positionClasses = position === 'top' ? 'top-6' : 'bottom-6';

  return (
    <div className={`fixed ${positionClasses} left-1/2 -translate-x-1/2 z-50`}>
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-md ${height} ${fontSize} ${lineHeight} ${bg} ${text} ${border}`}
        style={{
          fontFamily: 'pretendard',
          maxWidth: '400px',
        }}
      >
        <Icon size={iconSize} className={text} />
        <span className="flex-1 cursor-default">{message}</span>
      </div>
    </div>
  );
};

export default Snackbar;
