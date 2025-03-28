import Button from '@/components/EditButton'; // Button.tsx 컴포넌트 임포트

export default function HomePage() {
  return (
    <div>
      <h1>빈 페이지에서 컴포넌트 불러오기</h1>
      <Button text="클릭하세요" onClick={function (): void {
              throw new Error('Function not implemented.');
          } } /> {/* Button 컴포넌트 사용 */}
    </div>
  );
}