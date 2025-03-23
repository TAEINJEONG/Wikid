// 회원가입 (POST /{teamId}/auth/signUp)
export interface Auth {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

// 로그인 (POST /{teamId}/auth/signIn)
export interface signIn {
  email: string;
  password: string;
}

// 토큰 갱신 (POST /{teamId}/auth/refresh-token)
export interface RefreshToken {
  refreshToken: string;
}
