import Button from '@/components/common/Button';
import Link from '@/components/common/Link';
import axiosInstance from '@/lib/api/axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Arrow from '@/assets/icons/expand.svg';
// 에디터 import
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import ImageResize from 'tiptap-extension-resize-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import ToolBar from '@/components/Boards/ToolBar';
import ImageUploadModal from '@/components/Boards/ImageUploadModal';

interface ProfileData {
  id: number;
  code: string;
  image: string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
}
const WikiPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profileData, setProfileData] = useState<ProfileData>();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isOpenImageModal, setIsOpenImageModal] = useState<boolean>(false);

  const fetchProfileData = useCallback(async () => {
    try {
      if (!id) return;
      const res = await axiosInstance.get(`/profiles/${id}`);
      setProfileData(res.data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

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
        // setEditArticle((prev) => ({ ...prev, image: uploadedImageUrl }));
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const editWiki = async () => {
    try {
      setEditMode(true);
      const answer = {
        securityAnswer: '다라',
      };
      await axiosInstance.post(`/profiles/${id}/ping`, answer);
    } catch (e) {
      console.log(e);
    }
  };

  const saveWiki = async () => {
    try {
      setEditMode(false);
      if (!profileData) return;

      const allowedKeys = [
        'securityQuestion',
        'nationality',
        'family',
        'bloodType',
        'nickname',
        'birthday',
        'sns',
        'job',
        'mbti',
        'city',
        'image',
        'content',
      ];

      const patchData = Object.fromEntries(
        Object.entries(profileData).filter(([key]) => allowedKeys.includes(key))
      );

      patchData.securityAnswer = '다라';
      await axiosInstance.patch(`/profiles/${id}`, patchData);
    } catch (e) {
      console.log(e);
    }
  };

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
    content: profileData?.content || '',
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
      setProfileData((prev) => {
        if (!prev) return prev;
        return { ...prev, content: html };
      });
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(editMode);
    }
  }, [editor, editMode]);

  useEffect(() => {
    if (editor && profileData?.content) {
      editor.commands.setContent(profileData.content);
    }
  }, [editor, profileData]);

  return (
    <div className="relative p-5 py-10 mx-auto">
      <div className="flex justify-between mb-6">
        <p className="text-gray-500 text-3xl-sb">{profileData?.name}</p>
        <Button
          buttonText="위키 참여하기"
          className="py-[10px] px-[22px] rounded-[10px]"
          onClick={editWiki}
        />
        <Button
          buttonText="저장하기"
          className="py-[10px] px-[22px] rounded-[10px]"
          onClick={saveWiki}
        />
      </div>

      <div className="mb-3">
        <Link url="www.naver.com" text="www.naver.com" />
      </div>

      <div className="mx-auto mb-10 flex flex-rows xl:flex-col bg-grayscale-50 rounded-[10px] min-w-[335px] max-w-[624px] w-full xl:w-fit py-[15px] px-5 xl:px-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-md-r">
        <div className="xl:flex xl:justify-center xl:mb-15 mr-5">
          <div className="bg-gray-500 rounded-[99px] w-[62px] h-[62px] xl:w-50 xl:h-50" />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-5 mb-2 xl:md-4">
            <div className="min-w-[60px] text-gray-400">거주 도시</div>
            <div>{profileData?.city}</div>
          </div>
          <div className="flex items-center gap-5 mb-2 xl:mb-4">
            <div className="min-w-[60px] text-gray-400">MBTI</div>
            <div>{profileData?.mbti}</div>
          </div>
          <div className="flex items-center gap-5 mb-2 xl:mb-4">
            <div className="min-w-[60px] text-gray-400">직업</div>
            <div>{profileData?.job}</div>
          </div>
          <div
            className="xl:hidden text-blue-500 underline cursor-pointer mb-4 flex justify-center w-full"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            {showDetails ? (
              <Arrow className="w-6 h-6 rotate-180" />
            ) : (
              <Arrow className="w-6 h-6 rotate-0" />
            )}
          </div>
          <div className={`${showDetails ? 'block' : 'hidden'} xl:block`}>
            <div className="flex items-center gap-5 mb-2 xl:mb-4">
              <div className="min-w-[60px] text-gray-400">sns 계정</div>
              <div>{profileData?.sns}</div>
            </div>
            <div className="flex items-center gap-5 mb-2 xl:mb-4">
              <div className="min-w-[60px] text-gray-400">생일</div>
              <div>{profileData?.birthday}</div>
            </div>
            <div className="flex items-center gap-5 mb-2 xl:mb-4">
              <div className="min-w-[60px] text-gray-400">별명</div>
              <div>{profileData?.nickname}</div>
            </div>
            <div className="flex items-center gap-5 mb-2 xl:mb-4">
              <div className="min-w-[60px] text-gray-400">혈액형</div>
              <div>{profileData?.bloodType}</div>
            </div>
            <div className="flex items-center gap-5 mb-2 xl:mb-4">
              <div className="min-w-[60px] text-gray-400">국적</div>
              <div>{profileData?.nationality}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <EditorContent editor={editor} />
        {editMode && (
          <ToolBar
            editor={editor}
            openModal={() => setIsOpenImageModal(true)}
          />
        )}
      </div>

      {isOpenImageModal && (
        <ImageUploadModal
          onClick={updateImage}
          onClose={() => setIsOpenImageModal(false)}
        />
      )}
    </div>
  );
};

export default WikiPage;
