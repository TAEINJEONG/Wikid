import { useState } from 'react';

type UserInfoProps = {
  name: string;
  mbti: string;
  profileImage: string;
};

// 모달 컴포넌트
const UserInfoModal = ({
  name,
  mbti,
  onClose,
}: {
  name: string;
  mbti: string;
  onClose: () => void;
}) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{name}의 상세 정보</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div className="space-y-2">
        <p>
          <span className="font-medium">MBTI:</span> {mbti}
        </p>
        <p>
          <span className="font-medium">상태:</span> 온라인
        </p>
        <p>
          <span className="font-medium">활동:</span> 15분 전 접속
        </p>
      </div>
    </div>
  </div>
);

// 메인 컴포넌트
const UserInfo: React.FC<UserInfoProps> = ({ name, mbti, profileImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 사용자 정보 카드 */}
      <div
        className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* <img
          src={profileImage}
          alt={`${name} 프로필`}
          className="w-14 h-14 rounded-full object-cover border-2 border-purple-100"
        /> */}
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full mt-1 w-fit">
            {mbti}
          </p>
        </div>
      </div>

      {/* 모달 표시 조건 */}
      {isModalOpen && (
        <UserInfoModal
          name={name}
          mbti={mbti}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserInfo;
