'use client'

import type { ReactNode } from 'react'
import { AlertCircle, CheckCircle, FileText } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type CsvUploadInfoModalProps = {
  children: ReactNode
}

export default function CsvUploadInfoModal({ children }: CsvUploadInfoModalProps) {
  const requiredFields = [
    { name: 'first_name', description: "Contact's first name" },
    { name: 'last_name', description: "Contact's last name" },
    { name: 'email', description: 'Valid email address' },
    { name: 'company', description: 'Company or organization' },
  ]

  const optionalFields = [
    { name: 'position', description: 'Job title or role' },
    { name: 'role', description: 'Department or function' },
  ]

  const tips = [
    'Use UTF-8 encoding to avoid character issues',
    'Ensure email addresses are properly formatted',
    'Remove duplicate entries before uploading',
    'Keep field names exactly as shown above',
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='max-w-5xl w-full sm:max-w-[60vw] p-0 bg-white dark:bg-black text-black dark:text-white'>
        <div className='h-full max-h-[90vh] overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 hide-scrollbar'>
          <DialogHeader className='mb-4'>
            <DialogTitle className='flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl font-semibold'>
              <AlertCircle className='w-5 h-5 shrink-0' />
              <span>CSV Format Requirements</span>
            </DialogTitle>
            <p className='text-sm mb-4'>
              Upload a CSV file with the following structure for optimal email personalization.
            </p>
          </DialogHeader>

          {/* Required & Optional Fields */}
          <Card className='bg-white dark:bg-black border border-gray-200 dark:border-gray-800'>
            <CardHeader className='flex flex-row items-center gap-2 mb-2'>
              <CheckCircle className='w-5 h-5 text-green-600' />
              <h4 className='text-base sm:text-lg font-semibold'>Required & Optional Fields</h4>
            </CardHeader>
            <CardContent className='space-y-3'>
              {[...requiredFields, ...optionalFields].map((field, index) => {
                const isRequired = requiredFields.includes(field)
                return (
                  <div
                    key={index}
                    className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg'>
                    <div className='flex flex-wrap items-center gap-3'>
                      <code className='bg-black text-white px-2 py-1 rounded text-xs sm:text-sm font-mono'>
                        {field.name}
                      </code>
                      <span className='text-sm'>{field.description}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        isRequired ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-800'
                      }`}>
                      {isRequired ? 'Required' : 'Optional'}
                    </span>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Example CSV Section */}
          <Card className='bg-white dark:bg-black border border-gray-200 dark:border-gray-800 mt-6'>
            <CardHeader className='flex flex-row items-center gap-2 mb-2'>
              <FileText className='w-5 h-5 text-blue-600' />
              <h4 className='text-base sm:text-lg font-semibold'>Example CSV Format</h4>
            </CardHeader>
            <CardContent>
              <div className='bg-black text-white p-4 rounded-lg font-mono text-sm overflow-x-auto'>
                <div className='whitespace-pre'>
                  {`first_name,last_name,email,company,position,role
John,Doe,john.doe@example.com,TechCorp,Manager,Engineering
Jane,Smith,jane.smith@company.com,StartupInc,Developer,Frontend`}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='bg-white dark:bg-black !border-none !shadow-none '>
            <div className='bg-amber-50 dark:bg-amber-900/20  rounded-lg p-4 border border-amber-200 dark:border-amber-800'>
              <h4 className='font-medium text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2'>
                <AlertCircle className='h-4 w-4 text-amber-600 dark:text-amber-400' />
                Pro Tips
              </h4>

              <ul className='space-y-2'>
                {tips.map((tip, index) => (
                  <li key={index} className='text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0' />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* File Requirements */}
            <div className='flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400'>
              <span className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>Max file size: 10MB</span>
              <span className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>Supported: .csv files only</span>
              <span className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>Encoding: UTF-8 recommended</span>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
