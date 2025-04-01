import axiosInstance from '@/lib/api/axios';

export interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

export const useNotification = () => {
  const getNotifications = async (page = 1, pageSize = 3) => {
    const res = await axiosInstance.get(`/notifications`, {
      params: { page, pageSize },
    });
    return res.data;
  };

  const deleteNotification = async (id: number) => {
    const res = await axiosInstance.delete(`/notifications/${id}`);
    return res.data;
  };

  return { getNotifications, deleteNotification };
};
