import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLogo from '@/components/app-logo'
import { validateEmail } from '@/lib/validators'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateEmail(email)
    setError(err)

    if (!err) {
      console.log('Sending reset link to', email)
      // TODO: Trigger API
    }
  }

  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative'>
      <Button
        variant='ghost'
        onClick={() => navigate(-1)}
        className='absolute left-4 top-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground'>
        <ChevronLeft className='h-4 w-4' />
        Back
      </Button>

      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <form onSubmit={handleSubmit} noValidate>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center gap-2'>
                <div className='flex size-8 items-center justify-center rounded-md'>
                  <AppLogo />
                </div>
                <h1 className='text-xl font-bold'>Forgot your password?</h1>
                <div className='text-center text-sm '>Enter your email address and we'll send you a OTP.</div>
              </div>

              <div className='grid gap-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  required
                />
                {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
              </div>

              <Button type='submit' className='w-full mt-2'>
                Send Reset Link
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
