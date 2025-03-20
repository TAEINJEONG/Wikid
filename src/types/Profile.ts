// 공통되는 데이터 타입
export interface BaseProfile {
  id: number;
  name: string;
  code: string;
  image: string;
  updateAt?: string;
}

export interface BasicProfileInfo extends BaseProfile {
  job: string;
  nationality: string;
  city: string;
}

// 프로필 생성 (POST /{teamId}/profiles)
export interface CreateProfile extends BaseProfile {
  teamId: string;
  content: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  updateAt?: string;
}

// 프로필 목록 조회 (GET /{teamId}/profiles)
export interface ProfileListResponse {
  totalCount: number;
  list: BasicProfileInfo[];
}

// 프로필 조회 (GET /{teamId}/profiles/{code})
export interface GetProfile extends BaseProfile {
  securityQuestion: string;
  teamId?: string;
  content: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
}

// 프로필 수정 (PATCH /{teamId}/profile/{code})
export interface PatchProfile {
  securityAnswer: string;
  securityQuestion: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  contnet: string;
}

// 프로필 수정 중 체크 (GET /{teamId}/profile/{code}/ping)
export interface GetPing {
  registeredAt?: string,
  userId: number;
}

// 프로필 수정 중 갱신 (POST /{teamId}/profile/{code}/ping)
export interface PostPing {
  securityAnswer: string,
}