import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  borderRadius?: string;
  as?: 'div' | 'span';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  borderRadius = '8px',
  as: Tag = 'div',
}) => {
  return (
    <Tag
      className={clsx('bg-gray-100', 'skeleton-shimmer', className)}
      style={{ borderRadius }}
    />
  );
};

export default Skeleton;
