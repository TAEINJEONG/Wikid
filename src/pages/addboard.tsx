import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const AddBoard = () => {
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [content, setContent] = useState('');
  const quillRef = useRef<any>(null);

  const plainText = content.replace(/<[^>]*>/g, '').trim();
  const textWithSpacesLength = plainText.length; // 공백 포함 문자 수
  const textWithoutSpacesLength = plainText.replace(/\s/g, '').length; // 공백 제외 문자 수

  const handleImageUpload = () => {
    const editor = quillRef.current?.editor; // <- 여기로 수정!
    if (!editor) return;

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', e.target?.result);
          editor.setSelection(range.index + 1);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const modules = {
    toolbar: {
      container: '#custom-toolbar',
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  const handleArticleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    if (titleValue.length > 30) return;
    setArticleTitle(e.target.value);
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
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 text-lg-sb">게시물 등록하기</p>
              <button className="px-3 py-2 bg-gray-300 rounded-[10px]">등록하기</button>
            </div>
            <div className="flex items-center text-gray-400 text-xs-r">
              <p className="mr-[10px]">박동욱</p>
              <p>2024.02.24.</p>
            </div>
          </div>
          <div className="flex items-center w-full py-3 mb-4 border-gray-200 border-t-1 border-b-1">
            <input
              className="w-full outline-none placeholder:text-lg-m placeholder:gray-400 caret-green-300"
              placeholder="제목을 입력해주세요"
              value={articleTitle}
              onChange={handleArticleTitle}
            />
            <div className="text-[13px] text-gray-500 flex items-center">
              <p>{articleTitle.length}/</p>
              <p className="text-green-200">30</p>
            </div>
          </div>
          <div className="flex">
            <p>공백포함 : 총</p>
            <p> {textWithSpacesLength}</p>
            <p>자 | 공백제외 : 총</p>
            <p> {textWithoutSpacesLength}</p>
            <p>자</p>
          </div>
        </div>
        <ReactQuill
          ref={quillRef}
          modules={modules}
          value={content}
          onChange={setContent}
          theme="snow"
          placeholder="본문을 입력해주세요"
          className="my-custom-editor"
        />

        <div id="custom-toolbar" className="flex gap-2 mt-4 rounded-[20px] border-gray-200">
          <div className="flex justify-between w-full">
            <div>
              <button className="ql-bold" />
              <button className="ql-italic" />
              <button className="ql-underline" />
              <button className="ql-list" value="ordered" />
              <button className="ql-list" value="bullet" />
              <button className="ql-image" />
            </div>
            <div className="flex gap-2">
              <button className="ql-link" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button> 목록으로 </button>
      </div>
    </div>
  );
};

export default AddBoard;
