/* ---------- /{teamId}/users/me ---------- */
export interface User {
  profile: {
    code: string;
    id: number;
  },
  teamId: string;
  name: string;
  id: number;
}

/* ---------- /{teamId}/users/me/password ---------- */
export interface UserPassword {
  passwordConfirmation: string;
  password: string;
  currentPassword: string;
}