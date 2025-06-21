import { TemplateEditor } from './editor/editor'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTemplateStore } from '@/store/template-store'

export default function NewTemplatePage() {
  const html = useTemplateStore((s) => s.html)
  const company = 'signahiring'

  return (
    <div className='p-6 space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Create New Template</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <Eye className='w-4 h-4 mr-2' />
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-5xl w-full max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>Preview</DialogTitle>
            </DialogHeader>
            <div className='bg-white px-6 py-4 rounded-md space-y-4 text-sm text-gray-800'>
              <div>
                <span className='font-semibold'>Prabanjan Jeyasankar</span>{' '}
                <span className='text-gray-500'>&lt;prabanjanjeyasankar@gmail.com&gt;</span>
              </div>
              <div className='text-gray-600'>
                to <span className='font-medium'>{company}</span>
              </div>
              <hr />
              <div
                className='prose max-w-none'
                dangerouslySetInnerHTML={{
                  __html: html.replace(/{{company}}/g, company).replace(/{{role}}/g, 'Developer'),
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <TemplateEditor />
    </div>
  )
}
