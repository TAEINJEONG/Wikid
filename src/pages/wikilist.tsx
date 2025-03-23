import Button from '@/components/common/Button';

const WikiList = () => {
  return (
    <div className=" flex-col flex gap-3 items-center justify-center min-h-screen bg-white text-black p-6">
      <Button buttonText="내 위키 만들기" />
      <Button width="400px" height="45px" buttonText="로그인" />

      <Button variant="secondary" buttonText="내 위키 만들기" />
      <Button variant="secondary" width="400px" buttonText="로그인" />

      <Button loading buttonText="내 위키 만들기" />
      <Button loading width="400px" buttonText="로그인" />

      <Button variant="primary" width="110px" loading buttonText="편집 중" showLoadingImage />
    </div>
  );
};

export default WikiList;
