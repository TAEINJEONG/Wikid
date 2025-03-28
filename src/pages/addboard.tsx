import { useState } from 'react';
import TextEditor from '@/components/Boards/TextEditor';
import ImageUploadModal from '@/components/Boards/ImageUploadModal';
import axiosInstance from '@/lib/api/axios';
import { Editor } from '@tiptap/react';
import { CreateArticle } from '@/types/Article';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AddBoard = () => {
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [content, setContent] = useState('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [article, setArticle] = useState<CreateArticle>({
    image: '',
    content: '',
    title: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onEditorChange = (content: string) => {
    setContent(content);
  };

  const onClose = () => {
    setIsOpenModal(false);
  };

  const setIsModalOpen = (p0: boolean) => {
    setIsOpenModal(p0);
  };

  const updateImage = async (image: FormData | null) => {
    if (!image) return;
    try {
      const response = await axiosInstance.post('/images/upload', image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const uploadedImageUrl = response?.data?.url;
      if (uploadedImageUrl && editor) {
        editor.chain().focus().setImage({ src: uploadedImageUrl }).run();
        setArticle((prev) => ({ ...prev, image: uploadedImageUrl }));
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const handleArticleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    if (titleValue.length > 30) return;
    setArticleTitle(e.target.value);
  };

  const CreateArticle = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const newArticle: CreateArticle = {
        title: articleTitle,
        content: content,
        image: article.image,
      };

      const res = await axiosInstance.post('/articles', newArticle);
      const id = res.data.id;

      router.push(`/boards/${id}`);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:py-10 md:px-[30px]">
      <div
        className="h-fit max-w-[1060px] mx-auto md:shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-[10px] py-8 px-5
        md:pt-[46px] md:pl-[30px] md:pr-[30px] md:pb-[30px]
        mb-8 md:mb-10 xl:mb-[23px]"
      >
        <div>
          <div className="mb-[20px]">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <p className="text-gray-500 text-lg-sb md:text-xl-sb xl:text-2xl-sb">
                게시물 등록하기
              </p>
              <button
                onClick={CreateArticle}
                className="px-3 py-2 bg-gray-300 rounded-[10px]"
                disabled={articleTitle === ''}
              >
                등록하기
              </button>
            </div>
            <div className="flex items-center text-gray-400 text-xs-r md:text-lg-r">
              <p className="mr-[10px]">박동욱</p>
              <p>2024.02.24.</p>
            </div>
          </div>
          <div className="flex items-center w-full py-3 mb-4 border-gray-200 border-t-1 border-b-1">
            <input
              className="w-full outline-none placeholder:text-lg-m placeholder:gray-400 caret-green-300 md:text-xl-m article-title-input"
              placeholder="제목을 입력해주세요"
              value={articleTitle}
              onChange={handleArticleTitle}
            />
            <div className="text-[13px] text-gray-500 flex items-center">
              <p>{articleTitle.length}/</p>
              <p className="text-green-200">30</p>
            </div>
          </div>
        </div>

        <TextEditor
          content={content ?? ''}
          onChange={onEditorChange}
          openModal={() => setIsModalOpen(true)}
          onEditorReady={(editorInstance) => setEditor(editorInstance)}
        />
      </div>

      <div className="flex justify-center">
        <button>
          <Link href="/boards">목록으로</Link>
        </button>
      </div>

      {isOpenModal && (
        <ImageUploadModal onClick={updateImage} onClose={onClose} />
      )}
    </div>
  );
};

export default AddBoard;
