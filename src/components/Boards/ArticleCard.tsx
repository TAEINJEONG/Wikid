import Image from 'next/image';
import { BasicArticle } from '@/types/Article';
import HeartIcon from '@/assets/images/heart-icon.svg';

interface articleProps {
  article: BasicArticle;
}

const ArticleCard = ({ article }: articleProps) => {
  const formattedDate = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';
  return (
    <div className="w-[250px] h-[200px] rounded-[10px] flex-shrink-0 md:w-[302px] xl:w-[250px]">
      <Image
        src={article.image}
        alt="article 이미지"
        width={250}
        height={200}
        className="w-[250px] h-[131px] md:w-[302px] object-cover rounded-t-[10px]"
      />
      <div className="shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-b-[10px] px-5 py-3">
        <p className="text-gray-500 truncate text-lg-sb">{article.title}</p>
        <div className="flex items-center justify-between text-gray-400 text-xs-r">
          <div className="flex items-center">
            <p className="mr-2 truncate max-w-20">{article.writer.name}</p>
            <p>{formattedDate}</p>
          </div>
          <div className="flex">
            <Image src={HeartIcon} width={16} height={16} alt="좋아요 아이콘" className="mr-1" />
            <p>{article.likeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
