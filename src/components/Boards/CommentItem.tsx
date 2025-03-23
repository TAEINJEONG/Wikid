import Image from 'next/image';
import UserDefaultIcon from '@/assets/images/user-default-icon.svg';
import Pensle from '@/assets/images/pensle.svg';
import TrashCan from '@/assets/images/trashcan.svg';

const CommentItem = () => {
  return (
    <div className="flex px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px] items-start md:px-[30px] md:py-5">
      <Image
        src={UserDefaultIcon}
        width={40}
        height={40}
        className="mr-[15px] md:mr-5 md:w-[50px] md:h-[50px]"
        alt="사용자 이미지"
      />
      <div className="w-full">
        <div className="flex items-start justify-between md:mb-[6px]">
          <p className="text-gray-500 text-lg-sb md:text-2lg-b">독케익</p>
          <div className="flex items-center">
            <Image
              src={Pensle}
              width={20}
              height={20}
              className="mr-[15px] md:w-6 md:h-6"
              alt="수정 아이콘"
            />
            <Image
              src={TrashCan}
              width={20}
              height={20}
              className="md:w-6 md:h-6"
              alt="삭제 아이콘"
            />
          </div>
        </div>
        <p className="mb-1 md:mb-[10px] text-gray-500 text-md-r md:text-lg-r">
          실제로 집에 방문한 사람들에 의하면 요리 실력 또한 상당하다고 한다.
        </p>
        <p className="text-gray-400 text-xs-r md:text-md-r">2024.02.26.</p>
      </div>
    </div>
  );
};

export default CommentItem;
