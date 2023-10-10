import React, { useEffect, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent, Editor, JSONContent, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import { FaBold, FaItalic, FaListOl, FaListUl, FaRedo, FaStrikethrough, FaUnderline, FaUndo } from "react-icons/fa";
import "./richEditor.css";
import useClickOutside from "../../../CustomHooks/useClickOutside";

type RichEditorData = {
  text: string;
  serializedContent: JSONContent | undefined;
};

type RichEditorHook = {
  editor: Editor | null;
  editorData: RichEditorData;
};

export const useRichEditor = (maxCharacters = 2000): RichEditorHook => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, CharacterCount.configure({ limit: maxCharacters })],
  });

  const editorData = useMemo((): RichEditorData => ({ text: editor?.getText() as string, serializedContent: editor?.getJSON() }), [editor?.state]);

  return { editor, editorData };
};

type RichEditorProps = {
  editor: Editor | null;
  editorContentClassName?: string;
  maxCharacters?: number;
  editable?: boolean;
  initialContent?: string;
};

export const RichTextEditor: React.FC<RichEditorProps> = ({
  editor,
  editorContentClassName,
  maxCharacters = 2000,
  editable = true,
  initialContent,
}) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setFocused(false), "mousedown");
  const text = useMemo(() => editor?.getText() as string, [editor?.state]);

  editor?.setEditable(editable);
  useEffect(() => {
    initialContent && editor && setEditorContentFromRaw(initialContent, editor);
  }, [initialContent, editor === null]);
  return (
    <div className="flex flex-col gap-1 mt-1 test" ref={ref}>
      <EditorContent
        onFocus={() => setFocused(true)}
        editor={editor}
        className={editorContentClassName || "flex flex-col w-full h-36 rounded-md bg-gray-800 text-white overflow-auto"}
      />
      {focused && editable && (
        <div className="flex justify-between">
          <EditorButtons editor={editor} />{" "}
          <p className={`text-sm italic self-end ${text?.length >= maxCharacters ? "text-yellow-400" : "text-teal-500"}`}>
            {text?.length}/{maxCharacters}
          </p>
        </div>
      )}
    </div>
  );
};

type EditorButtonsProps = {
  editor: Editor | null;
};

export const EditorButtons: React.FC<EditorButtonsProps> = ({ editor }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex gap-1">
        <button
          className="hover:bg-gray-600 p-1 rounded"
          style={{ border: editor?.isActive("bold") ? "1px solid white" : "none" }}
          onClick={() => editor?.chain().toggleBold().focus().run()}
        >
          <FaBold />
        </button>
        <button
          className="hover:bg-gray-600 p-1 rounded"
          style={{ border: editor?.isActive("italic") ? "1px solid white" : "none" }}
          onClick={() => editor?.chain().toggleItalic().focus().run()}
        >
          <FaItalic />
        </button>
        <button
          className="hover:bg-gray-600 p-1 rounded"
          style={{ border: editor?.isActive("underline") ? "1px solid white" : "none" }}
          onClick={() => editor?.chain().toggleUnderline().focus().run()}
        >
          <FaUnderline />
        </button>
        <button
          className="hover:bg-gray-600 p-1 rounded"
          style={{ border: editor?.isActive("strike") ? "1px solid white" : "none" }}
          onClick={() => editor?.chain().toggleStrike().focus().run()}
        >
          <FaStrikethrough />
        </button>
      </div>
      <div className="flex gap-1">
        <button
          className="hover:bg-gray-600 p-1 rounded"
          style={{ border: editor?.isActive("bulletList") ? "1px solid white" : "none" }}
          onClick={() => editor?.chain().toggleBulletList().focus().run()}
        >
          <FaListUl />
        </button>
        <button
          className="hover:bg-gray-600 p-1 rounded"
          style={{ border: editor?.isActive("orderedList") ? "1px solid white" : "none" }}
          onClick={() => editor?.chain().toggleOrderedList().focus().run()}
        >
          <FaListOl />
        </button>
      </div>
      <div className="flex gap-1">
        <button className="hover:bg-gray-600 p-1 rounded" onClick={() => editor?.chain().undo().focus().run()}>
          <FaUndo />
        </button>
        <button className="hover:bg-gray-600 p-1 rounded" onClick={() => editor?.chain().redo().focus().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export const setEditorContentFromRaw = (editorContent: string, editor: Editor) => {
  try {
    const content = JSON.parse(editorContent);
    editor?.commands.setContent(content.serializedContent);
  } catch (error) {
    editor?.commands.setContent(editorContent);
  }
};
