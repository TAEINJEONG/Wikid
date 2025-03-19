import React from 'react';
import Image from 'next/image';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className,
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center justify-center ${color} ${className} `}
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
