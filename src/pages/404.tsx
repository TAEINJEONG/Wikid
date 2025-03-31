import Image from "next/image";
import Link from "next/link";

const PageError = () => {
  return (
    <>
    <div>헤더</div>
      <div className="px-[10px] py-[80px] flex flex-col items-center">
        <div className="relative w-[800px] h-[360px] mb-[20px] overflow-hidden">
          <Image src="/images/notFoundImg.jpg" alt="404 Not Found" layout="fill" objectFit="cover"/>
        </div>
        <div className="font-pre font-[700] text-[#4CBFA4]" style={{ fontSize: '36px' }}>페이지를 찾을 수 없습니다</div>
        <div className="mt-[40px] px-[16px] py-[24px] border-2 border-dashed border-[rgba(71,77,102,0.3)] rounded-[10px]">
          <p className="font-pre text-lg-sb text-[rgba(71,77,102,0.5)]">존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
          <p className="font-pre text-lg-sb text-[rgba(71,77,102,0.5)]">입력하신 주소가 맞는지 다시 확인 주세요.</p>
        </div>
        <div className="mt-[24px]">
          <Link href="/" className="px-4 py-2 bg-[#4CBFA4] font-pre text-white font-[48px] font-[500] rounded-lg shadow-lg hover:bg-[#3AA98E] transition-colors">
            홈으로 이동
          </Link>
        </div> 
      </div>
    </>
  );
};

export default PageError;