import { useCallback } from 'react';
import axiosInstance from '@/lib/api/axios';

export interface Notification {
  id: number;
  content: string;
  createdAt: string;
}

// let mockNotifications: Notification[] = [
//   {
//     id: 1,
//     content: '테스트 알림 1',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: 2,
//     content: '테스트 알림 2',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: 3,
//     content: '테스트 알림 3',
//     createdAt: new Date().toISOString(),
//   },
// ];

// export const useNotification = () => {
//   const getNotifications = useCallback(async (_page = 1, _pageSize = 3) => {
//     return new Promise<{ list: Notification[] }>((resolve) => {
//       setTimeout(() => {
//         resolve({
//           list: mockNotifications,
//         });
//       }, 500);
//     });
//   }, []);

//   const deleteNotification = useCallback(async (_id: number) => {
//     return new Promise<{ success: boolean }>((resolve) => {
//       setTimeout(() => {
//         mockNotifications = mockNotifications.filter((n) => n.id !== _id);
//         resolve({ success: true });
//       }, 300);
//     });
//   }, []);

export const useNotification = () => {
  const getNotifications = useCallback(async (page = 1, pageSize = 3) => {
    const res = await axiosInstance.get(`/notifications`, {
      params: { page, pageSize },
    });
    return res.data;
  }, []);

  const deleteNotification = useCallback(async (id: number) => {
    const res = await axiosInstance.delete(`/notifications/${id}`);
    return res.data;
  }, []);

  return { getNotifications, deleteNotification };
};
