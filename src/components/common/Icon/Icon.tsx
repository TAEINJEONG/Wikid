import React from 'react';
import Image from 'next/image';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  hoverEffect?: 'scale' | 'opacity' | 'all' | 'none';
  className?: string;
}

const hoverVariants = {
  scale: 'hover:scale-110 transition-transform duration-200',
  opacity: 'hover:opacity-75 transition-opacity duration-200',
  all: 'hover:scale-110 hover:opacity-75 transition-all duration-200',

  none: '',
};

const Icon = ({ name, size = 24, hoverEffect = 'none', className = '', ...props }: IconProps) => {
  const hoverClass = hoverVariants[hoverEffect];

  return (
    <span
      className={`inline-flex items-center justify-center ${hoverClass} ${className}`}
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
