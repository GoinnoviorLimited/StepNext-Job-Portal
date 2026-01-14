import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  FaBold, 
  FaItalic, 
  FaListUl, 
  FaListOl, 
  FaUndo, 
  FaRedo,
  FaRemoveFormat
} from 'react-icons/fa';

/**
 * A sleek, TipTap-based rich text editor.
 */
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-sky-100 text-sky-600' : 'text-gray-600'}`}
        title="Bold"
      >
        <FaBold size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-sky-100 text-sky-600' : 'text-gray-600'}`}
        title="Italic"
      >
        <FaItalic size={14} />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-sky-100 text-sky-600' : 'text-gray-600'}`}
        title="Bullet List"
      >
        <FaListUl size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-sky-100 text-sky-600' : 'text-gray-600'}`}
        title="Numbered List"
      >
        <FaListOl size={14} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        className="p-2 rounded hover:bg-gray-200 text-gray-600 title='Clear Formatting'"
      >
        <FaRemoveFormat size={14} />
      </button>

      <div className="flex-grow" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 rounded hover:bg-gray-200 text-gray-400 disabled:opacity-30"
      >
        <FaUndo size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 rounded hover:bg-gray-200 text-gray-400 disabled:opacity-30"
      >
        <FaRedo size={14} />
      </button>
    </div>
  );
};

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        
        paragraph: {
          HTMLAttributes: {
            class: 'mb-1',
          },
        },
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[120px] p-4 max-w-none',
      },
    },
  });

  if (!editor) {
    return null;
  }


  return (
    <div className="relative border rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {editor.isEmpty && placeholder && (
        <div className="absolute top-[52px] left-4 text-gray-400 pointer-events-none text-sm italic">
          {placeholder}
        </div>
      )}
      <style>{`
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .tiptap ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .tiptap li {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
