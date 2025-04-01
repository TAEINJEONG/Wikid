import { useEffect, useRef, useState } from 'react';
import NotificationItem from './NotificationItem';
import { useNotification, Notification } from '@/lib/hook/useNotification';
import { useSnackbar } from '@/lib/context/SnackbarContext';
import { BlackCloseIcon } from '@/components/common/Icons';

interface Props {
  onClose: () => void;
}

const NotificationModal = ({ onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { getNotifications, deleteNotification } = useNotification();
  const { showSnackbar } = useSnackbar();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getNotifications();
        setNotifications(res.list);
      } catch {
        showSnackbar('알림을 불러오는 데 실패했습니다.', {
          type: 'red',
          position: 'top',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [getNotifications, showSnackbar]);

  const handleDelete = async (id: number) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      showSnackbar('알림을 삭제했습니다.', {
        type: 'gray',
        position: 'bottom',
      });
    } catch {
      showSnackbar('알림 삭제에 실패했습니다.', {
        type: 'red',
        position: 'top',
      });
    }
  };

  return (
    <div className="absolute top-15 right-15 lg:right-[120px] z-20">
      <div
        ref={modalRef}
        className="w-[320px] max-h-[400px] overflow-y-auto bg-[#D8E2DF] rounded-lg shadow-lg z-50 p-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md text-[20px] font-bold leading-[25px] text-[#1b1b1b]">
            {isLoading ? '알림' : `알림 ${notifications.length}개`}
          </h3>
          <button onClick={onClose} className="cursor-pointer">
            <BlackCloseIcon size={20} />
          </button>
        </div>
        {isLoading ? (
          <p className="text-sm text-gray-400">불러오는 중...</p>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-md shadow-sm p-4">
            <p className="text-sm text-gray-400">알림이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
