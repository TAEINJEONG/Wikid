// 알림 상세 내용 (DELETE에는 이것 그대로 사용)
export interface BasicNotification {
  createdAt?: string;
  content: string;
  id: number;
}

// 알림 목록 조회 (GET /{teamId}/notification)
export interface NotificationListResponse {
  totalCount: number;
  list: BasicNotification[];
}
