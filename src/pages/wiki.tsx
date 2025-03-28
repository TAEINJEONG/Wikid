import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import UserInfo from '@/components/UserInfo';
import axiosInstance from '@/lib/api/axios';

type ProfileData = {
  profileImage: string;
  name: string;
  city: string;
  mbti: string;
  job: string;
};

const WikiPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  

  const getData = useCallback(async () => {
    if (typeof code === 'string') {
      try {
        const res = await axiosInstance.get(`/profiles/${code}`);
        setProfileData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  }, [code]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) return <div>불러오는 중...</div>;

  return (
    <div>
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {/* 이름 표시 */}
      <div className="text-[#666] text-left font-semibold text-2xl leading-tight mb-4">
        {profileData?.name}
      </div>

      {/* 프로필 카드 */}
      {profileData && (
        <UserInfo
          name={profileData.name}
          mbti={profileData.mbti}
          profileImage={profileData.profileImage}
        />
      )}
    </div> 
    
    <div
      className={
        "flex flex-col gap-8 items-start justify-start relative " 
      }
    >
      <div className="flex flex-col gap-2 items-start justify-start shrink-0 relative">
        <div className="text-grayscale-grayscale-500 text-left font-pretendard-xl-20px-semibold-font-family text-pretendard-xl-20px-semibold-font-size leading-pretendard-xl-20px-semibold-line-height font-pretendard-xl-20px-semibold-font-weight relative">
          01. 개요{" "}
        </div>
       
        <div className="text-grayscale-grayscale-500 text-left font-pretendard-md-14px-regular-font-family text-pretendard-md-14px-regular-font-size leading-pretendard-md-14px-regular-line-height font-pretendard-md-14px-regular-font-weight relative w-[335px]">
          코드잇의 콘텐츠 프로듀서이자, 프론트엔드 엔지니어. 포도마켓의
          프론트엔드 엔지니어 출신이다.{" "}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start justify-start shrink-0 relative">
        <div className="text-grayscale-grayscale-500 text-left font-pretendard-xl-20px-semibold-font-family text-pretendard-xl-20px-semibold-font-size leading-pretendard-xl-20px-semibold-line-height font-pretendard-xl-20px-semibold-font-weight relative">
          02. 취미{" "}
        </div>
       
        <div className="text-grayscale-grayscale-500 text-left font-pretendard-md-14px-regular-font-family text-pretendard-md-14px-regular-font-size leading-pretendard-md-14px-regular-line-height font-pretendard-md-14px-regular-font-weight relative w-[335px]">
          식물을 키우는 것을 좋아한다. 바질이나 로즈마리 같은 허브류부터, 파,
          당근 같은 채소류까지 다양하게 키우는 것으로 알려져 있다. 이렇게 키운
          식물들을 직접 요리에 활용하기도 한다는데, 실제로 집에 방문한 사람들에
          의하면 요리 실력 또한 상당하다고 한다.
          <br />
          <br />
          이렇게 키운 식물들을 직접 요리에 활용하기도 한다는데, 실제로 집에
          방문한 사람들에 의하면 요리 실력 또한 상당하다고 한다.{" "}
        </div>
        <div className="flex flex-row gap-5 items-start justify-start shrink-0 w-[335px] relative">
          <div className="bg-grayscale-grayscale-500 self-stretch shrink-0 w-1 relative"></div>
          <div className="text-grayscale-grayscale-500 text-left font-pretendard-md-14px-regular-font-family text-pretendard-md-14px-regular-font-size leading-pretendard-md-14px-regular-line-height font-pretendard-md-14px-regular-font-weight relative flex-1">
            여기는 Block Quote를 나타내는 영역이에요.
            <br />
            이런 식으로 텍스트가 늘어나면 영역도 같이 늘어나게 됩니다.{" "}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
export default WikiPage;