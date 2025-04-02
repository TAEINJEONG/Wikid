import Button from '@/components/common/Button';
import Link from '@/components/common/Link';
import axiosInstance from '@/lib/api/axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import Arrow from '@/assets/icons/expand.svg';
import Image from 'next/image';
import Input from '@/components/common/Input';
import ImageUploadModal from '@/components/Boards/ImageUploadModal';
import QuizModal from '@/components/QuizModal';
import { useSnackbar } from '@/lib/context/SnackbarContext';
import Profile from '@/assets/icons/profile.svg';
import { CameraIcon } from '@/components/common/Icons';
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

interface Profile {
  id: number;
  code: string;
}

interface User {
  id: number;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
}

const WikiPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { showSnackbar } = useSnackbar();
  const [profileData, setProfileData] = useState<ProfileData>();
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isOpenImageModal, setIsOpenImageModal] = useState<boolean>(false);
  const [isOpenQuizModal, setIsOpenQuizModal] = useState<boolean>(false);
  const [securityAnswer, setSecurityAnswer] = useState<string>('');
  const [userData, setUserData] = useState<User>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('/users/me');
      setUserData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

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
    fetchUser();
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
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
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

      patchData.securityAnswer = securityAnswer;
      await axiosInstance.patch(`/profiles/${id}`, patchData);
      showSnackbar('위키가 정상적으로 수정되었습니다!', {
        type: 'green',
        position: 'top',
        size: 'large',
      });
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

  const handleModalClose = () => {
    setIsOpenQuizModal(false);
  };

  const handleModalSubmit = async (quizAnswers: string) => {
    try {
      setSecurityAnswer(quizAnswers);
      const answer = {
        securityAnswer: quizAnswers,
      };
      await axiosInstance.post(`/profiles/${id}/ping`, answer);
      handleModalClose();
      setEditMode(true);
    } catch {
      showSnackbar('보안 답변이 일치하지 않습니다.', {
        type: 'red',
        position: 'top',
        size: 'large',
      });
    }
  };

  const handleClickFileUpload = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editMode) return;
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const uploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files;
      if (file && file[0]) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file[0].type)) {
          alert('jpg, jpeg, png 파일만 업로드 가능합니다.');
          return;
        }

        const formData = new FormData();
        formData.append('image', file[0]);
        e.target.value = '';

        const response = await axiosInstance.post('/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const uploadedImageUrl = response?.data?.url;
        setProfileData((prev) =>
          prev ? { ...prev, image: uploadedImageUrl } : prev
        );
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
    if (editor && profileData?.content) {
      editor.commands.setContent(profileData.content);
    }
  }, [editor, profileData]);

  const identityProof = userData?.profile?.code === id;

  return (
    <div className="relative p-5 py-10 xl:py-[78px]">
      <div className="max-w-[1250px] mx-auto">
        <div className="flex justify-between mb-6 xl:w-[860px]">
          <p className="text-gray-500 text-3xl-sb">{profileData?.name}</p>
          {editMode ? (
            <div>
              <Button
                buttonText="취소"
                variant="secondary"
                className="py-[10px] px-[22px] rounded-[10px] mr-[10px]"
                onClick={() => setEditMode(false)}
              />
              <Button
                buttonText="저장"
                className="py-[10px] px-[22px] rounded-[10px]"
                onClick={saveWiki}
              />
            </div>
          ) : (
            <Button
              buttonText="위키 참여하기"
              className="py-[10px] px-[22px] rounded-[10px]"
              onClick={() => setIsOpenQuizModal(true)}
            />
          )}
        </div>

        <div className="mb-3">
          <Link url="www.naver.com" text="www.naver.com" />
        </div>

        <div className="flex-col justify-start rounded-10 bg-white sm:mb-8 xl:relative xl:ml-auto xl:flex xl:h-[671px] xl:w-[320px] bottom-[130px]">
          <div
            className={`mx-auto mb-10 flex flex-rows ${editMode ? 'flex-col items-center' : 'xl:flex-col'} bg-grayscale-50 rounded-[10px] min-w-[335px] w-full xl:w-fit py-[15px] px-5 xl:px-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-md-r`}
          >
            <div
              className={`xl:flex xl:justify-center xl:mb-15 mr-5 ${editMode ? 'mb-6' : 'mb-0'}`}
            >
              <div
                onClick={handleClickFileUpload}
                className="w-[62px] h-[62px] xl:w-50 xl:h-50 rounded-[99px] overflow-hidden"
              >
                {profileData &&
                  (!profileData.image ? (
                    <div className="relative">
                      <Profile
                        className={`${editMode ? 'cursor-pointer' : 'cursor-auto'} w-[62px] h-[62px] xl:w-50 xl:h-50`}
                      />
                      {editMode && (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer w-[62px] h-[62px] xl:w-50 xl:h-50 rounded-[99px] overflow-hidden"
                          onClick={handleClickFileUpload}
                        >
                          <CameraIcon className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-[62px] h-[62px] xl:w-50 xl:h-50 rounded-[99px] overflow-hidden">
                      <Image
                        src={profileData.image}
                        fill
                        alt="업로드된 이미지"
                      />
                      {editMode && (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer w-[62px] h-[62px] xl:w-50 xl:h-50 rounded-[99px] overflow-hidden"
                          onClick={handleClickFileUpload}
                        >
                          <CameraIcon className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                className="hidden"
                ref={fileInputRef}
                onClick={(e) => e.stopPropagation()}
                onChange={uploadProfileImage}
              />
            </div>

            <div className="w-full">
              <div className="flex items-center gap-5 mb-2 xl:mb-4">
                <div className="min-w-[60px] text-gray-400">거주 도시</div>
                {editMode && identityProof ? (
                  <Input
                    value={profileData?.city || ''}
                    onChange={(e) =>
                      setProfileData((prev) =>
                        prev ? { ...prev, city: e.target.value } : prev
                      )
                    }
                    className="w-full"
                  />
                ) : (
                  <div>{profileData?.city}</div>
                )}
              </div>
              <div className="flex items-center gap-5 mb-2 xl:mb-4">
                <div className="min-w-[60px] text-gray-400">MBTI</div>
                {editMode && identityProof ? (
                  <Input
                    value={profileData?.mbti || ''}
                    onChange={(e) =>
                      setProfileData((prev) =>
                        prev ? { ...prev, mbti: e.target.value } : prev
                      )
                    }
                    className="w-full"
                  />
                ) : (
                  <div>{profileData?.mbti}</div>
                )}
              </div>
              <div className="flex items-center gap-5 mb-2 xl:mb-4">
                <div className="min-w-[60px] text-gray-400">직업</div>
                {editMode && identityProof ? (
                  <Input
                    value={profileData?.job || ''}
                    onChange={(e) =>
                      setProfileData((prev) =>
                        prev ? { ...prev, job: e.target.value } : prev
                      )
                    }
                    className="w-full"
                  />
                ) : (
                  <div>{profileData?.job}</div>
                )}
              </div>

              <div
                className={`${editMode ? 'hidden' : 'block xl:hidden'}  text-blue-500 underline cursor-pointer mb-2 flex justify-center w-full`}
                onClick={() => setShowDetails((prev) => !prev)}
              >
                {showDetails ? (
                  <Arrow className="w-6 h-6 rotate-180" />
                ) : (
                  <Arrow className="w-6 h-6 rotate-0" />
                )}
              </div>

              <div
                className={`${editMode || showDetails ? 'block' : 'hidden'} xl:block`}
              >
                <div className="flex items-center gap-5 mb-2 xl:mb-4">
                  <div className="min-w-[60px] text-gray-400">sns 계정</div>
                  {editMode && identityProof ? (
                    <Input
                      value={profileData?.sns || ''}
                      onChange={(e) =>
                        setProfileData((prev) =>
                          prev ? { ...prev, sns: e.target.value } : prev
                        )
                      }
                      className="w-full"
                    />
                  ) : (
                    <div>{profileData?.sns}</div>
                  )}
                </div>
                <div className="flex items-center gap-5 mb-2 xl:mb-4">
                  <div className="min-w-[60px] text-gray-400">생일</div>
                  {editMode && identityProof ? (
                    <Input
                      value={profileData?.birthday || ''}
                      onChange={(e) =>
                        setProfileData((prev) =>
                          prev ? { ...prev, birthday: e.target.value } : prev
                        )
                      }
                      className="w-full"
                    />
                  ) : (
                    <div>{profileData?.birthday}</div>
                  )}
                </div>
                <div className="flex items-center gap-5 mb-2 xl:mb-4">
                  <div className="min-w-[60px] text-gray-400">별명</div>
                  {editMode && identityProof ? (
                    <Input
                      value={profileData?.nickname || ''}
                      onChange={(e) =>
                        setProfileData((prev) =>
                          prev ? { ...prev, nickname: e.target.value } : prev
                        )
                      }
                      className="w-full"
                    />
                  ) : (
                    <div>{profileData?.nickname}</div>
                  )}
                </div>
                <div className="flex items-center gap-5 mb-2 xl:mb-4">
                  <div className="min-w-[60px] text-gray-400">혈액형</div>
                  {editMode && identityProof ? (
                    <Input
                      value={profileData?.bloodType || ''}
                      onChange={(e) =>
                        setProfileData((prev) =>
                          prev ? { ...prev, bloodType: e.target.value } : prev
                        )
                      }
                      className="w-full"
                    />
                  ) : (
                    <div>{profileData?.bloodType}</div>
                  )}
                </div>
                <div className="flex items-center gap-5 mb-2 xl:mb-4">
                  <div className="min-w-[60px] text-gray-400">국적</div>
                  {editMode && identityProof ? (
                    <Input
                      value={profileData?.nationality || ''}
                      onChange={(e) =>
                        setProfileData((prev) =>
                          prev ? { ...prev, nationality: e.target.value } : prev
                        )
                      }
                      className="w-full"
                    />
                  ) : (
                    <div>{profileData?.nationality}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:w-[860px] xl:absolute xl:top-[206px]">
          {profileData && !profileData.content ? (
            <div className="w-full bg-gray-100 flex justify-center items-center flex-col py-10 rounded-[10px]">
              <p className="mb-5 text-center text-lg-r text-gray-400">
                아직 작성된 내용이 없네요.
                <br />
                위키에 참여해보세요!
              </p>
              <Button
                buttonText="시작하기"
                className="text-md-sb py-2 px-5"
                onClick={() => setIsOpenQuizModal(true)}
              />
            </div>
          ) : (
            <>
              {editMode && (
                <ToolBar
                  editor={editor}
                  openModal={() => setIsOpenImageModal(true)}
                />
              )}
              <EditorContent editor={editor} />
            </>
          )}
        </div>
      </div>

      {isOpenImageModal && (
        <ImageUploadModal
          onClick={updateImage}
          onClose={() => setIsOpenImageModal(false)}
        />
      )}

      {isOpenQuizModal && (
        <QuizModal
          onClose={handleModalClose}
          question={profileData?.securityQuestion}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default WikiPage;
