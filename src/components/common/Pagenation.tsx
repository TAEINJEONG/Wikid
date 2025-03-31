import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageGroupSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  pageGroupSize = 5,
}) => {
  const currentGroupStart =
    Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;

  const handlePrevGroup = () => {
    const newStart = currentGroupStart - pageGroupSize;
    if (newStart >= 1) onPageChange(newStart);
  };

  const handleNextGroup = () => {
    const newStart = currentGroupStart + pageGroupSize;
    if (newStart <= totalPages) onPageChange(newStart);
  };

  return (
    <div className="flex gap-[10px] justify-center items-center mt-8">
      <div
        onClick={handlePrevGroup}
        className="flex justify-center items-center w-[45px] h-[45px] rounded-[10px] shadow-md cursor-pointer"
      >
        이전
      </div>

      {Array.from({ length: pageGroupSize }).map((_, index) => {
        const pageNumber = currentGroupStart + index;
        if (pageNumber > totalPages) return null;

        return (
          <div
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`flex justify-center items-center w-[45px] h-[45px] rounded-[10px] shadow-md cursor-pointer
              ${currentPage === pageNumber ? 'text-green-200' : 'text-gray-400'}`}
          >
            {pageNumber}
          </div>
        );
      })}

      <div
        onClick={handleNextGroup}
        className="flex justify-center items-center w-[45px] h-[45px] rounded-[10px] shadow-md cursor-pointer"
      >
        다음
      </div>
    </div>
  );
};

export default Pagination;
