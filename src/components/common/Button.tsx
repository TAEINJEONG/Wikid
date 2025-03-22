import React from 'react';
import Image from 'next/image';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-semibold transition duration-150 ease-in-out';

  const sizeStyles = {
    sm: 'h-[44px] px-4 text-sm',
    md: 'h-[45px] px-6 text-md',
    lg: 'h-[48px] px-8 text-lg',
  };

  const variantStyles = {
    primary: disabled || loading
      ? 'bg-gray-300 text-gray-50 cursor-not-allowed'
      : 'bg-green-200 text-gray-50 hover:bg-green-300',

    secondary: disabled || loading
      ? 'border border-gray-300 text-gray-300 cursor-not-allowed bg-transparent'
      : 'border border-green-200 text-green-200 w-400 h- 45 hover:bg-green-100',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
      {...props}
    >
      {loading ? (
        <>
        편집 중 
          <Image
            src="/Group 219.png"
            alt="loading"
            width={16}
            height={16}
            
          />
          
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
