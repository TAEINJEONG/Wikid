import React from 'react';
import { useSnackbar } from '@/lib/context/SnackbarContext';
import { GreenLinkIcon } from '@/components/common/Icons';

interface LinkProps {
  size?: 'large' | 'small';
  width?: string;
  url: string;
  text: string;
  snackbarPosition?: 'top' | 'bottom';
}

const sizeStyles = {
  large: {
    iconSize: 20,
    textSize: 'text-[14px]',
    lineHeight: 'leading-[24px]',
  },
  small: {
    iconSize: 16,
    textSize: 'text-[12px]',
    lineHeight: 'leading-[18px]',
  },
};

const Link: React.FC<LinkProps> = ({
  size = 'large',
  width = 'fit-content',
  url,
  text,
  snackbarPosition = 'top',
}) => {
  const { showSnackbar } = useSnackbar();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showSnackbar('링크가 복사되었습니다.', {
        type: 'green',
        position: snackbarPosition,
        size,
      });
    } catch (error) {
      console.error('링크 복사 실패', error);
      showSnackbar('링크 복사 실패', {
        type: 'red',
        position: snackbarPosition,
        size,
      });
    }
  };

  const { iconSize, textSize, lineHeight } = sizeStyles[size];

  return (
    <button
      className={`flex items-center gap-[5px] bg-green-100 text-green-200 rounded-[10px] py-[5px] px-[10px] cursor-pointer ${textSize} ${lineHeight}`}
      style={{ width }}
      onClick={handleCopy}
    >
      <GreenLinkIcon size={iconSize} />
      {text}
    </button>
  );
};

export default Link;
