import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLogo from '@/components/app-logo'
import { validatePassword, validateConfirmPassword } from '@/lib/validators'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formErrors = {
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    }
    setErrors(formErrors)

    if (!formErrors.password && !formErrors.confirmPassword) {
      console.log('Resetting password to', password)
    }
  }

  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <form onSubmit={handleSubmit} noValidate>
            <div className='flex flex-col items-center gap-2'>
              <div className='flex size-8 items-center justify-center rounded-md'>
                <AppLogo />
              </div>
              <h1 className='text-xl font-bold'>Reset your password</h1>
              <div className='text-center text-sm '> Almost there! Just set your new password below.</div>
            </div>

            <div className='grid gap-4 mt-6'>
              <div className='grid gap-1.5'>
                <Label htmlFor='password'>New Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {errors.password && <p className='text-xs text-red-500 mt-1'>{errors.password}</p>}
              </div>

              <div className='grid gap-1.5'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='••••••'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}
                />
                {errors.confirmPassword && <p className='text-xs text-red-500 mt-1'>{errors.confirmPassword}</p>}
              </div>

              <Button type='submit' className='w-full mt-2'>
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
