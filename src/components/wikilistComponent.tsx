import { useRouter } from 'next/router';
import { ProfileIcon } from './common/Icons';
import Link from './common/Link';

interface cardProps {
  width?: string;
  height?: string;
  name: string;
  code: string;
  image?: string;
  city: string;
  nationality: string;
  job: string;
}

export const Card = ({
  width = '100%',
  height = '142px',
  name,
  code,
  image = '',
  city,
  nationality,
  job,
}: cardProps) => {
  const router = useRouter();
  const URL = `https://www.wikied.kr/(배포사이트)/${code}`;

  function handLinkClick(){
    router.push(URL);
  }

  return (
    <div
      className="px-[36px] py-[24px] rounded-[10px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] cursor-pointer"
      style={{ width, height }}
    >
      <div className="w-[100%] h-[100%] flex">
        <div className="w-[30%] h-[100%] flex gap-[32px]">
          <div className="w-[85px] h-[85px]">{ProfileIcon({ size: 85 })}</div>
          <div className="flex flex-col gap-[14px]">
            <div className="font-pre text-2xl-sb text-gray-500">{name}</div>
            <div className="flex flex-col">
              <span className="font-pre text-md-r text-gray-400">
                {city}, {nationality}
              </span>
              <span className="font-pre text-md-r text-gray-400">{job}</span>
            </div>
          </div>
        </div>
        <div className="w-[70%] h-[100%] relative">
          <div className="absolute bottom-0 right-0" onClick={handLinkClick}>
            { name ?
              <Link
                url={URL}
                text={URL}
              /> :
              null
            }
          </div>
        </div>
      </div>
    </div>
  );
};
