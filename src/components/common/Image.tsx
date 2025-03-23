import Image, { ImageProps } from 'next/image';
import React from 'react';

type Variant = 'default' | 'fill' | 'responsive';
type ObjectFitType = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

interface AppImageProps extends Omit<ImageProps, 'layout'> {
  variant?: Variant;
  className?: string;
  objectFit?: ObjectFitType;
}

const AppImage: React.FC<AppImageProps> = ({
  src,
  alt,
  variant = 'default',
  className = '',
  width,
  height,
  objectFit = 'cover',
  ...props
}) => {
  const isFill = !width && !height;
  const layout = isFill ? 'fill' : 'responsive';

  const variantStyles: Record<Variant, string> = {
    default: '',
    fill: 'object-cover w-full h-full',
    responsive: 'object-contain w-full h-auto',
  };

  const objectFitStyle = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }[objectFit];

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout={layout}
      className={`${variantStyles[variant]} ${objectFitStyle} ${className}`.trim()}
      {...props}
    />
  );
};

export default AppImage;
