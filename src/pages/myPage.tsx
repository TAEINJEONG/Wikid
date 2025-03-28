import { useState } from "react";

export default function MyPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [wikiMessage, setWikiMessage] = useState<string>('');

  const styles = {
    buttonBg: 'bg-[#4CBFA4]',
    buttonHover: 'hover:bg-[#3AA78C]',
    inputBg: 'bg-[#F7F7FA]',
    textColor: 'text-[#474D66]',
    dividerColor: 'bg-[#E4E5F0]',
    errorColor: 'text-[#FF4D4D] border-[#FF4D4D] focus:ring-[#FF4D4D]',
  };

  // 비밀번호 확인 체크
  const handleConfirmBlur = () => {
    setError(
      newPassword !== confirmPassword ? '비밀번호가 일치하지 않습니다.' : ''
    );
  };

  // 비밀번호 변경 API 요청
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await fetch('/api/mypage/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('비밀번호가 변경되었습니다!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
      } else {
        setError(data.message || '비밀번호 변경 실패');
      }
    } catch {
      setError('서버 오류 발생');
    }
  };

  // 위키 생성 API 요청
  const createWiki = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question || !answer) {
      setWikiMessage('질문과 답을 입력해주세요.');
      return;
    }

    try {
      const res = await fetch('/api/mypage/create-wiki', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });

      const data = await res.json();
      if (res.ok) {
        setWikiMessage('위키가 생성되었습니다!');
        setQuestion('');
        setAnswer('');
        setSuccess('');
      } else {
        setWikiMessage(data.message || '위키 생성 실패');
      }
    } catch {
      setWikiMessage('서버 오류 발생');
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-6 bg-white rounded-lg font-pretendard">
      {/* 계정 설정 제목 */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mt-[172px] mb-[64px]">
        계정 설정
      </h2>

      {success && <p className="text-green-500">{success}</p>}

      {/* 비밀번호 변경 섹션 */}
      <div className="flex flex-col space-y-2">
        <label className={`${styles.textColor} text-[14.5px] font-bold`}>
          비밀번호 변경
        </label>

        <form onSubmit={handlePasswordChange} className="flex flex-col space-y-4 w-full items-center">
          <div className="w-[335px] md:w-[400px] flex flex-col space-y-2 relative">
            <input
              type="password"
              placeholder="기존 비밀번호"
              className={`w-full h-[45px] ${styles.inputBg} text-[14px] rounded-[10px] px-5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none`}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="새 비밀번호"
              className={`w-full h-[45px] ${styles.inputBg} text-[14px] rounded-[10px] px-5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="새 비밀번호 확인"
              className={`w-full h-[45px] ${styles.inputBg} text-[14px] rounded-[10px] px-5 text-gray-700 placeholder-gray-400 focus:ring-2 ${
                error ? styles.errorColor : 'focus:ring-blue-400'
              } outline-none`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmBlur}
              required
            />

            {error && <p className={`${styles.errorColor} text-[14px] absolute bottom-[-20px] left-1`}>{error}</p>}
          </div>

          <button
            type="submit"
            className={`w-[89px] h-[40px] ${styles.buttonBg} ${styles.buttonHover} text-white rounded-[10px] text-[14px] self-end mt-[2px]`}
          >
            변경하기
          </button>
        </form>
      </div>

      <div className={`w-[335px] md:w-[400px] h-[1px] ${styles.dividerColor} my-[32px]`} />

      {/* 위키 생성하기 섹션 */}
      <div className="flex flex-col space-y-2">
        <label className={`${styles.textColor} text-[14.5px] font-bold`}>
          위키 생성하기
        </label>

        <form onSubmit={createWiki} className="flex flex-col space-y-2 w-full items-center">
          <div className="w-[335px] md:w-[400px] flex flex-col space-y-2">
            <input
              type="text"
              placeholder="질문을 입력해 주세요"
              className={`w-full h-[45px] ${styles.inputBg} text-[14px] rounded-[10px] px-5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none`}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="답을 입력해 주세요"
              className={`w-full h-[45px] text-[14px] ${styles.inputBg} rounded-[10px] px-5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none`}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-[89px] h-[40px] ${styles.buttonBg} ${styles.buttonHover} text-white text-[14px] rounded-[10px] self-end mt-[20px]`}
          >
            생성하기
          </button>
        </form>

        {wikiMessage && <p className={`${styles.errorColor}`}>{wikiMessage}</p>}
      </div>
    </div>
  );
}
