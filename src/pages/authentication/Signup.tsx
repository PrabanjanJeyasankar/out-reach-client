import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLogo from '@/components/app-logo'
import { validateAuthForm, validateConfirmPassword } from '@/lib/validators'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>(
    {}
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const baseErrors = validateAuthForm({ email, password })
    const confirmError = validateConfirmPassword(password, confirmPassword)
    const formErrors = {
      ...baseErrors,
      name: name.trim() ? undefined : 'Name is required',
      confirmPassword: confirmError,
    }

    setErrors(formErrors)

    const hasErrors = Object.values(formErrors).some((v) => v)
    if (!hasErrors) {
      console.log('Signing up with', { name, email, password })
      // TODO: Submit to API
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
                  Already have an account?{' '}
                  <Link to='/login' className='underline underline-offset-4'>
                    Login
                  </Link>
                </div>
              </div>

              <div className='flex flex-col gap-4'>
                {/* Name */}
                <div className='grid gap-1.5'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    type='text'
                    placeholder='Jane Doe'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    required
                  />
                  {errors.name && <p className='text-xs text-red-500 mt-1'>{errors.name}</p>}
                </div>

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

                {/* Confirm Password */}
                <div className='grid gap-1.5'>
                  <Label htmlFor='confirmPassword'>Confirm Password</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    placeholder='••••••'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    required
                  />
                  {errors.confirmPassword && <p className='text-xs text-red-500 mt-1'>{errors.confirmPassword}</p>}
                </div>

                <Button type='submit' className='w-full mt-2'>
                  Sign Up
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
