import React from 'react';
import Image from 'next/image';
import dot from '@/assets/images/dot.svg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  width?: string;
  height?: string;
  buttonText?: string;
  showLoadingImage?: boolean;
  size: string; 
text: string;
}

const Button = ({
  variant = 'primary',
  loading = false,
  width = '120px',
  height = '40px',
  buttonText,
  showLoadingImage = false,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-semibold transition duration-150 ease-in-out whitespace-nowrap';

  const variantStyles = {
    primary: loading
      ? 'bg-gray-300 text-gray-50 cursor-not-allowed'
      : 'bg-green-200 text-gray-50 hover:bg-green-300',

    secondary: loading
      ? 'border border-gray-300 text-gray-300 cursor-not-allowed bg-transparent'
      : 'border border-green-200 text-green-200 hover:bg-green-100',
  };

  return (
    <button
      disabled={loading}
      className={`${baseStyles} ${variantStyles[variant]}`}
      style={{ width, height }}
      {...props}
    >
      {loading ? (
        <>
          {buttonText}
          {showLoadingImage && (
            <Image
              src={dot}
              alt="loading"
              width={20}
              height={4}
              className="ml-2"
            />
          )}
        </>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;
