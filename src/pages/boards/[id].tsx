import Check from '@/assets/icons/check.svg';
import Pensle from '@/assets/images/pensle.svg';
import TrashCan from '@/assets/images/trashcan.svg';
import Heart from '@/assets/images/heart.svg';
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
import ToolBar from '@/components/Boards/ToolBar';
import { CreateArticle } from '@/types/Article';
import ConfirmModal from '@/components/Boards/ConfirmModal';
import { CommentsListResponse } from '@/types/Comment';
import ImageUploadModal from '@/components/Boards/ImageUploadModal';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { useSnackbar } from '@/lib/context/SnackbarContext';

interface User {
  id: number;
  name: string;
  teamId: string;
  profile: {
    id: number;
    code: string;
  };
  createdAt: string;
  updatedAt: string;
}

const Board = () => {
  const router = useRouter();
  const { id } = router.query;
  const { showSnackbar } = useSnackbar();
  const [editArticle, setEditArticle] = useState<CreateArticle>({
    image: '',
    content: '',
    title: '',
  });
  const [articleData, setArticleData] = useState<BasicArticle>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [lengths, setLengths] = useState({ withSpaces: 0, withoutSpaces: 0 });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenImageModal, setIsOpenImageModal] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<CommentsListResponse>();
  const [user, setUser] = useState<User | null>(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/users/me');
      setUser(data);
    } catch (e) {
      console.log('유저 정보 가져오기 실패', e);
      setUser(null);
    }
  }, []);

  const fetchArticleData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/articles/${id}`);
      setArticleData(res.data);
      setEditArticle((prev) => ({ ...prev, title: res.data.title }));
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const fetchCommentData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/articles/${id}/comments`, {
        params: {
          limit: 9999,
        },
      });

      setCommentList(res.data);
    } catch (e) {
      console.log('댓글 불러오기 실패', e);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchUserInfo();
    fetchArticleData();
    fetchCommentData();
  }, [fetchArticleData, fetchCommentData, fetchUserInfo, id]);

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

  const hasImageInContent = (html: string) => {
    return /<img\s+[^>]*src=/.test(html);
  };

  const saveEditArticle = async () => {
    try {
      const content = editArticle?.content || '';
      const hasImage = hasImageInContent(content);

      const imageUrl = hasImage
        ? editArticle.image || articleData?.image
        : 'https://none.none';

      const EditArticle: CreateArticle = {
        title: editArticle?.title,
        content,
        image: imageUrl,
      };

      const res = await axiosInstance.patch(`/articles/${id}`, EditArticle);
      setArticleData(res.data);
      setEditMode(false);
      showSnackbar('게시글이 수정되었습니다!', {
        type: 'green',
        position: 'top',
        size: 'large',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteArticle = async () => {
    try {
      await axiosInstance.delete(`/articles/${id}`);
      router.push('/boards');
      showSnackbar('게시글이 삭제되었습니다!', {
        type: 'green',
        position: 'top',
        size: 'large',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const createComment = async (comment: string) => {
    if (!comment) return;
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
        setEditArticle((prev) => ({ ...prev, image: uploadedImageUrl }));
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
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
            {editMode ? (
              <input
                value={editArticle.title}
                onChange={(e) =>
                  setEditArticle((prev) => ({ ...prev, title: e.target.value }))
                }
                className="text-gray-500 text-2xl-sb md:text-3xl-sb outline-none flex-1"
              />
            ) : (
              <p className="text-gray-500 text-2xl-sb md:text-3xl-sb">
                {articleData?.title}
              </p>
            )}

            <div className="flex items-center md:hidden">
              {user?.id === articleData?.writer.id && (
                <>
                  {editMode ? (
                    <Check
                      className="w-6 h-6 mr-3 cursor-pointer"
                      onClick={saveEditArticle}
                    />
                  ) : (
                    <Pensle
                      className="w-6 h-6 mr-3 cursor-pointer"
                      onClick={() => setEditMode(true)}
                    />
                  )}
                  <TrashCan
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setIsOpenModal(true)}
                  />
                </>
              )}
            </div>
            <div className="items-start hidden md:flex">
              {user?.id === articleData?.writer.id && (
                <>
                  {editMode ? (
                    <Button
                      buttonText="저장하기"
                      className="text-white bg-green-200 rounded-[10px] text-md-sb mr-3 cursor-pointer py-[10px] px-[35px]"
                      onClick={saveEditArticle}
                    />
                  ) : (
                    <Button
                      buttonText="수정하기"
                      className="text-white bg-green-200 rounded-[10px] text-md-sb mr-3 cursor-pointer py-[10px] px-[35px]"
                      onClick={() => setEditMode(true)}
                    />
                  )}

                  <Button
                    buttonText="삭제하기"
                    className="text-white bg-green-200 rounded-[10px] text-md-sb cursor-pointer py-[10px] px-[35px]"
                    onClick={() => setIsOpenModal(true)}
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-400 text-xs-r md:text-md-r">
            <div className="flex items-center">
              <p className="mr-2 md:mr-[10px] truncate max-w-20">
                {articleData?.writer?.name}
              </p>
              <p>{formattedDate}</p>
            </div>
            <div className="flex items-center">
              {articleData?.isLiked ? (
                <HeartFilled
                  className="w-4 h-4 mr-1 cursor-pointer"
                  onClick={() => toggleLike(false)}
                />
              ) : (
                <Heart
                  className="w-4 h-4 mr-1 cursor-pointer"
                  onClick={() => toggleLike(true)}
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
          {editMode && (
            <ToolBar
              editor={editor}
              openModal={() => setIsOpenImageModal(true)}
            />
          )}
        </div>
      </div>

      <div className="flex justify-center my-10 xl:my-15">
        <Link href="/boards">
          <Button
            buttonText="목록으로"
            variant="secondary"
            className="py-[10px] px-[45px] text-md-sb"
          />
        </Link>
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

      {commentList && (
        <div>
          {commentList.list.map((comment) => (
            <CommentItem
              key={comment.id}
              user={user}
              comment={comment}
              onClick={deleteComment}
              onUpdate={fetchCommentData}
            />
          ))}
        </div>
      )}

      {isOpenModal && (
        <ConfirmModal onClick={deleteArticle} onClose={onCloseModal} />
      )}

      {isOpenImageModal && (
        <ImageUploadModal
          onClick={updateImage}
          onClose={() => setIsOpenImageModal(false)}
        />
      )}
    </div>
  );
};

export default Board;
