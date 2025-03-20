import Image, { ImageProps } from 'next/image';
import React from 'react';

interface CustomImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <Image src={src} alt={alt} layout="fill" objectFit="cover" {...props} />
    </div>
  );
};

export default CustomImage;
