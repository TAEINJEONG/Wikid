import Image from 'next/image';
import Pensle from '@/assets/images/pensle.svg';
import TrashCan from '@/assets/images/trashcan.svg';
import Heart from '@/assets/images/Heart.svg';
import HeartFilled from '@/assets/images/heart-filled-icon.svg';
import CommentForm from '@/components/Boards/CommentForm';
import CommentItem from '@/components/Boards/CommentItem';
import { useRouter } from 'next/router';
import axiosInstance from '@/lib/api/axios';
import { BasicArticle } from '@/types/Article';
import { useCallback, useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import ImageResize from 'tiptap-extension-resize-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import ToolBar from '@/components/Boards/Toolbar';
import { CreateArticle } from '@/types/Article';
import ConfirmModal from '@/components/Boards/ConfirmModal';
import { CommentsListResponse } from '@/types/Comment';

const Board = () => {
  const router = useRouter();
  const { id } = router.query;
  const [editArticle, setEditArticle] = useState<CreateArticle>({
    image: '',
    content: '',
    title: '',
  });
  const [articleData, setArticleData] = useState<BasicArticle>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [lengths, setLengths] = useState({ withSpaces: 0, withoutSpaces: 0 });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<CommentsListResponse>();

  const fetchArticleData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/articles/${id}`);
      setArticleData(res.data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const fetchCommentData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/articles/${id}/comments`, {
        params: { limit: 10 },
      });
      setCommentList(res.data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchArticleData();
    fetchCommentData();
  }, [fetchArticleData, fetchCommentData, id]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: 'list-disc ml-3' } },
        orderedList: { HTMLAttributes: { class: 'list-decimal ml-3' } },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      ImageResize,
      Placeholder.configure({
        placeholder: '본문을 입력해주세요',
        emptyEditorClass:
          'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:text-mauve-11 before:opacity-50 before-pointer-events-none',
      }),
      TextStyle,
      Color.configure({ types: [TextStyle.name] }),
    ],
    content: articleData?.content || '',
    immediatelyRender: false,
    editable: editMode,
    editorProps: {
      attributes: {
        class:
          'min-h-[500px] rounded-md bg-white outline-none py-2 px-2 caret-green-300 text-lg-r md:text-xl-r',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditArticle((prev) => ({ ...prev, content: html }));
      const fullText = editor.getText();
      const textWithoutSpaces = fullText.replace(/\s/g, '');
      setLengths({
        withSpaces: fullText.length,
        withoutSpaces: textWithoutSpaces.length,
      });
    },
  });

  const saveEditArticle = async () => {
    try {
      const EditArticle: CreateArticle = {
        title: articleData?.title,
        content: editArticle?.content,
        image: articleData?.image,
      };
      const res = await axiosInstance.patch(`/articles/${id}`, EditArticle);
      setArticleData(res.data);
      setEditMode(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteArticle = async () => {
    try {
      await axiosInstance.delete(`/articles/${id}`);
      router.push('/boards');
    } catch (e) {
      console.log(e);
    }
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const createComment = async (comment: string) => {
    try {
      const newComment = { content: comment };
      await axiosInstance.post(`/articles/${id}/comments`, newComment);
      fetchCommentData();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      fetchCommentData();
    } catch (e) {
      console.log(e);
    }
  };

  const toggleLike = async (type: boolean) => {
    try {
      if (type) {
        await axiosInstance.post(`/articles/${id}/like`);
      } else {
        await axiosInstance.delete(`/articles/${id}/like`);
      }
      fetchArticleData();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (editor) {
      editor.setEditable(editMode);
    }
  }, [editor, editMode]);

  useEffect(() => {
    if (editor && articleData?.content) {
      editor.commands.setContent(articleData.content);
    }
  }, [editor, articleData]);

  useEffect(() => {
    if (editor) {
      // onEditorReady prop 예시, 별도 로직이 필요하면 추가
    }
  }, [editor]);

  const formattedDate = articleData?.createdAt
    ? new Date(articleData.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  return (
    <div className="p-5 mx-auto max-w-[1060px]">
      {/* 게시글 영역 */}
      <div className="shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-5 rounded-[10px] md:px-[30px] md:py-10">
        <div className="border-gray-200 border-b-1 mb-[15px] pb-[11px] md:mb-[30px] md:pb-2">
          <div className="flex justify-between mb-[14px] md:mb-8">
            <p className="text-gray-500 text-2xl-sb md:text-3xl-sb">{articleData?.title}</p>
            <div className="flex items-center md:hidden">
              <Image src={Pensle} width={24} height={24} className="mr-3" alt="수정 아이콘" />
              <Image src={TrashCan} width={24} height={24} alt="삭제 아이콘" />
            </div>
            <div className="items-start hidden md:flex">
              {editMode ? (
                <button
                  className="text-white bg-green-200 py-[10px] px-[35px] rounded-[10px] text-md-sb mr-3"
                  onClick={saveEditArticle}
                >
                  저장하기
                </button>
              ) : (
                <button
                  className="text-white bg-green-200 py-[10px] px-[35px] rounded-[10px] text-md-sb mr-3"
                  onClick={() => setEditMode(true)}
                >
                  수정하기
                </button>
              )}

              <button
                className="text-white bg-green-200 py-[10px] px-[35px] rounded-[10px] text-md-sb"
                onClick={() => setIsOpenModal(true)}
              >
                삭제하기
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-400 text-xs-r md:text-md-r">
            <div className="flex items-center">
              <p className="mr-2 md:mr-[10px] truncate max-w-20">{articleData?.writer?.name}</p>
              <p>{formattedDate}</p>
            </div>
            <div className="flex items-center">
              {articleData?.isLiked ? (
                <Image
                  src={HeartFilled}
                  width={16}
                  height={16}
                  className="mr-1 cursor-pointer"
                  onClick={() => toggleLike(false)}
                  alt="채워진 좋아요 아이콘"
                />
              ) : (
                <Image
                  src={Heart}
                  width={16}
                  height={16}
                  className="mr-1 cursor-pointer"
                  onClick={() => toggleLike(true)}
                  alt="빈 좋아요 아이콘"
                />
              )}
              <p>{articleData?.likeCount}</p>
            </div>
          </div>
        </div>

        <div>
          {editMode && (
            <div className="flex mb-[10px]">
              <p>공백포함 : 총</p>
              <p> {lengths.withSpaces}</p>
              <p>자 | 공백제외 : 총</p>
              <p> {lengths.withoutSpaces}</p>
              <p>자</p>
            </div>
          )}
          <EditorContent editor={editor} />
          {editMode && <ToolBar editor={editor} openModal={() => {}} />}
        </div>
      </div>

      <div className="flex justify-center my-10 xl:my-15">
        <button>목록으로</button>
      </div>

      <div className="mb-6 xl:mb-[42px]">
        <div className="flex items-center mb-2 text-lg-sb md:text-2lg-sb">
          <p className="mr-1 text-gray-500">댓글</p>
          <p className="text-green-200">{commentList?.list.length}</p>
        </div>
        <div>
          <CommentForm onClick={createComment} />
        </div>
      </div>

      <div>
        {commentList &&
          commentList.list.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onClick={deleteComment}
              onUpdate={fetchCommentData}
            />
          ))}
      </div>

      {isOpenModal && <ConfirmModal onClick={deleteArticle} onClose={onCloseModal} />}
    </div>
  );
};

export default Board;
