import clsx from 'clsx';
import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  height?: string;
  isPassword?: boolean;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, height = '45px', isPassword = false, className, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={clsx('flex flex-col gap-[10px]', className)}>
        {label && (
          <label
            className="text-[12px] leading-[18px] font-[500] text-gray-500"
            style={{ fontFamily: 'pretendard' }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPassword && !showPassword ? 'password' : 'text'}
            className={`
              w-full rounded-md px-3
              bg-gray-100 text-gray-500 text-[12px] leading-[18px] font-[500]
              placeholder:text-gray-400
              ${error ? 'border border-red-200 bg-red-50' : 'border border-transparent'}
            `}
            style={{ height, fontFamily: 'pretendard' }}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 text-xs"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '숨김' : '보기'}
            </button>
          )}
        </div>
        {error && (
          <span className="text-[12px] leading-[18px] text-red-200 font-[500]">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
