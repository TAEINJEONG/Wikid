import { useInView } from 'react-intersection-observer';
import keyboard from '@/assets/images/keyboard.svg';
import chat from '@/assets/images/chat.svg';
import test3 from '@/assets/images/img.png';
import background from '@/assets/images/landing-page-background.svg';
import bigestBackground from '@/assets/images/bigest-landing-page-background.svg';
import Image from 'next/image';

const FirstLandingSection = () => {
  const { ref: firstRef, inView: firstInView } = useInView({ threshold: 0.3 });
  const { ref: secondRef, inView: secondInView } = useInView({
    threshold: 0.1,
  });
  const { ref: thirdRef, inView: thirdInView } = useInView({ threshold: 0.3 });
  return (
    <>
      <div className="h-[502px] md:h-[784px] xl:h-[713px] relative z-9">
        <div className="max-w-md mx-auto text-center text-gray-500 pt-25 md:pt-30">
          <p className="text-[40px] md:text-[60px] font-[300]">남들이 만드는</p>
          <h1 className="text-[60px] md:text-[90px] font-[700]">나만의 위키</h1>
          <button>위키 만들기</button>
        </div>

        <div
          ref={firstRef}
          className={`
              mx-auto max-w-md transition-all duration-400 transform absolute top-[368px] md:bottom-[-264px]
              xl:bottom-[-338px] left-1/2 -translate-x-1/2 w-[336px] h-[398px] md:w-[498px] md:h-[590px]
              ${firstInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
            `}
        >
          <div className="w-full h-full">
            <Image
              src={test3}
              alt="애니메이션 이미지"
              width={498}
              height={590}
              layout="responsive"
              priority
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div className="absolute top-[966px] md:top-[1204px] xl:top-[1244px] left-1/2 -translate-x-1/2 w-full z-9">
        <div className="flex justify-center max-h-[250px] md:max-h-[479px] xl:max-h-[681px]">
          <div className="flex flex-col justify-between mr-[10px] xl:mr-10">
            <div>
              <p className="text-[10px] md:text-[20px] xl:text-[30px] font-[700] text-green-200">
                WRITE
              </p>
              <p className="text-white text-lg-r md:text-3xl-b md:font-[400] xl:text-[50px] xl:font-[400] xl:leading-[52px]">
                친구의 위키,
                <br />
                직접 작성해 봐요
              </p>
            </div>
            <div
              ref={secondRef}
              className={`transition-all duration-800 transform
                ${secondInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}
            >
              <div className="w-[133px] h-[162px] md:w-[262px] md:h-[322px] xl:w-[364px] xl:h-[450px] bg-green-200 rounded-[20px] overflow-hidden">
                <Image
                  src={keyboard}
                  alt="애니메이션 이미지"
                  className="object-cover h-full overflow-hidden bg-green-200"
                />
              </div>
            </div>
          </div>

          <div>
            <div
              ref={thirdRef}
              className={`transition-all duration-1600 transform
                ${thirdInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              <div className="w-[192px] h-[250px] md:w-[365px] md:h-[479px] xl:w-[520px] xl:h-[681px]">
                <Image
                  src={chat}
                  alt="애니메이션 이미지"
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden ultra:block w-full h-[1412px] relative">
        <Image
          src={bigestBackground}
          alt="1920이상 랜딩 페이지 배경 이미지"
          fill
          className="object-cover"
        />
      </div>

      <div className="block ultra:hidden w-full h-[714px] md:h-[1059px] xl:h-[1412px] relative">
        <Image
          src={background}
          alt="1920미만 랜딩 페이지 배경 이미지"
          fill
          className="object-cover"
        />
      </div>
    </>
  );
};

export default FirstLandingSection;
