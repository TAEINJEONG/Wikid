// User 조회 (GET /{teamId}/users/me)
export interface User {
  profile: {
    code: string;
    id: number;
  };
  teamId: string;
  name: string;
  id: number;
}

// User 수정 (PATCH /{teamId}/users/me)
export interface UserPassword {
  passwordConfirmation: string;
  password: string;
  currentPassword: string;
}
