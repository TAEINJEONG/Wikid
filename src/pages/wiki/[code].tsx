import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '@/lib/api/axios';  // axiosInstance import

type ProfileData = {
  name: string;
  city: string;
  mbti: string;
  job: string;
};

const WikiPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    if (code) {
      try {
         
        const response = await axiosInstance.get(`/13-3/profiles/${code}`);
        setData(response.data);  
        setLoading(false);   
      } catch (err) {
        console.log('데이터 로드 실패:', err);
        setLoading(false);
      }
    }
  }, [code]);

  useEffect(() => {
    getData();   
  }, [getData]);

  if (loading) return <div>불러오는 중...</div>;

  return (
    <div className="relative">
      <div
        className="bg-grayscale-50 rounded-[10px] w-[335px] h-[126px]"
        style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.08)" }}
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
