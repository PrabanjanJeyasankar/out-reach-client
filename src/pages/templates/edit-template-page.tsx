import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useTemplateStore } from '@/store/template-store'
import { TemplateEditor } from './editor/editor'

export default function EditTemplatePage() {
  const { id } = useParams()
  const loadTemplate = useTemplateStore((s) => s.loadTemplate)

  useEffect(() => {
    if (id) loadTemplate(id)
  }, [id, loadTemplate])

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-semibold'>Edit Template</h1>
      <TemplateEditor />
    </div>
  )
}
