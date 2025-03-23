import { ArticleListResponse } from '@/types/Article';
import { useState } from 'react';
import ArticleCard from '@/components/Boards/ArticleCard';
import ArticleItem from '@/components/Boards/ArticleItem';

const Boards = () => {
  const [articleListData] = useState<ArticleListResponse>({
    totalCount: 12,
    list: [
      {
        updatedAt: '2025-03-22T04:27:57.867Z',
        createdAt: '2025-03-22T04:27:57.867Z',
        likeCount: 0,
        writer: {
          name: '첫째',
          id: 1,
        },
        image: 'https://cdn.pixabay.com/photo/2025/02/11/04/53/woman-9398011_1280.jpg',
        title:
          '첫째가 적었어요 엄청긴 제목이에요 이렇게 와바바바박 한도 끝도 없이 매일 같이 열심히 최선을 다해서 죽을만큼',
        id: 1,
      },
      {
        updatedAt: '2025-03-22T04:27:57.867Z',
        createdAt: '2025-03-22T04:27:57.867Z',
        likeCount: 3,
        writer: {
          name: '둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째둘째',
          id: 2,
        },
        image: 'https://cdn.pixabay.com/photo/2019/07/27/21/54/owl-4367617_1280.jpg',
        title: '둘째가 적었어요',
        id: 2,
      },
      {
        updatedAt: '2025-03-22T04:27:57.867Z',
        createdAt: '2025-03-22T04:27:57.867Z',
        likeCount: 143,
        writer: {
          name: '셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째',
          id: 3,
        },
        image: 'https://cdn.pixabay.com/photo/2019/07/27/21/54/owl-4367617_1280.jpg',
        title: '셋쩨셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째셋째가 적었어요',
        id: 3,
      },
      {
        updatedAt: '2025-03-22T04:27:57.867Z',
        createdAt: '2025-03-22T04:27:57.867Z',
        likeCount: 0,
        writer: {
          name: '넷째',
          id: 4,
        },
        image: 'https://cdn.pixabay.com/photo/2025/02/11/04/53/woman-9398011_1280.jpg',
        title: '넷째가 적었당깨요',
        id: 4,
      },
    ],
  });

  // 페이지 그룹 시작점
  const [currentPageGroupStart, setCurrentPageGroupStart] = useState<number>(1);
  // 페이지 그룹 단위
  const pageGroupSize = 5;
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 다음 페이지 그룹이 존재하는지 여부 (currentPageGroupStart + pageGroupSize한 값이 totalCount보다 작거나 같으면 true)
  const hasNextPageGroup = currentPageGroupStart + pageGroupSize <= articleListData.totalCount;

  const handlePrevPagesRange = () => {
    if (currentPageGroupStart > 1) {
      // 페이지 그룹 시작점을 pageGroupSize(5) 만큼 감소
      setCurrentPageGroupStart((prev) => prev - pageGroupSize);
      // 현재 페이지를 새 시작 번호로 설정(5 - 6 = 1) 위에서 currentPageGroupStart의 값을 바꿨지만 아직 값이 업데이트 안된 상태
      setCurrentPage(currentPageGroupStart - pageGroupSize);
    }
  };

  const handleNextPagesRange = () => {
    if (hasNextPageGroup) {
      // 페이지 그룹 시작점을 pageGroupSize(5) 만큼 증가
      setCurrentPageGroupStart((prev) => prev + pageGroupSize);
      // 현재 페이지를 새 시작 번호로 설정(1 + 5 = 6) 위에서 currentPageGroupStart의 값을 바꿨지만 아직 값이 업데이트 안된 상태
      setCurrentPage(currentPageGroupStart + pageGroupSize);
    }
  };

  // 특정 번호를 클릭하면 해당 번호를 페이지로
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-5 py-10 mx-auto max-w-[1060px]">
      {/* Nav 영역 */}
      <div className="flex justify-between mb-10">
        <h1 className="text-gray-500 text-2xl-sb">베스트 게시글</h1>
        <button className="text-white bg-green-200 text-md-sb">게시글 등록하기</button>
      </div>

      {/* articleCard 영역 */}
      <div className="-mx-5">
        <div
          className="
          grid grid-flow-col grid-rows-1 gap-4
          pb-10 px-5 w-screen overflow-x-scroll
          md:grid-cols-2 md:grid-rows-2 md:w-full md:gap-5 md:overflow-auto
          xl:mx-auto xl:overflow-auto xl:grid-rows-1 xl:w-[1100px] xl:gap-4 xl:pb-15"
        >
          {articleListData?.list.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* 검색창 영역 */}
      <div className="flex flex-col justify-between mb-5 md:flex-row ">
        <div className="flex justify-between w-full mb-5 md:mb-0">
          <input placeholder="제목을 검색해 주세요" />
          <button className="text-white bg-green-200 text-md-sb">검색</button>
        </div>
        <div className="w-full bg-gray-100 md:max-w-30 xl:max-w-[140px]">최신순</div>
      </div>

      {/* articleList 영역 */}
      <div className="block md:hidden">
        {articleListData?.list.map((article) => <ArticleItem key={article.id} article={article} />)}
      </div>

      <div className="hidden md:block">
        <table className="w-full text-center mb-15">
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr className="border-gray-200 border-b-1 border-t-1">
              <th className="py-3 text-gray-400 text-lg-r">번호</th>
              <th className="py-3 text-gray-400 text-lg-r">제목</th>
              <th className="py-3 text-gray-400 text-lg-r">작성자</th>
              <th className="py-3 text-gray-400 text-lg-r">좋아요</th>
              <th className="py-3 text-gray-400 text-lg-r">날짜</th>
            </tr>
          </thead>
          <tbody>
            {articleListData.list.map((article) => (
              <tr key={article.id}>
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">134</td>
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">
                  게시물 제목입니다.
                </td>
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">박동우</td>
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">24</td>
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">
                  2024.02.24.
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 controller */}
      <div className="flex gap-[10px] justify-center items-center">
        <div
          onClick={handlePrevPagesRange}
          className="flex justify-center items-center w-[45px] h-[45px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px]"
        >
          이전
        </div>
        {Array.from({ length: pageGroupSize }).map((_, index) => {
          const pageNumber = currentPageGroupStart + index;
          return (
            pageNumber <= articleListData.totalCount && (
              <div
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`flex justify-center items-center w-[45px] h-[45px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px]
                  ${currentPage === pageNumber ? 'text-green-200' : 'text-gray-400'}
                `}
              >
                {pageNumber}
              </div>
            )
          );
        })}
        <div
          onClick={handleNextPagesRange}
          className="flex justify-center items-center w-[45px] h-[45px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px]"
        >
          다음
        </div>
      </div>
    </div>
  );
};

export default Boards;
