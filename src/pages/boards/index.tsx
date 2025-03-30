import { ArticleListResponse } from '@/types/Article';
import { useCallback, useEffect, useState } from 'react';
import ArticleCard from '@/components/Boards/ArticleCard';
import ArticleItem from '@/components/Boards/ArticleItem';
import axiosInstance from '@/lib/api/axios';
import Link from 'next/link';
import router from 'next/router';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import Pagination from '@/components/common/PageNation';

const Boards = () => {
  const [articleListData, setArticleListData] = useState<ArticleListResponse>();
  const [articlesByLike, setArticlesByLike] = useState<ArticleListResponse>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<string>('recent');
  const [keyword, setKeyword] = useState<string>('');
  const [preKeyword, setPreKeyword] = useState<string>('');

  const OPTION: string[] = ['최신순', '좋아요순'];
  const ORDER_BY_VALUES: Record<string, string> = {
    최신순: 'recent',
    좋아요순: 'like',
  };
  const ORDER_BY_LABELS: Record<string, string> = {
    recent: '최신순',
    like: '좋아요순',
  };

  const totalArticles = articleListData?.totalCount ?? 0;
  const totalPages = Math.ceil(totalArticles / 10);

  const fetchArticlesData = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/articles', {
        params: {
          page: currentPage,
          pageSize: 10,
          orderBy,
          keyword,
        },
      });
      setArticleListData(res.data);
    } catch (e) {
      console.log(e);
    }
  }, [currentPage, orderBy, keyword]);

  const fetchArticlesByLikeData = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/articles', {
        params: { orderBy: 'like' },
      });
      setArticlesByLike(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreKeyword(e.target.value);
  };

  const handleSearch = () => {
    setKeyword(preKeyword);
    setCurrentPage(1);
  };

  const handleOrderBy = (label: string) => {
    setOrderBy(ORDER_BY_VALUES[label]);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchArticlesByLikeData();
    fetchArticlesData();
  }, [fetchArticlesByLikeData, fetchArticlesData]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (keyword) {
      params.set('keyword', keyword);
    }
    if (orderBy) {
      params.set('orderBy', orderBy);
    }
    params.set('page', String(currentPage));
    // shallow routing을 사용하면 페이지 리로드 없이 URL만 변경됨
    router.push(`?${params.toString()}`, undefined, { shallow: true });
  }, [keyword, orderBy, currentPage]);

  return (
    <div className="px-5 py-10 mx-auto max-w-[1060px]">
      {/* Nav 영역 */}
      <div className="flex justify-between mb-10">
        <h1 className="text-gray-500 text-2xl-sb">베스트 게시글</h1>
        <Link href="/addboard">
          <Button
            buttonText="게시글 등록하기"
            width="130px"
            className="text-white bg-green-200 text-md-sb rounded-[10px] w-40 cursor-pointer"
          />
        </Link>
      </div>

      {/* articleCard 영역 */}
      <div className="-mx-5">
        <div className="grid grid-flow-col grid-rows-1 gap-4 pb-10 px-5 w-screen overflow-x-scroll md:grid-cols-2 md:grid-rows-2 md:w-full md:gap-5 md:overflow-auto xl:mx-auto xl:overflow-auto xl:grid-rows-1 xl:w-[1100px] xl:gap-4 xl:pb-15">
          {articlesByLike?.list.slice(0, 4).map((article) => (
            <Link href={`/boards/${article.id}`} key={article.id}>
              <ArticleCard article={article} />
            </Link>
          ))}
        </div>
      </div>

      {/* 검색창 영역 */}
      <div className="flex flex-col justify-between mb-5 md:flex-row ">
        <div className="flex justify-between w-full mb-5 md:mb-0 md:mr-5 items-center">
          <input
            placeholder="제목을 검색해 주세요"
            value={preKeyword}
            onChange={handleKeywordChange}
          />
          <Button
            buttonText="검색"
            width="80px"
            className="text-white bg-green-200 text-md-sb rounded-[10px] cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <Dropdown
          options={OPTION}
          selected={ORDER_BY_LABELS[orderBy]}
          onSelect={handleOrderBy}
          width="140px"
        />
      </div>

      {/* articleList 영역 */}
      <div className="block md:hidden">
        {articleListData?.list.map((article) => (
          <Link href={`/boards/${article.id}`} key={article.id}>
            <ArticleItem article={article} />
          </Link>
        ))}
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
            {articleListData?.list.map((article) => (
              <tr
                key={article.id}
                onClick={() => router.push(`/boards/${article.id}`)}
                className="cursor-pointer"
              >
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">
                  {article.id}
                </td>
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">
                  {article.title}
                </td>
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">
                  {article.writer.name}
                </td>
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">
                  {article.likeCount}
                </td>
                <td className="py-3 text-gray-500 border-gray-200 text-lg-r border-b-1">
                  {new Date(article.updatedAt ?? '').toLocaleDateString(
                    'ko-KR',
                    {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    }
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default Boards;
