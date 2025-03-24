import React from 'react';

type SnackbarType = 'gray' | 'green' | 'red';

interface SnackbarProps {
  type?: SnackbarType;
  message: string;
  onClose?: () => void;
}

const typeStyles = {
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-500',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-300',
  },
  red: {
    bg: 'bg-red-200',
    text: 'text-red-200',
  },
};

const Snackbar: React.FC<SnackbarProps> = ({ type = 'gray', message, onClose }) => {
  const { bg, text } = typeStyles[type];

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
      <span className="flex-1">{message}</span>
      {onClose && <button onClick={onClose}></button>}
    </div>
  );
};

export default Snackbar;
