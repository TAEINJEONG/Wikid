import React from 'react';
import Image from 'next/image';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  className?: string;
}

const Icon = ({ name, size = 24, className = '', ...props }: IconProps) => {
  return (
    <span
      className={`inline-flex items-center justify-center  ${className}`}
      style={{ width: size, height: size }}
      {...props}
    >
      <Image
        src={`/icons/${name}.svg`}
        alt={`${name} icon`}
        width={size}
        height={size}
        className="fill-current"
      />
    </span>
  );
};

export default Icon;
