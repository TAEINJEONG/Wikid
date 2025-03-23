import { useState } from 'react';

const CommentForm = () => {
  const [commentContent, setCommentContent] = useState<string>('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 입력되기전 commentContent값이 갱신이 안될 수 있기때문에 변수에 담아서 확인
    const commentValue = e.target.value;
    if (commentValue.length > 500) return;
    setCommentContent(e.target.value);
  };

  return (
    <div className="rounded-[10px] w-full py-4 px-5 bg-gray-100">
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
        <button className="text-white bg-green-200 py-[10px] px-[34px] rounded-[10px] text-md-sb">
          댓글 등록
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
