import FirstLandingSection from '@/components/indexComponents/FirstLandingSection';
import SecondLadingSection from '@/components/indexComponents/SecondLadingSection';
import ThirdLandingSection from '@/components/indexComponents/ThirdLandingSection';
import { GetStaticProps } from 'next';

const Index = () => {
  return (
    <div className="bg-[#F1F4FD] mx-auto">
      <div className="h-20">Header Nav</div>

      <FirstLandingSection />
      <SecondLadingSection />
      <ThirdLandingSection />

      <div className="flex flex-col items-center mx-auto bg-gray-500 py-25 md:py-40 xl:py-50">
        <h1 className="text-[30px] md:text-[60px] font-[700] text-white mb-[30px] md:mb-10">
          나만의 위키 만들어 보기
        </h1>
        <button>지금 시작하기</button>
      </div>

      <footer className="px-5 py-10 text-white bg-gray-600 md:px-12 md:py-15 xl:px-20 xl:py-20">
        <p className="mb-[10px] text-[10px] md:text-[16px] font-[700]">
          Copyright ⓒ Wikied. All Rights Reserved
        </p>
        <p className="mb-5 md:mb-[30px] text-[10px] md:text-[14px] font-[400]">
          사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표
          : 이지은 서울특별시 중구 청계천로 123, 위키드빌딩
        </p>

        <div className="flex items-center justify-start gap-[15px]">
          <p className="text-[8px] md:text-[14px] font-[500]">
            서비스 이용약관
          </p>
          <p className="text-[8px] md:text-[14px] font-[500]">
            개인정보 취급방침
          </p>
          <p className="text-[8px] md:text-[14px] font-[500]">
            전자금융거래 기본약관
          </p>
        </div>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Index;
