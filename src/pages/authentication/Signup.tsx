// src/pages/auth/SignUp.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLogo from '@/components/app-logo'
import authService from '@/services/authServices'
import { useAuthStore } from '@/store/auth-store'
import { toast } from 'sonner'
import { validateAuthForm, validateConfirmPassword, type AuthFormValues } from '@/lib/validators'

export default function SignUp() {
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<AuthFormValues>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [field]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // basic validation
    const baseErrors = validateAuthForm({
      email: values.email,
      password: values.password,
    })
    const confirmError = validateConfirmPassword(values.password, values.confirmPassword)
    const formErrors: AuthFormValues = {
      ...baseErrors,
      confirmPassword: confirmError,
      username: values.username.trim() ? undefined : 'Name is required',
    }
    setErrors(formErrors)

    if (Object.values(formErrors).some(Boolean)) return

    setIsSubmitting(true)
    try {
      const user = await authService.signup({
        username: values.username,
        email: values.email,
        password: values.password,
      })

      setUser(user)
      toast.success('Signed up successfully!')
      navigate('/', { replace: true })
    } catch (err) {
      console.error(err)
      toast.error('Sign-up failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <form onSubmit={handleSubmit} noValidate>
            <div className='flex flex-col gap-6'>
              {/* header */}
              <div className='flex flex-col items-center gap-2'>
                <a href='#' className='flex flex-col items-center gap-2 font-medium'>
                  <div className='flex size-8 items-center justify-center rounded-md'>
                    <AppLogo />
                  </div>
                  <span className='sr-only'>Out Reach.</span>
                </a>
                <h1 className='text-xl font-bold'>Welcome to Out Reach.</h1>
                <div className='text-center text-sm'>
                  Already have an account?{' '}
                  <Link to='/login' className='underline underline-offset-4'>
                    Login
                  </Link>
                </div>
              </div>

              {/* form fields */}
              <div className='flex flex-col gap-4'>
                {/* Name */}
                <div className='grid gap-1.5'>
                  <Label htmlFor='username'>Name</Label>
                  <Input
                    id='username'
                    value={values.username}
                    onChange={handleChange('username')}
                    className={errors.username ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    required
                  />
                  {errors.username && <p className='mt-1 text-xs text-red-500'>{errors.username}</p>}
                </div>

                {/* Email */}
                <div className='grid gap-1.5'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='m@example.com'
                    value={values.email}
                    onChange={handleChange('email')}
                    className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    required
                  />
                  {errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email}</p>}
                </div>

                {/* Password */}
                <div className='grid gap-1.5'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='••••••'
                    value={values.password}
                    onChange={handleChange('password')}
                    className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    required
                  />
                  {errors.password && <p className='mt-1 text-xs text-red-500'>{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className='grid gap-1.5'>
                  <Label htmlFor='confirmPassword'>Confirm Password</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    placeholder='••••••'
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    className={errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    required
                  />
                  {errors.confirmPassword && <p className='mt-1 text-xs text-red-500'>{errors.confirmPassword}</p>}
                </div>

                <Button type='submit' className='w-full mt-2' disabled={isSubmitting}>
                  {isSubmitting ? 'Signing up…' : 'Sign Up'}
                </Button>
              </div>
            </div>
          </form>

          <div className='text-muted-foreground text-center text-xs *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary'>
            By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  )
}
