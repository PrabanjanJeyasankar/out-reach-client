import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLogo from '@/components/app-logo'
import { validateAuthForm } from '@/lib/validators'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formErrors = validateAuthForm({ email, password })
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      console.log('Logging in with', { email, password })
      // TODO: Submit to backend
    }
  }

  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <form onSubmit={handleSubmit} noValidate>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center gap-2'>
                <a href='#' className='flex flex-col items-center gap-2 font-medium'>
                  <div className='flex size-8 items-center justify-center rounded-md'>
                    <AppLogo />
                  </div>
                  <span className='sr-only'>Out Reach.</span>
                </a>
                <h1 className='text-xl font-bold'>Welcome to Out Reach.</h1>
                <div className='text-center text-sm '>
                  Don&apos;t have an account?{' '}
                  <Link to='/signup' className='underline underline-offset-4'>
                    Sign up
                  </Link>
                </div>
              </div>

              <div className='flex flex-col gap-4'>
                {/* Email */}
                <div className='grid gap-1.5'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    required
                  />
                  {errors.email && <p className='text-xs text-red-500 mt-1'>{errors.email}</p>}
                </div>

                {/* Password */}
                <div className='grid gap-1.5'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='••••••'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    required
                  />
                  {errors.password && <p className='text-xs text-red-500 mt-1'>{errors.password}</p>}
                </div>

                <div className='text-right text-xs'>
                  <Link to='/forgot-password' className='text-muted-foreground hover:text-foreground'>
                    Forgot password?
                  </Link>
                </div>

                <Button type='submit' className='w-full mt-2'>
                  Login
                </Button>
              </div>
            </div>
          </form>

          <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
            By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  )
}
