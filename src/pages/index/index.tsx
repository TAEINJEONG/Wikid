import FirstLandingSection from './compoents/FirstLandingSection';
import SecondLadingSection from './compoents/SecondLadingSection';

const Index = () => {
  return (
    <div className="bg-[#F1F4FD]">
      <div className="h-20">Header Nav</div>

      {/* 랜딩 페이지 첫 번째 영역 */}
      <FirstLandingSection />
      <SecondLadingSection />
    </div>
  );
};

export default Index;
