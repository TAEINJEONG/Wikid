import UserDefaultIcon from '@/assets/images/user-default-icon.svg';
import Pensle from '@/assets/images/pensle.svg';
import TrashCan from '@/assets/images/trashcan.svg';
import { CommentListData } from '@/types/Comment';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import CommentForm from './CommentForm';
import axiosInstance from '@/lib/api/axios';

interface CommentItemProps extends CommentListData {
  onClick: (id: number) => void;
  onUpdate: () => void;
}

const CommentItem = ({ comment, onClick, onUpdate }: CommentItemProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onClose = () => {
    setIsOpenModal(false);
  };

  const editComment = async (updatedComment: string) => {
    try {
      await axiosInstance.patch(`/comments/${comment.id}`, {
        content: updatedComment,
      });
      setIsEditMode(false);
      onUpdate();
    } catch (e) {
      console.log(e);
    }
  };

  const formattedDate = comment?.createdAt
    ? new Date(comment.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  return (
    <>
      {!isEditMode ? (
        <div className="flex mb-[14px] md:mb-4 xl:mb-6 px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px] items-start md:px-[30px] md:py-5">
          <UserDefaultIcon className="mr-[15px] md:mr-5 md:w-[50px] md:h-[50px] w-10 h-10" />
          <div className="w-full">
            <div className="flex items-start justify-between md:mb-[6px]">
              <p className="text-gray-500 text-lg-sb md:text-2lg-b">
                {comment.writer.name}
              </p>
              <div className="flex items-center">
                <Pensle
                  className="mr-[15px] md:w-6 md:h-6 w-[20px] h-[20px]"
                  onClick={() => setIsEditMode(true)}
                />
                <TrashCan
                  className="w-5 h-5 md:w-6 md:h-6"
                  onClick={() => setIsOpenModal(true)}
                />
              </div>
            </div>
            <p className="mb-1 md:mb-[10px] text-gray-500 text-md-r md:text-lg-r">
              {comment?.content}
            </p>
            <p className="text-gray-400 text-xs-r md:text-md-r">
              {formattedDate}
            </p>
          </div>
          {isOpenModal && (
            <ConfirmModal
              onClick={() => onClick(comment.id)}
              onClose={onClose}
            />
          )}
        </div>
      ) : (
        <CommentForm
          initialValue={comment.content}
          onClick={(updatedContent: string) => editComment(updatedContent)}
        />
      )}
    </>
  );
};

export default CommentItem;
