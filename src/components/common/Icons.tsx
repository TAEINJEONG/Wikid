import React from 'react';
import Alarm32 from '@/assets/icons/alarm_32.svg';
import Alarm from '@/assets/icons/alarm.svg';
import Align from '@/assets/icons/align.svg';
import Arrow from '@/assets/icons/arrow.svg';
import Bold from '@/assets/icons/bold.svg';
import Bullet from '@/assets/icons/bullet.svg';
import Camera from '@/assets/icons/camera.svg';
import Check from '@/assets/icons/check.svg';
import Close from '@/assets/icons/close.svg';
import Delete from '@/assets/icons/delete.svg';
import Edit from '@/assets/icons/edit.svg';
import Error from '@/assets/icons/error.svg';
import Expand from '@/assets/icons/expand.svg';
import Heart from '@/assets/icons/heart.svg';
import Img from '@/assets/icons/image.svg';
import Info from '@/assets/icons/info.svg';
import Italic from '@/assets/icons/italic.svg';
import Link from '@/assets/icons/link.svg';
import Lock from '@/assets/icons/lock.svg';
import Menu from '@/assets/icons/menu.svg';
import Number from '@/assets/icons/number.svg';
import Profile from '@/assets/icons/profile.svg';
import Search from '@/assets/icons/search.svg';
import Underline from '@/assets/icons/underline.svg';
import Video from '@/assets/icons/video.svg';
import RedError from '@/assets/icons/Rederror.svg';
import GrayInfo from '@/assets/icons/GrayInfo.svg';
import GreenCheck from '@/assets/icons/GreenCheck.svg';
import Dot from '@/assets/icons/dot.svg';

interface IconProps {
  size?: number;
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}

export const Alarm32Icon = ({ size = 24, className, onClick }: IconProps) => (
  <Alarm32 width={size} height={size} className={className} onClick={onClick} />
);

export const AlarmIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Alarm width={size} height={size} className={className} onClick={onClick} />
);

export const AlignIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Align width={size} height={size} className={className} onClick={onClick} />
);

export const ArrowIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Arrow width={size} height={size} className={className} onClick={onClick} />
);

export const BoldIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Bold width={size} height={size} className={className} onClick={onClick} />
);

export const BulletIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Bullet width={size} height={size} className={className} onClick={onClick} />
);

export const CameraIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Camera width={size} height={size} className={className} onClick={onClick} />
);

export const CheckIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Check width={size} height={size} className={className} onClick={onClick} />
);

export const CloseIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Close width={size} height={size} className={className} onClick={onClick} />
);

export const DeleteIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Delete width={size} height={size} className={className} onClick={onClick} />
);

export const EditIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Edit width={size} height={size} className={className} onClick={onClick} />
);

export const ErrorIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Error width={size} height={size} className={className} onClick={onClick} />
);

export const ExpandIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Expand width={size} height={size} className={className} onClick={onClick} />
);

export const HeartIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Heart width={size} height={size} className={className} onClick={onClick} />
);

export const ImageIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Img width={size} height={size} className={className} onClick={onClick} />
);

export const InfoIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Info width={size} height={size} className={className} onClick={onClick} />
);

export const ItalicIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Italic width={size} height={size} className={className} onClick={onClick} />
);

export const LinkIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Link width={size} height={size} className={className} onClick={onClick} />
);

export const LockIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Lock width={size} height={size} className={className} onClick={onClick} />
);

export const MenuIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Menu width={size} height={size} className={className} onClick={onClick} />
);

export const NumberIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Number width={size} height={size} className={className} onClick={onClick} />
);

export const ProfileIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Profile width={size} height={size} className={className} onClick={onClick} />
);

export const SearchIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Search width={size} height={size} className={className} onClick={onClick} />
);

export const UnderlineIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Underline
    width={size}
    height={size}
    className={className}
    onClick={onClick}
  />
);

export const VideoIcon = ({ size = 24, className, onClick }: IconProps) => (
  <Video width={size} height={size} className={className} onClick={onClick} />
);

export const RedErrorIcon = ({ size = 20, className, onClick }: IconProps) => (
  <RedError
    width={size}
    height={size}
    className={className}
    onClick={onClick}
  />
);

export const GrayInfoIcon = ({ size = 20, className, onClick }: IconProps) => (
  <GrayInfo
    width={size}
    height={size}
    className={className}
    onClick={onClick}
  />
);

export const GreenCheckIcon = ({
  size = 24,
  className,
  onClick,
}: IconProps) => (
  <GreenCheck
    width={size}
    height={size}
    className={className}
    onClick={onClick}
  />
);

export const DotIcon = ({ className, onClick }: IconProps) => (
  <Dot width={20} height={4} className={className} onClick={onClick} />
);
