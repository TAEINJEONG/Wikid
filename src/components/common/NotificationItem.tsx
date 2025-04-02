import { Notification } from '@/lib/hook/useNotification';
import { CloseIcon } from './Icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  notification: Notification;
  onDelete: (id: number) => void;
  profileCode: string;
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

const NotificationItem = ({ notification, onDelete, profileCode }: Props) => {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const readNotification = JSON.parse(
      localStorage.getItem('readNotification') || '[]'
    );
    setIsRead(readNotification.includes(notification.id));
  }, [notification.id]);

  const markAsRead = () => {
    if (!isRead) {
      const readNotification = JSON.parse(
        localStorage.getItem('readNotification') || '[]'
      );
      if (!readNotification.includes(notification.id)) {
        const newRead = [...readNotification, notification.id];
        localStorage.setItem('readNotification', JSON.stringify(newRead));
        setIsRead(true);
      }
    }
  };

  return (
    <Link href={`/wiki/${profileCode}`} passHref>
      <div
        onClick={markAsRead}
        className="w-full h-[90px] px-4 py-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-start border border-gray-100 cursor-pointer"
      >
        <div className="text-[14px] font-normal leading-[22px] text-[#1b1b1b]">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${isRead ? 'bg-gray-400' : 'bg-red-500'}`}
              />

              <p className="py-1">{notification.content}</p>
            </div>
            <p className="text-xs text-[#a4a1aa] mt-1">
              {getRelativeTime(notification.createdAt)}
            </p>
          </div>
        </div>

        <button
          onClick={() => onDelete(notification.id)}
          className="cursor-pointer "
        >
          <CloseIcon size={20} />
        </button>
      </div>
    </Link>
  );
};

export default NotificationItem;
