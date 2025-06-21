'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/theme'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant='secondary' size='icon' onClick={toggleTheme}>
      {theme === 'dark' ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
      <span className='sr-only'>Toggle Theme</span>
    </Button>
  )
}
