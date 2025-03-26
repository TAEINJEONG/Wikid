import { BasicArticle } from '@/types/Article';
import HeartIcon from '@/assets/images/heart.svg';

interface articleProps {
  article: BasicArticle;
}

const ArticleItem = ({ article }: articleProps) => {
  const formattedDate = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  return (
    <div className="mb-[14px] border-b-1 border-gray-200">
      <p className="text-gray-500 truncate text-lg-r mb-[3px]">
        {article.title}
      </p>
      <div className="flex items-center justify-between text-gray-400 text-lg-r mb-[10px]">
        <div className="flex truncate">
          <p className="mr-4 truncate max-w-20">{article.writer.name}</p>
          <p>{formattedDate}</p>
        </div>
        <div className="flex">
          <HeartIcon alt="좋아요 아이콘" className="w-4 h-4 mr-1" />
          <p>{article.likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
