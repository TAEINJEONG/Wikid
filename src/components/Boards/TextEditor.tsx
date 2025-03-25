'use client';

import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TooBar from './Toolbar';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import ImageResize from 'tiptap-extension-resize-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

interface Test {
  content: string;
  onChange: (content: string) => void;
  openModal: () => void;
  onEditorReady: (editor: Editor) => void;
}
const TextEditor = ({ content, onChange, openModal, onEditorReady }: Test) => {
  const [lengths, setLengths] = useState({ withSpaces: 0, withoutSpaces: 0 });
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-3',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
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
    content: content || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[500px] rounded-md bg-white outline-none py-2 px-2 caret-green-300 text-lg-r md:text-xl-r',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      const fullText = editor.getText();
      const textWithoutSpaces = fullText.replace(/\s/g, '');
      setLengths({
        withSpaces: fullText.length,
        withoutSpaces: textWithoutSpaces.length,
      });
    },
  });

  useEffect(() => {
    if (editor) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  return (
    <div>
      <div className="flex mb-[10px]">
        <p>공백포함 : 총</p>
        <p> {lengths.withSpaces}</p>
        <p>자 | 공백제외 : 총</p>
        <p> {lengths.withoutSpaces}</p>
        <p>자</p>
      </div>
      <EditorContent editor={editor} />
      <TooBar editor={editor} openModal={openModal} />
    </div>
  );
};

export default TextEditor;
