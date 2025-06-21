'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PasteData() {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const requiredFields = ['first_name', 'last_name', 'email', 'company']

  const validateJson = (input: string) => {
    try {
      const parsed = JSON.parse(input)
      if (!Array.isArray(parsed)) return 'Input should be an array of contacts.'

      const invalid = parsed.some((item) => requiredFields.some((field) => !item?.[field]))

      if (invalid) {
        return `Each contact must include: ${requiredFields.join(', ')}`
      }

      return null
    } catch {
      return 'Invalid JSON format.'
    }
  }

  useEffect(() => {
    if (!value.trim()) {
      setError(null)
      return
    }

    const validationError = validateJson(value)
    setError(validationError)
  }, [value])

  return (
    <Card className='!shadow-none !border-none'>
      <CardContent className='space-y-4'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
          <Label htmlFor='json-paste' className='text-sm text-muted-foreground'>
            Paste CSV or JSON Data
          </Label>
          <Badge variant='outline' className='text-xs px-2 py-1 self-start sm:self-auto'>
            .csv or JSON format
          </Badge>
        </div>

        <Textarea
          id='json-paste'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`[\n  { "first_name": "John", "last_name": "Doe", "email": "john@example.com", "company": "Acme", "role": "CTO" },\n  { "first_name": "Jane", "last_name": "Smith", "email": "jane@xyz.com", "company": "XYZ Inc", "role": "Engineer" }\n]`}
          rows={12}
          className={cn(
            'font-mono text-sm min-h-[20rem] resize-y',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
        />

        {error ? (
          <p className='text-xs text-destructive'>{error}</p>
        ) : (
          <div className='text-xs text-muted-foreground flex flex-col sm:flex-row items-start gap-2'>
            <Info className='h-4 w-4 shrink-0' />
            <span>
              You can paste directly from a spreadsheet export or JSON format. Required fields include:{' '}
              <code className='font-mono'>{requiredFields.join(', ')}</code>.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
