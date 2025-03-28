// 게시글의 댓글 (댓글 작성 및 수정에 사용)
export interface BasicComment {
  content: string;
}

// 게시글의 댓글 목록 조회 (GET /{teamId}/articles/{articleId}/comments)
export interface CommentsListResponse {
  nextCursor: number;
  list: [
    {
      writer: {
        image: string;
        name: string;
        id: number;
      };
      updatedAt?: string;
      createdAt?: string;
      content: string;
      id: number;
    },
  ];
}

export interface CommentListData {
  comment: {
    writer: {
      image: string;
      name: string;
      id: number;
    };
    updatedAt?: string;
    createdAt?: string;
    content: string;
    id: number;
  };
}

// 댓글 삭제 (DELETE /{teamId}/comments/{commentId})
export interface DeleteCommentId {
  id: number;
}
