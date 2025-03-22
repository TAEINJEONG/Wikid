import Button from "@/components/common/Button";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black p-6">
    <h1>메인 페이지</h1>
  
    <div className="space-x-4">
      <Button variant="primary" size="lg">내 위키 만들기</Button>
      <Button variant="primary" size="md" disabled>로그인</Button>
      <Button variant="primary" size="md" loading />

      <Button variant="secondary" size="lg">내 위키 만들기</Button>
      <Button variant="secondary" size="md" disabled>로그인</Button>
    </div>
  </div>
  );
};

export default Index;