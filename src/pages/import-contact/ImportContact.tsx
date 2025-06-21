'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClipboardList, FileText, CardSim, HelpCircle } from 'lucide-react'

import PasteData from './tabs/PasteData'
import ContactForm from './tabs/ContactForm'
import CSVUploader from './tabs/CsvUploader'
import CsvUploadInfoModal from './CsvUploadInfoModal'
import { Button } from '@/components/ui/button'

export default function ImportContact() {
  return (
    <Card className='!shadow-none !border-none'>
      <CardHeader>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full'>
          <div>
            <CardTitle className='text-lg md:text-xl font-semibold -tracking-normal'>Import Data</CardTitle>
            <CardDescription className='text-sm text-muted-foreground'>
              Choose a method to upload or enter your cold email contacts.
            </CardDescription>
          </div>

          <CsvUploadInfoModal>
            <Button
              type='button'
              variant='default'
              size='sm'
              className='flex items-center gap-1 self-start sm:self-auto'>
              <HelpCircle className='h-4 w-4' />
              CSV Requirements
            </Button>
          </CsvUploadInfoModal>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue='csv' className='w-full'>
          <div className='overflow-x-auto'>
            <TabsList className='grid min-w-[420px] grid-cols-3 sm:w-full'>
              <TabsTrigger value='form' className='flex items-center justify-center gap-1.5 whitespace-nowrap'>
                <FileText className='h-4 w-4' />
                Form
              </TabsTrigger>
              <TabsTrigger value='csv' className='flex items-center justify-center gap-1.5 whitespace-nowrap'>
                <CardSim className='h-4 w-4' />
                Upload CSV
              </TabsTrigger>
              <TabsTrigger value='paste' className='flex items-center justify-center gap-1.5 whitespace-nowrap'>
                <ClipboardList className='h-4 w-4' />
                Paste Data
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='form'>
            <ContactForm />
          </TabsContent>

          <TabsContent value='csv'>
            <CSVUploader />
          </TabsContent>

          <TabsContent value='paste'>
            <PasteData />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
