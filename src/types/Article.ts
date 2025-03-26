// 게시글 기본 타입
export interface BasicArticle {
  updatedAt?: string;
  createdAt?: string;
  likeCount: number;
  content: string;
  writer: {
    name: string;
    id: number;
  };
  image: string;
  title: string;
  id: number;
  isLiked: boolean;
}

// 게시글 등록 (POST /{teamId}/articles), 게시글 수정 (PATCH /{teamId}/articles/{articleId})
export interface CreateArticle {
  image: string | undefined;
  content: string | undefined;
  title: string | undefined;
}

// 게시글 목록 조회
export interface ArticleListResponse {
  totalCount: number;
  list: BasicArticle[];
}

// 게시글 상세 조회 (GET /{teamId}/articles/{articleId})
export interface ArticleDetail extends BasicArticle {
  isLiked: boolean;
  content: string;
}

// 게시글 삭제
export interface DeleteArticle {
  id: number;
}
