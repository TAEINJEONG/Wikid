import { useEffect, useState } from 'react';

interface CommentProps {
  onClick: (comment: string) => void;
  initialValue?: string;
}

const CommentForm = ({ onClick, initialValue = '' }: CommentProps) => {
  const [commentContent, setCommentContent] = useState<string>('');

  useEffect(() => {
    setCommentContent(initialValue);
  }, [initialValue]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const commentValue = e.target.value;
    if (commentValue.length > 500) return;
    setCommentContent(e.target.value);
  };

  return (
    <div className="mb-[14px] md:mb-4 xl:mb-6 rounded-[10px] w-full py-4 px-5 bg-gray-100">
      <textarea
        className="w-full text-gray-500 outline-none text-md-r placeholder:text-md-r placeholder:gray-400 caret-green-300"
        placeholder="댓글을 입력해 주세요"
        onChange={handleCommentChange}
        value={commentContent}
      />
      <div className="flex items-end justify-between">
        <p className="text-gray-300 text-md-r">
          {commentContent ? commentContent?.length : 0} / 500
        </p>
        <button
          className="text-white bg-green-200 py-[10px] px-[34px] rounded-[10px] text-md-sb"
          onClick={() => {
            onClick(commentContent);
            setCommentContent('');
          }}
        >
          {initialValue ? '수정 완료' : '댓글 등록'}
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
