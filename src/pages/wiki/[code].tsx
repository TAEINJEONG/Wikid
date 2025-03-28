'use client';

import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '@/lib/api/axios';
import WikiPageModal from '@/components/WikiPageModal';
import Image from 'next/image';
import downButtonIcon from '@/assets/images/downButtonIcon.jpg';
import defaultProfile from '@/assets/images/default-profile.webp';

export type Answer = {
  id: number;
  question: string;
  value: string;
};

type ProfileData = {
  name: string;
  city: string;
  mbti: string;
  job: string;
  sns?: string;
  birth?: string;
  nickname?: string;
  bloodType?: string;
  nationality?: string;
  imageUrl?: string;
};

export default function WikiPage() {
  const router = useRouter();
  const { code } = router.query;
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getData = useCallback(async () => {
    if (!code || typeof code !== 'string') return;
    try {
      const response = await axiosInstance.get(`/profiles/${code}`);
      setData(response.data);
    } catch (err) {
      console.log('데이터 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    getData();
  }, [getData]);

  const ProfileRow = ({ label, value }: { label: string; value?: string }) => (
    <>
      <div className="text-[#8F95B2] text-[12px] leading-[18px] font-normal w-[55px] h-[18px]">
        {label}
      </div>
      <div className="text-[12px] leading-[18px] text-right text-grayscale-500 w-full">
        {value || '-'}
      </div>
    </>
  );

  if (loading) return <div>불러오는 중...</div>;

  return (
    <div className="w-full flex justify-center px-4 md:px-6 lg:px-0">
      <div className="w-full max-w-[1200px] flex flex-col gap-6 py-10">
        {/* 이름 , 버튼 */}
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#4A4A6A]">
            {data?.name || '위키 사용자'}
          </h1>
          <div className="w-[160px]">
            <button
              className="bg-[#41C9A7] text-white rounded-[10px] text-sm font-semibold w-full h-[43px] md:h-[45px]"
              onClick={() => setShowModal(true)}
            >
              위키 참여하기
            </button>
          </div>
        </div>

        {/* 링크 */}
        <div className="flex items-center gap-2 bg-[#E9FAF6] px-4 py-2 rounded-xl w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#41C9A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 015.656 5.656l-3 3a4 4 0 01-5.656-5.656M10.172 13.828a4 4 0 01-5.656-5.656l3-3a4 4 0 015.656 5.656" />
          </svg>
          <a
            href={`https://www.wikied.kr/${code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#41C9A7] font-medium"
          >
            https://www.wikied.kr/{code}
          </a>
        </div>

        {/* 프로필 카드 */}
        <div className="bg-white rounded-[10px] w-[335px] px-4 py-4 flex flex-col items-center gap-4" style={{ boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.08)' }}>
          <div className="grid grid-cols-[62px_80px_1fr] gap-x-4 gap-y-1 w-full">
            <Image
              src={data?.imageUrl || defaultProfile}
              alt="profile"
              width={62}
              height={62}
              className="rounded-full object-cover row-span-[9]"
            />
            <ProfileRow label="이름" value={data?.name} />
            <ProfileRow label="거주도시" value={data?.city} />
            <ProfileRow label="MBTI" value={data?.mbti} />
            <ProfileRow label="직업" value={data?.job} />
            {showMore && (
              <>
                <ProfileRow label="SNS 계정" value={data?.sns} />
                <ProfileRow label="생일" value={data?.birth} />
                <ProfileRow label="별명" value={data?.nickname} />
                <ProfileRow label="혈액형" value={data?.bloodType} />
                <ProfileRow label="국적" value={data?.nationality} />
              </>
            )}
          </div>
          <button onClick={() => setShowMore(prev => !prev)} className="mt-2 transition-transform">
            <Image
              src={downButtonIcon}
              alt="펼치기 버튼"
              width={24}
              height={24}
              className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* 모달 */}
        {showModal && (
          <WikiPageModal
            initialAnswers={[]}
            onClose={() => setShowModal(false)}
            onSubmit={(answers: Answer[]) => {
              console.log('제출된 답변:', answers.map(a => a.value));
              setShowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
