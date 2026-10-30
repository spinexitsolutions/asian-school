'use client'

import Link from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import clsx from 'clsx'
import {
  LinkSimple,
  ListBullets,
  ListNumbers,
  Quotes,
  TextB,
  TextHTwo,
  TextHThree,
  TextItalic,
  ArrowCounterClockwise,
  ArrowClockwise,
} from '@phosphor-icons/react'

export function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit.configure({ heading: { levels: [2, 3] } }), Link.configure({ openOnClick: false })],
    content: value || '',
    editorProps: { attributes: { class: 'a-prose' } },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? '' : editor.getHTML()),
  })

  if (!editor) return <div className="a-input min-h-[260px]" />

  const btn = (active: boolean, onClick: () => void, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={clsx('flex h-8 w-8 items-center justify-center rounded-md transition-colors', active ? 'bg-brand-600 text-white' : 'text-ink-2 hover:bg-soft')}
    >
      {icon}
    </button>
  )

  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Link address (leave empty to remove)', prev ?? 'https://')
    if (url === null) return
    if (!url) editor.chain().focus().unsetLink().run()
    else editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="overflow-hidden rounded-[0.7rem] bg-white ring-1 ring-line focus-within:ring-2 focus-within:ring-brand-500">
      <div className="flex flex-wrap gap-0.5 border-b border-line bg-soft/60 p-1.5">
        {btn(editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), 'Heading', <TextHTwo size={18} />)}
        {btn(editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), 'Sub-heading', <TextHThree size={18} />)}
        {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), 'Bold', <TextB size={18} weight="bold" />)}
        {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), 'Italic', <TextItalic size={18} />)}
        {btn(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), 'Bullet list', <ListBullets size={18} />)}
        {btn(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), 'Numbered list', <ListNumbers size={18} />)}
        {btn(editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run(), 'Quote', <Quotes size={18} />)}
        {btn(editor.isActive('link'), setLink, 'Link', <LinkSimple size={18} />)}
        <span className="mx-1 w-px bg-line" />
        {btn(false, () => editor.chain().focus().undo().run(), 'Undo', <ArrowCounterClockwise size={18} />)}
        {btn(false, () => editor.chain().focus().redo().run(), 'Redo', <ArrowClockwise size={18} />)}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
