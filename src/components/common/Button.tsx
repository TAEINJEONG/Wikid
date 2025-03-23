import React from 'react';
import Image from 'next/image';
import dot from '@/assets/images/Group 219.svg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  width?: string;
  height?: string;
  buttonText?: string;
  showLoadingImage?: boolean;
}

const Button = ({
  variant = 'primary',
  loading = false,
  disabled = false,
  width,
  height,
  buttonText,

  showLoadingImage = false,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-semibold transition duration-150 ease-in-out whitespace-nowrap';

  const variantStyles = {
    primary:
      disabled || loading
        ? 'bg-gray-300 text-gray-50 cursor-not-allowed'
        : 'bg-green-200 text-gray-50 hover:bg-green-300',

    secondary:
      disabled || loading
        ? 'border border-gray-300 text-gray-300 cursor-not-allowed bg-transparent'
        : 'border border-green-200 text-green-200 hover:bg-green-100',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles}  ${variantStyles[variant]}`}
      style={{ width, height }}
      {...props}
    >
      {loading ? (
        <>
          {buttonText}
          {showLoadingImage && (
            <Image src={dot} alt="loading" width={16} height={16} className="ml-2" />
          )}
        </>
      ) : (
        buttonText || children
      )}
    </button>
  );
};

export default Button;
