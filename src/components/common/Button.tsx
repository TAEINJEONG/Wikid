import React from 'react';
import { DotIcon } from '@/components/common/Icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isloading?: boolean;
  isDisabled?: boolean;
  buttonText?: string;
  textClassName?: string;
}

const Button = ({
  variant = 'primary',
  isloading = false,
  isDisabled = false,
  buttonText,
  textClassName,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md transition duration-150 ease-in-out whitespace-nowrap';

  const variantStyles = {
    primary:
      isDisabled || isloading
        ? 'bg-gray-300 text-gray-50 cursor-not-allowed'
        : 'bg-green-200 text-gray-50 hover:bg-green-300 cursor-pointer',

    secondary:
      isDisabled || isloading
        ? 'border border-gray-300 text-gray-300 cursor-not-allowed bg-transparent'
        : 'border border-green-200 text-green-200 hover:bg-green-100 cursor-pointer',
  };

  return (
    <button
      disabled={isDisabled || isloading}
      className={`${baseStyles} ${variantStyles[variant]} gap-2.5 ${className}`}
      {...props}
    >
      {isloading ? (
        <>
          <span className={textClassName}>{buttonText}</span>
          <DotIcon />
        </>
      ) : (
        <span className={textClassName}>{buttonText}</span>
      )}
    </button>
  );
};

export default Button;
