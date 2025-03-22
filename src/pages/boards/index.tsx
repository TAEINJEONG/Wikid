import { ArticleListResponse } from '@/types/Article';
import { useState } from 'react';
import ArticleCard from '@/components/Boards/ArticleCard';

const Boards = () => {
  const [articleListData] = useState<ArticleListResponse>({
    totalCount: 10,
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

  return (
    <div className="mx-auto flex w-full gap-4 overflow-x-scroll md:w-[624px] md:flex-wrap md:gap-5 xl:flex-nowrap xl:overflow-auto xl:w-[1060px] xl:gap-4 xl:pb-15">
      {articleListData?.list.map((article) => <ArticleCard key={article.id} article={article} />)}
    </div>
  );
};

export default Boards;
