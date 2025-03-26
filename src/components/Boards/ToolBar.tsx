import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  // Heading1,
  // Heading2,
  // Heading3,
  Highlighter,
  ImagePlusIcon,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from 'lucide-react';
import { Toggle } from './Toggle';
import { Editor } from '@tiptap/react';

type ToolbarProps = {
  editor: Editor | null;
  openModal: () => void;
};

const ToolBar = ({ editor, openModal }: ToolbarProps) => {
  if (!editor) return null;

  // 제목 스타일 아이콘들
  // const titleStyleOptions = [
  //   {
  //     icon: <Heading1 className="size-4" />,
  //     onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  //     pressed: editor.isActive('heading', { level: 1 }),
  //   },
  //   {
  //     icon: <Heading2 className="size-4" />,
  //     onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  //     pressed: editor.isActive('heading', { level: 2 }),
  //   },
  //   {
  //     icon: <Heading3 className="size-4" />,
  //     onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  //     pressed: editor.isActive('heading', { level: 3 }),
  //   },
  // ];

  // 텍스트 스타일 아이콘들
  const textStyleOptions = [
    {
      icon: <Bold className="size-4 " />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold'),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic'),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive('strike'),
    },
  ];

  // 정렬 스타일 아이콘들
  const alignmentOptions = [
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      pressed: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      pressed: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      pressed: editor.isActive({ textAlign: 'right' }),
    },
  ];

  // 리스트 스타일 아이콘들
  const listOptions = [
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList'),
    },
  ];

  // 이외 추가 스타일 아이콘들
  const otherOptions = [
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive('highlight'),
    },
    {
      icon: <ImagePlusIcon className="size-4" />,
      onClick: openModal,
      pressed: editor.isActive('highlight'),
    },
  ];

  return (
    <div className="z-50 p-1 mb-1 rounded-[20px] bg-white border-1 border-gray-200 flex items-center flex-wrap">
      {/* 텍스트 스타일 아이콘 그룹 */}
      <div className="flex items-center mr-3">
        {textStyleOptions.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.pressed}
            onPressedChange={option.onClick}
            className="cursor-pointer"
          >
            {option.icon}
          </Toggle>
        ))}
      </div>
      {/* 정렬 스타일 아이콘 그룹 */}
      <div className="flex items-center mr-3">
        {alignmentOptions.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.pressed}
            onPressedChange={option.onClick}
            className="cursor-pointer"
          >
            {option.icon}
          </Toggle>
        ))}
      </div>
      {/* 리스트 스타일 아이콘 그룹 */}
      <div className="flex items-center mr-3">
        {listOptions.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.pressed}
            onPressedChange={option.onClick}
            className="cursor-pointer"
          >
            {option.icon}
          </Toggle>
        ))}
      </div>
      {/* 이외 추가 스타일 아이콘 그룹 */}
      <div className="flex items-center mr-3">
        {otherOptions.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.pressed}
            onPressedChange={option.onClick}
            className="cursor-pointer"
          >
            {option.icon}
          </Toggle>
        ))}
      </div>
      {/* 텍스트 색상 기능 */}
      <div>
        <input
          type="color"
          onInput={(event) => editor.chain().focus().setColor(event.currentTarget.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          data-testid="setColor"
          className="w-8 h-8 p-1 border-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ToolBar;
