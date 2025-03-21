import { useInView } from 'react-intersection-observer';
// import keyboard from "@/assets/images/keyboard.svg";
// import chat from "@/assets/images/chat.svg";
import test3 from '@/assets/images/img.png';
import background from '@/assets/images/landing-page-background.svg';
import tabletBackground from '@/assets/images/landing-page-tablet-background.svg';
import mobileBackground from '@/assets/images/landing-page-mobile-background.svg';
import Image from 'next/image';

const Index = () => {
  const { ref: firstRef, inView: firstInView } = useInView({ threshold: 0.3 });
  // const { ref: secondRef, inView: secondInView } = useInView({ threshold: 0.1 });
  // const { ref: thirdRef, inView: thirdInView } = useInView({ threshold: 0.3 });
  return (
    <>
      <div className="h-20">Header Nav</div>

      <div className="h-[2125px] relative bg-[#F1F4FD]">
        <div className="h-[713px] relative">
          <div className="mx-auto max-w-md text-center pt-30 text-gray-500">
            <p className="text-[60px] font-[300]">남들이 만드는</p>
            <h1 className="text-[90px] font-[700]">나만의 위키</h1>
            <button>위키 만들기</button>
          </div>

          <div
            ref={firstRef}
            className={`
              mx-auto max-w-md transition-all duration-400 transform absolute bottom-[-264px]
              xl:bottom-[-338px] left-1/2 -translate-x-1/2
              ${firstInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
            `}
          >
            <div className="w-[336px] h-[398px] xl:w-[498px] xl:h-[590px]">
              <Image
                src={test3}
                alt="애니메이션 이미지"
                width={498}
                height={590}
                layout="responsive"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* <div className="absolute top-[1244px] left-1/2 -translate-x-1/2 w-full">
        <div className="flex justify-center">
          <div className="h-[681px] mr-10 flex flex-col justify-between">
            <div>
              <p className="text-[30px] font-[700] text-green-200">WRITE</p>
              <p className="text-[50px] font-[400] text-white">친구의 위키,<br />직접 작성해 봐요</p>
            </div>
            <div
              ref={secondRef}
              className={`transition-all duration-800 transform
                ${ secondInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-14" }`}
            >
              <div className="w-[310px] bg-green-200 rounded-[20px]">
                <Image src={keyboard} alt="애니메이션 이미지" className="w-full rounded-lg shadow-lg w-[310px] h-[450px]" />
              </div>
            </div>
          </div>

          <div>
            <div
              ref={thirdRef}
              className={`transition-all duration-1400 transform
                ${ thirdInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12" }`}
            >
              <div className="w-[520px] rounded-[20px]">
                <Image src={chat} alt="애니메이션 이미지" className="w-full rounded-lg shadow-lg w-[520px] h-[681px]" />
              </div>
            </div>
          </div> 
        </div>
      </div> */}

        <div className="block lg:hidden w-full">
          <Image
            src={mobileBackground}
            alt="mobile 랜딩 페이지 배경 이미지"
            width={493}
            height={714}
            layout="responsive"
          />
        </div>

        <div className="hidden lg:block xl:hidden w-full">
          <Image
            src={tabletBackground}
            alt="tablet 랜딩 페이지 배경 이미지"
            width={784}
            height={1059}
            layout="responsive"
          />
        </div>

        <div className="hidden xl:block w-full">
          <Image
            src={background}
            alt="pc 랜딩 페이지 배경 이미지"
            width={1920}
            height={1412}
            layout="responsive"
          />
        </div>
      </div>
    </>
  );
};

export default Index;
