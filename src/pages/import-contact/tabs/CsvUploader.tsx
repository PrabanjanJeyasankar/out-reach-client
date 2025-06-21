'use client'

import { useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

import { cn } from '@/lib/utils'
import { CloudUpload, MousePointerClick } from 'lucide-react'
import Papa from 'papaparse'

type Contact = { email: string; name: string; role: string; company: string }

export default function CSVUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [error, setError] = useState<string>()

  const parseCSV = (file: File) => {
    setError(undefined)
    Papa.parse<Contact>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const ok = res.data.every((c) => c.email && c.name && c.role && c.company)
        if (!ok) {
          setError('Some rows are missing required fields.')
          setContacts([])
        } else {
          setContacts(res.data)
        }
      },
      error: (err) => setError(err.message),
    })
  }

  const handleFile = (file: File) => {
    setFileName(file.name)
    parseCSV(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file?.type === 'text/csv') handleFile(file)
  }

  return (
    <>
      {/* CsvUploadInfoModal trigger inline with button below */}
      <Card className='!shadow-none !border-none'>
        <CardContent className='p-6'>
          <form
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed py-12 px-2 transition-colors',
              isDragging ? 'border-primary bg-muted/40' : 'border-muted'
            )}>
            <div className='flex flex-col items-center gap-1 text-muted-foreground'>
              <CloudUpload strokeWidth={0.8} className='h-15 w-15' />
              <span className='text-xs text-center'>Drag & drop your CSV file</span>
            </div>

            <div className='flex items-center justify-center py-4 gap-3'>
              <span className='h-px w-24 bg-border' />
              <span className='text-sm text-muted-foreground whitespace-nowrap'>Or</span>
              <span className='h-px w-24 bg-border' />
            </div>

            {/* Upload button + Modal trigger inline */}
            <div className='flex gap-2 items-center'>
              <Button type='button' variant='secondary'>
                <MousePointerClick className='h-3 w-3 mr-1' />
                Choose File
              </Button>
            </div>

            <input
              ref={inputRef}
              type='file'
              accept='.csv'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
              }}
            />

            <span className='text-sm text-muted-foreground'>
              {fileName ? `Selected: ${fileName}` : 'Supports only .csv files'}
            </span>
          </form>

          {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}

          {contacts.length > 0 && (
            <>
              <Table className='mt-6'>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((c, i) => (
                    <TableRow key={i}>
                      <TableCell>{c.email}</TableCell>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.role}</TableCell>
                      <TableCell>{c.company}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button
                className='mt-4'
                onClick={() => {
                  fetch('/api/contacts/import', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contacts }),
                  }).then(console.log)
                }}>
                Import Contacts
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
