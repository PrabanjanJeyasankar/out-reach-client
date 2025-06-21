import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { TemplateTable } from './templates-table'

import { useNavigate } from 'react-router-dom'

export default function Templates() {
  const navigate = useNavigate()

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Email Templates</h1>
        <Button onClick={() => navigate('/template/new')}>
          <Plus className='w-4 h-4 mr-2' />
          New Template
        </Button>
      </div>
      <TemplateTable />
    </div>
  )
}
