const PageError = () => {
  return (
    <>
    <div>헤더</div>
      <div className="px-[10px] py-[144px] flex flex-col items-center">
        <div className="w-[600px] h-[200px] mb-[20px] border border-red-500">404 찾을 수 없습니다 이미지</div>
        <div className="font-pre text-2xl-b">페이지를 찾을 수 없습니다</div>
        <div className="mt-[30px]">
          <p className="font-pre text-lg-r">존재하지 않거나, 사용할 수 없는 페이지입니다</p>
          <p className="font-pre text-lg-r">입력하신 주소가 맞는지 다시 확인 주세요</p>
        </div>
      </div>
    </>
  );
};

export default PageError;