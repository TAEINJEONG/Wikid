import Image from 'next/image';

interface ProfileData {
  id: string;
  name: string;
  image?: string;
  job: string;
  mbti: string;
  city: string;
}

interface Props {
  data: ProfileData;
}

export default function ProfileComponent({ data }: Props) {
  return (
    <div>
      <div className="max-w-2xl p-4 mx-auto">
        <div className="flex items-start gap-6">
          <div className="shrink-0 relative w-[120px] h-[120px]">
            <Image
              src={data.image ?? ''} // 기본 이미지 설정
              alt={data.name}
              width={120} // 고정된 너비
              height={120} // 고정된 높이
              className="object-cover border-2 border-gray-200 rounded-full"
            />
          </div>
        </div>

        <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-2xl font-bold">{data.name}</h1>
          <div className="space-y-3">
            <p className="text-gray-700">직업: {data.job}</p>
            <p className="text-gray-700">MBTI: {data.mbti}</p>
            <p className="text-gray-700">도시: {data.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
