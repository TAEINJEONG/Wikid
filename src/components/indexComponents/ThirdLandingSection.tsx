import { useInView } from 'react-intersection-observer';
import Alram from '@/assets/images/alram.svg';
import Review from '@/assets/images/review.svg';
import Bell from '@/assets/images/bell.svg';
import Image from 'next/image';

const ThirdLandingSection = () => {
  const { ref: reviewRef, inView: review } = useInView({ threshold: 0.3 });
  const { ref: bellRef, inView: bell } = useInView({ threshold: 0.2 });
  const { ref: alramRef, inView: alram } = useInView({ threshold: 0.2 });
  return (
    <div className="px-5 overflow-hidden py-25 md:py-40 xl:py-50">
      <div className="max-w-[335px] md:max-w-[648px] xl:max-w-[924px] w-full mx-auto mb-10 md:mb-20 mb-text-end">
        <p className="mb-[10px] md:mb-[32px] xl:mb-[20px] text-[10px] md:text-[20px] xl:text-[30px] font-[700] text-green-200">
          VIEW
        </p>
        <p className="text-gray-500 text-lg-r md:text-3xl-b md:font-[400] xl:text-[50px] xl:font-[400] xl:leading-[52px]">
          친구들이 달아준
          <br />
          내용을 확인해 봐요
        </p>
      </div>

      <div className="mx-auto max-w-[335px] md:max-w-[648px] xl:max-w-[924px]">
        <div
          ref={reviewRef}
          className={`transition-all duration-800 transform mb-[10px] md:mb-[22px] xl:mb-10
          ${review ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-30'}`}
        >
          <div className="w-[335px] h-[102px] md:w-[648px] md:h-[196px] xl:w-[924px] xl:h-[280px] bg-green-200 rounded-[20px]">
            <Image
              src={Review}
              alt="리뷰 애니메이션 이미지"
              className="object-cover h-full bg-green-200 rounded-[20px]"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div
            ref={bellRef}
            className={`transition-all duration-1200 transform mr-[10px] md:mr-[22px] xl:mr-10
            ${bell ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-30'}`}
          >
            <div className="w-[102px] h-[102px] md:w-[198px] md:h-[198px] xl:w-[280px] xl:h-[280px] rounded-[20px] overflow-hidden">
              <Image
                src={Bell}
                alt="벨 애니메이션 이미지"
                className="object-cover h-full overflow-hidden bg-purple-100"
              />
            </div>
          </div>

          <div
            ref={alramRef}
            className={`transition-all duration-1400 transform
            ${alram ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'}`}
          >
            <div className="w-[223px] h-[102px] md:w-[428px] md:h-[198px] xl:w-[604px] xl:h-[280px] rounded-[20px]">
              <Image
                src={Alram}
                alt="알림 애니메이션 이미지"
                className="object-cover h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdLandingSection;
