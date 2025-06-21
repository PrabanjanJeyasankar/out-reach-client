import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Eraser,
  Link2,
  ImageIcon,
  Loader2,
} from 'lucide-react'

import { useTemplateStore } from '@/store/template-store'
import { AttachmentToggle } from '../attachment-toggle'
import { useNavigate } from 'react-router-dom'

export function TemplateEditor() {
  const name = useTemplateStore((s) => s.name)
  const subject = useTemplateStore((s) => s.subject)
  const attachmentsEnabled = useTemplateStore((s) => s.attachmentsEnabled)
  const setName = useTemplateStore((s) => s.setName)
  const setSubject = useTemplateStore((s) => s.setSubject)
  const toggleAttachments = useTemplateStore((s) => s.toggleAttachments)
  const setHtml = useTemplateStore((s) => s.setHtml)
  const addTemplate = useTemplateStore((s) => s.addTemplate)
  const updateTemplate = useTemplateStore((s) => s.updateTemplate)
  const currentId = useTemplateStore((s) => s.currentId)
  const reset = useTemplateStore((s) => s.reset)

  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [linkValue, setLinkValue] = useState('')
  const [imageValue, setImageValue] = useState('')
  const [openLinkDialog, setOpenLinkDialog] = useState(false)
  const [openImageDialog, setOpenImageDialog] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Write your email here...' }),
      TextStyle,
      Color,
      Highlight,
      Image,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setHtml(editor.getHTML())
    },
  })

  const handleSave = async () => {
    if (!editor || !name || !subject) {
      toast.error('Name and subject are required.')
      return
    }

    setSaving(true)

    setTimeout(() => {
      const html = editor.getHTML()

      if (currentId) {
        updateTemplate(currentId, {
          name,
          subject,
          html,
          attachmentsEnabled,
        })

        toast('Template updated', {
          description: `${name} was updated successfully`,
        })
      } else {
        const newTemplate = {
          id: crypto.randomUUID(),
          name,
          subject,
          html,
          attachmentsEnabled,
        }

        addTemplate(newTemplate)

        toast('Template saved', {
          description: `${name} added to your list`,
        })
      }

      reset()
      setSaving(false)
      navigate('/templates')
    }, 1000)
  }

  const handleInsertLink = () => {
    if (linkValue) {
      editor?.chain().focus().setLink({ href: linkValue }).run()
      setLinkValue('')
      setOpenLinkDialog(false)
    }
  }

  const handleInsertImage = () => {
    if (imageValue) {
      editor?.chain().focus().setImage({ src: imageValue }).run()
      setImageValue('')
      setOpenImageDialog(false)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div>
          <Label>Template Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>Subject</Label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <AttachmentToggle enabled={attachmentsEnabled} onToggle={toggleAttachments} />

        <div className='border rounded-md'>
          <div className='flex flex-wrap items-center gap-2 border-b px-4 py-2 bg-muted'>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().undo().run()}>
              <Undo className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().redo().run()}>
              <Redo className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().toggleBold().run()}>
              <Bold className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().toggleItalic().run()}>
              <Italic className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().toggleUnderline().run()}>
              <UnderlineIcon className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().toggleStrike().run()}>
              <Strikethrough className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
              <Quote className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
              <AlignLeft className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
              <AlignCenter className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
              <AlignRight className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().toggleBulletList().run()}>
              <List className='w-4 h-4' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
              <ListOrdered className='w-4 h-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}>
              <Eraser className='w-4 h-4' />
            </Button>
            <Dialog open={openLinkDialog} onOpenChange={setOpenLinkDialog}>
              <DialogTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Link2 className='w-4 h-4' />
                </Button>
              </DialogTrigger>
              <DialogContent className='w-full max-w-sm'>
                <Label>Insert Link</Label>
                <Input value={linkValue} onChange={(e) => setLinkValue(e.target.value)} />
                <Button onClick={handleInsertLink}>Insert</Button>
              </DialogContent>
            </Dialog>
            <Dialog open={openImageDialog} onOpenChange={setOpenImageDialog}>
              <DialogTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <ImageIcon className='w-4 h-4' />
                </Button>
              </DialogTrigger>
              <DialogContent className='w-full max-w-sm'>
                <Label>Insert Image</Label>
                <Input value={imageValue} onChange={(e) => setImageValue(e.target.value)} />
                <Button onClick={handleInsertImage}>Insert</Button>
              </DialogContent>
            </Dialog>
          </div>
          <EditorContent editor={editor} className='min-h-[300px] p-4 prose dark:prose-invert' />
        </div>

        <div className='flex items-center gap-2'>
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className='w-4 h-4 animate-spin mr-2' />}
            {currentId ? 'Update Template' : 'Save Template'}
          </Button>
        </div>
      </div>
    </div>
  )
}
