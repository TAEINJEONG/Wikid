import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  as?: 'div' | 'span';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  as: Tag = 'div',
}) => {
  return <Tag className={clsx('bg-gray-200', className)} />;
};

export default Skeleton;
