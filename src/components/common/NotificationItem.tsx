import { Notification } from '@/lib/hook/useNotification';
import { CloseIcon } from './Icons';

interface Props {
  notification: Notification;
  onDelete: (id: number) => void;
}

const getRelativeTime = (dateStr: string) => {
  const now = Date.now();
  const createdTime = new Date(dateStr).getTime();
  const diffMs = now - createdTime;
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 60) return '지금';

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}분 전`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
};

const NotificationItem = ({ notification, onDelete }: Props) => {
  return (
    <div className="w-full h-[90px] px-4 py-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-start border border-gray-100 cursor-pointer">
      <div className="text-[14px] font-normal leading-[22px] text-[#1b1b1b]">
        <p className="py-1">{notification.content}</p>
        <p className="text-xs text-[#a4a1aa] mt-1">
          {getRelativeTime(notification.createdAt)}
        </p>
      </div>
      <button
        onClick={() => onDelete(notification.id)}
        className="cursor-pointer "
      >
        <CloseIcon size={20} />
      </button>
    </div>
  );
};

export default NotificationItem;
