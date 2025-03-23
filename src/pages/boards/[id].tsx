import Image from 'next/image';
import Pensle from '@/assets/images/pensle.svg';
import TrashCan from '@/assets/images/trashcan.svg';
import Heart from '@/assets/images/heart-icon.svg';
import CommentForm from '@/components/Boards/CommentForm';
import CommentItem from '@/components/Boards/CommentItem';

const Board = () => {
  return (
    <div className="p-5 mx-auto max-w-[1060px]">
      {/* 게시글 영역 */}
      <div className="shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-5 rounded-[10px] md:px-[30px] md:py-10">
        <div className="border-gray-200 border-b-1 mb-[15px] pb-[11px] md:mb-[30px] md:pb-2">
          <div className="flex justify-between mb-[14px] md:mb-8">
            <p className="text-gray-500 text-2xl-sb md:text-3xl-sb">게시글 제목입니다.</p>
            <div className="flex items-center md:hidden">
              <Image src={Pensle} width={24} height={24} className="mr-3" alt="수정 아이콘" />
              <Image src={TrashCan} width={24} height={24} alt="삭제 아이콘" />
            </div>
            <div className="items-start hidden md:flex">
              <button className="text-white bg-green-200 py-[10px] px-[35px] rounded-[10px] text-md-sb mr-3">
                수정하기
              </button>
              <button className="text-white bg-green-200 py-[10px] px-[35px] rounded-[10px] text-md-sb">
                삭제하기
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-400 text-xs-r md:text-md-r">
            <div className="flex items-center">
              <p className="mr-2 md:mr-[10px] truncate max-w-20">박동욱</p>
              <p>2024.02.24.</p>
            </div>
            <div className="flex items-center">
              <Image src={Heart} width={16} height={16} className="mr-1" alt="좋아요 아이콘" />
              <p>135</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-10 xl:my-15">
        <button>목록으로</button>
      </div>

      <div className="mb-6 xl:mb-[42px]">
        <div className="flex items-center mb-2 text-lg-sb md:text-2lg-sb">
          <p className="mr-1 text-gray-500 ">댓글</p>
          <p className="text-green-200">29</p>
        </div>
        <div>
          <CommentForm />
        </div>
      </div>

      <div>
        <CommentItem />
      </div>
    </div>
  );
};

export default Board;
