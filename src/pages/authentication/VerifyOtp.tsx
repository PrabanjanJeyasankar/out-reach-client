'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import AppLogo from '@/components/app-logo'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { validateOTP } from '@/lib/validators'

export default function VerifyOtp() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateOTP(otp)
    setError(err)

    if (!err) {
      console.log('Submitting OTP:', otp)
      // TODO: API call
    }
  }

  const handleResend = () => {
    setIsResending(true)
    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      console.log('Resent OTP') // replace with actual logic
    }, 1500)
  }

  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <form onSubmit={handleSubmit} noValidate>
            {/* Header */}
            <div className='flex flex-col items-center gap-2'>
              <div className='flex size-8 items-center justify-center rounded-md'>
                <AppLogo />
              </div>
              <h1 className='text-xl font-bold'>Enter OTP</h1>
              <p className='text-sm text-muted-foreground'>We&apos;ve sent a one-time code to your email.</p>
            </div>

            {/* OTP Input */}
            <div className='grid gap-4 mt-6'>
              <div className='flex justify-center'>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(val) => {
                    // Only allow numbers
                    if (/^[0-9]*$/.test(val)) setOtp(val)
                  }}
                  inputMode='numeric'
                  pattern='[0-9]*'
                  className={error ? 'ring-1 ring-red-500' : ''}>
                  <InputOTPGroup className='gap-1'>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator className='mx-2' />
                  <InputOTPGroup className='gap-1'>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && <p className='text-xs text-red-500 mt-1 text-center'>{error}</p>}

              <Button type='submit' className='w-full mt-2'>
                Verify
              </Button>

              <p className='text-xs text-center text-muted-foreground mt-2'>
                Didn’t get the code?{' '}
                <button
                  type='button'
                  onClick={handleResend}
                  className='text-primary underline disabled:opacity-50'
                  disabled={isResending}>
                  {isResending ? 'Sending...' : 'Resend OTP'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
