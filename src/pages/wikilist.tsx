import Button from '@/components/common/Button';

const WikiList = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
      <Button variant="primary" width="120px">
        내 위키 만들기
      </Button>
      <Button variant="primary" width="400px">
        로그인
      </Button>
      <Button variant="primary" width="150px" height="40px" buttonText="로그인" />

      <Button variant="secondary" width="120px">
        내 위키 만들기
      </Button>
      <Button variant="secondary" width="400px" height="45px">
        로그인
      </Button>
      <Button variant="secondary" width="335px">
        로그인
      </Button>

      <Button
        variant="primary"
        width="150px"
        height="40px"
        loading
        buttonText="로딩 중이에요!"
        showLoadingImage
      />
      <Button
        variant="secondary"
        loading
        buttonText="잠시만 기다려 주세요"
        showLoadingImage
        width="300px"
      />
    </div>
  );
};

export default WikiList;
