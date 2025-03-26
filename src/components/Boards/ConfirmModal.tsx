import Image from 'next/image';
import CloseIcon from '@/assets/images/close-icon.svg';

interface ModalProps {
  onClick: () => void;
  onClose: () => void;
}

const ConfirmModal = ({ onClose, onClick }: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-screen bg-black/74 backdrop-opacity-5"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="p-5 w-[375px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-1 rounded-[24px] bg-white"
      >
        <div className="flex justify-end w-full mb-[10px]">
          <Image
            src={CloseIcon}
            width={20}
            height={20}
            alt="닫기 아이콘"
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <p className="mb-5 text-center text-red-200 text-2xl-b">삭제하시겠습니까?</p>
        <p className="mb-5 text-center text-gray-500 text-lg-b">삭제하시면 복구하실 수 없습니다.</p>

        <div className="flex justify-end gap-2">
          <button
            className="px-5 py-2 bg-green-200 rounded-[10px] cursor-pointer w-1/2"
            onClick={onClick}
          >
            확인
          </button>
          <button
            className="px-5 py-2 bg-green-200 rounded-[10px] cursor-pointer w-1/2"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
