import Image from "next/image";
import Link from "next/link";

const PageError = () => {
  return (
    <>
    <div className="px-[10px] py-[80px] flex flex-col items-center">
      <div className="relative w-[800px] h-[360px] mb-[20px] overflow-hidden">
        <Image src="/images/notFoundImg.jpg" alt="404 Not Found" layout="fill" objectFit="cover"/>
        <div className="frame">
          <div className="circle animate-circle"></div>
          <div className="center">
            <svg className="line animate-line" stroke="#fff" width="400px" height="400px" viewBox="0 0 400 400" version="1.1">
              <path className="st0" d="M-34.8,166.8c51.6,1.9,70.9,16.4,78.4,30.3c10.9,20.1-3.6,37.5,6.9,75c3.9,14,11.8,42.2,33.7,50.9
                c25.7,10.2,65.3-8.7,76.4-36.5c13.8-34.4-26.4-57.5-19.3-110.1c3.3-24.1,17.1-58.7,44.7-67.4c34.9-10.9,84.3,21.7,90.8,65.4
                c5.3,36-20.6,66.1-42.6,79.8c-39.5,24.5-95.7,14.9-108-7.6c-0.5-0.9-7.9-14.7-2.1-22.7c3.7-5,10.9-5.4,13.1-5.5
                c15.4-0.8,28.1,12.1,33,17.2c46.5,48.5,53.9,63.9,72.2,75.7c24.1,15.6,66.1,24.2,90.8,6.9c36.4-25.5,7.6-88,49.5-130.7
                c17.6-17.9,40-24.6,56.4-27.5"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="font-pre font-[700] text-[#4CBFA4]" style={{ fontSize: '36px' }}>페이지를 찾을 수 없습니다</div>
      <div className="mt-[40px] px-[16px] py-[24px] border-2 border-dashed border-[rgba(71,77,102,0.3)] rounded-[10px]">
        <p className="font-pre text-lg-sb text-[rgba(71,77,102,0.5)]">존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
        <p className="font-pre text-lg-sb text-[rgba(71,77,102,0.5)]">입력하신 주소가 맞는지 다시 확인해 주세요.</p>
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