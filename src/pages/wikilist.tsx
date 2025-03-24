import Snackbar from '@/components/common/Snackbar';
import { useState } from 'react';

const WikiList = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
      <button
        className="bg-green-200 text-white px-4 py-2 rounded"
        onClick={() => setShowSnackbar(true)}
      >
        스낵바 띄우기
      </button>

      {/* 스낵바는 하단 고정 위치로 띄움 */}
      {showSnackbar && (
        <div className="fixed bottom-6 right-6 z-50">
          <Snackbar
            type="green"
            message="저장이 완료되었습니다!"
            duration={3000}
            iconSize={20}
            onClose={() => setShowSnackbar(false)}
          />
        </div>
      )}
    </div>
  );
};

export default WikiList;
