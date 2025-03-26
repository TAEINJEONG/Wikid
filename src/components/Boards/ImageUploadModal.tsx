import Image from 'next/image';
import CloseIcon from '@/assets/images/close-icon.svg';
import Camra from '@/assets/images/camra.svg';
import { useRef, useState } from 'react';
// import axiosInstance from '@/lib/api/axios';

interface ModalProps {
  onClick: (image: FormData | null) => void;
  onClose?: () => void;
}

const ImageUploadModal = ({ onClose, onClick }: ModalProps) => {
  const [imageData, setImageData] = useState<FormData>();
  const [blobImage, setBlobImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickFileUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const uploadProductImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file[0]) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file[0].type)) {
        alert('jpg, jpeg, png 파일만 업로드 가능합니다.');
        return;
      }

      const blobUrl = URL.createObjectURL(file[0]);
      setBlobImage(blobUrl);

      const formData = new FormData();
      formData.append('image', file[0]);
      setImageData(formData);
      e.target.value = '';
    }
  };

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
        <p className="mb-5 text-center text-gray-500 text-2lg-sb">이미지</p>

        {blobImage ? (
          <div className="relative w-full h-40 rounded-[10px] mb-5 overflow-hidden">
            <Image src={blobImage} fill alt="업로드된 이미지" objectFit="cover" />
          </div>
        ) : (
          <>
            <button
              onClick={handleClickFileUpload}
              className="flex items-center justify-center w-full h-40 bg-gray-100 rounded-[10px] mb-5 cursor-pointer"
            >
              <Image src={Camra} width={36} height={36} alt="사진 아이콘" />
            </button>
          </>
        )}
        <div className="flex justify-end">
          <button
            disabled={!imageData}
            onClick={() => {
              onClick(imageData ?? null);
              if (onClose) {
                onClose();
              }
            }}
            className="px-5 py-2 bg-green-200 rounded-[10px] cursor-pointer"
          >
            삽입하기
          </button>
        </div>
      </div>

      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        ref={fileInputRef}
        onClick={(e) => e.stopPropagation()}
        onChange={uploadProductImage}
      />
    </div>
  );
};

export default ImageUploadModal;
