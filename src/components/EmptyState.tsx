import WikiPageButton from '@/components/wikipageButton';

type EmptyStateProps = {
  className?: string;
};

export const EmptyState = ({ className }: EmptyStateProps) => {
  const handleClick = () => {
    console.log('위키 참여하기 버튼 클릭됨');
  };

  return (
    <div
      className={
        "bg-grayscale-grayscale-100 rounded-[10px] pt-10 pr-[93px] pb-10 pl-[93px] flex flex-col gap-2.5 items-start justify-start relative overflow-hidden " +
        className
      }
    >
      <div className="flex flex-col gap-4 items-center justify-start shrink-0 relative">
        <div className="text-grayscale-grayscale-400 text-center font-pretendard-md-14px-regular-font-family text-pretendard-md-14px-regular-font-size leading-pretendard-md-14px-regular-line-height font-pretendard-md-14px-regular-font-weight relative">
          아직 작성된 내용이 없네요.
          <br /> 위키에 참여해 보세요!
        </div>
        <WikiPageButton
          size="s"
          text="시작하기"
          className="!shrink-0"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
