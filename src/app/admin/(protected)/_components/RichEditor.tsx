"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEffect, useRef, useState, useTransition } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading2, Heading3, List, ListOrdered, Quote, Code,
  Link as LinkIcon, Image as ImageIcon, Undo2, Redo2, Eraser, Loader2,
} from "lucide-react";
import { uploadImageAction } from "../gorseller/actions";

/**
 * RichEditor — Tiptap-backed WYSIWYG editor.
 *
 * Stores HTML in a hidden input named `name` so it flows through the surrounding
 * <form action={serverAction}>. Server actions then sanitize via sanitizeRichHtml().
 */
export default function RichEditor({
  name,
  defaultValue = "",
  placeholder = "İçerik gir…",
  minHeight = 200,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  minHeight?: number;
}) {
  const [html, setHtml] = useState(defaultValue);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, startUpload] = useTransition();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer nofollow", target: "_blank" },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultValue || "",
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "px-4 py-3 focus:outline-none",
      },
    },
  });

  // Insert uploaded image
  const handleFiles = (files: FileList | File[]) => {
    if (!editor) return;
    const list = Array.from(files);
    if (list.length === 0) return;
    setUploadError(null);
    startUpload(async () => {
      for (const f of list) {
        const fd = new FormData();
        fd.append("file", f);
        const res = await uploadImageAction(fd);
        if (res.ok) {
          editor.chain().focus().setImage({ src: res.url, alt: f.name }).run();
        } else {
          setUploadError(res.error);
        }
      }
    });
  };

  // Cleanup
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-[#2a3158] bg-[#0d1220] focus-within:border-[#6a4696] focus-within:ring-2 focus-within:ring-[#6a4696]/30">
      {/* Toolbar */}
      <Toolbar
        editor={editor}
        onPickImage={() => fileInputRef.current?.click()}
        uploading={uploading}
      />

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }}
      />

      {uploadError ? (
        <div className="border-b border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-300">
          {uploadError}
        </div>
      ) : null}

      <div style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>

      {/* Form value */}
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

function ToolbarButton({
  active,
  onClick,
  disabled,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition disabled:opacity-30 ${
        active
          ? "bg-[#6a4696]/30 text-white"
          : "text-[#8b8fa8] hover:bg-[#1a2240] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({
  editor,
  onPickImage,
  uploading,
}: {
  editor: Editor | null;
  onPickImage: () => void;
  uploading: boolean;
}) {
  if (!editor) return <div className="h-10 border-b border-[#2a3158] bg-[#111729]" />;

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL:", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-[#2a3158] bg-[#111729] px-2 py-1.5">
      <ToolbarButton title="Başlık 2" active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Başlık 3" active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>
      <Sep />
      <ToolbarButton title="Kalın (Ctrl+B)" active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="İtalik (Ctrl+I)" active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Altı çizili" active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Üstü çizili" active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <Sep />
      <ToolbarButton title="Madde işareti" active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Numaralı liste" active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Alıntı" active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Kod" active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code className="h-4 w-4" />
      </ToolbarButton>
      <Sep />
      <ToolbarButton title="Link" active={editor.isActive("link")} onClick={setLink}>
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton title="Görsel ekle (yükle)" onClick={onPickImage} disabled={uploading}>
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
      </ToolbarButton>
      <Sep />
      <ToolbarButton title="Biçimi temizle"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
        <Eraser className="h-4 w-4" />
      </ToolbarButton>
      <div className="ml-auto flex items-center gap-0.5">
        <ToolbarButton title="Geri al (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}>
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="İleri al (Ctrl+Shift+Z)" onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}>
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>
      </div>
    </div>
  );
}

function Sep() {
  return <span className="mx-1 h-5 w-px bg-[#2a3158]" />;
}
