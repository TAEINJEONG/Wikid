// pages/wiki/[code].tsx
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

type ProfileData = {
  name: string;
  city: string;
  mbti: string;
  job: string;
};

// type Answer = {
//   question: string
//   answer: string
// }

// type WikiData = {
//   name: string
//   mbti: string
//   profileImage: string
//   answers: Answer[]
// }

const WikiPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState();

  console.log(id);
  const fetchData = useCallback(async () => {
    // if (id ) {
    try {
      // 엑세스 토큰을 가져온다고 가정
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidGVhbUlkIjoiZGVmYXVsdCIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzQyOTcxNDY5LCJleHAiOjE3NDI5NzMyNjksImlzcyI6InNwLXdpa2llZCJ9._5IBiiLcdOu7Jjp6JROffLokRTChFh6G9fdhgIx8yvY'; // 실제로는 로그인 후 받아온 accessToken을 사용해야 합니다.

      // 위키 데이터 요청 (엑세스 토큰 추가)
      // const wikiRes = await fetch(`/13-3/profiles/${id}`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     "Authorization": `Bearer ${accessToken}`, // 엑세스 토큰을 헤더에 추가
      //   },
      // });
      // const wikiData = await wikiRes.json();
      // setWikiData(wikiData);

      // 프로필 데이터 요청 (엑세스 토큰 추가)
      const profileRes = await fetch(`/13-3/profiles/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // 엑세스 토큰을 헤더에 추가
        },
      });
      const profileData = await profileRes.json();
      setProfileData(profileData);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
    // }
    console.log('useEffect 실행 됩니다.');
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    setTimeout(() => {
      setData({
        name: '신주하',
        city: '서울',
        mbti: 'INFJ',
        job: '코드잇 프로듀서',
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <div>불러오는 중...</div>;

  return (
    <div className="relative">
      <div
        className="bg-grayscale-50 rounded-[10px] w-[335px] h-[126px]"
        style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.08)' }}
      >
        <div className="flex flex-col gap-2 items-start justify-start absolute left-[102px] top-[15px]">
          {/* 이름 */}
          <div className="flex flex-row gap-2.5 items-start">
            <div className="text-grayscale-400 w-[55px]">이름</div>
            <div className="text-grayscale-500">{data?.name}</div>
          </div>

          {/* 거주 도시 */}
          <div className="flex flex-row gap-2.5 items-start">
            <div className="text-grayscale-400 w-[55px]">거주 도시</div>
            <div className="text-grayscale-500">{data?.city}</div>
          </div>

          {/* MBTI */}
          <div className="flex flex-row gap-2.5 items-start">
            <div className="text-grayscale-400 w-[55px]">MBTI</div>
            <div className="text-grayscale-500">{data?.mbti}</div>
          </div>

          {/* 직업 */}
          <div className="flex flex-row gap-2.5 items-start">
            <div className="text-grayscale-400 w-[55px]">직업</div>
            <div className="text-grayscale-500">{data?.job}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiPage;
