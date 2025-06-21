export interface AuthFormValues {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  otp?: string
}

export const validateUsername = (username?: string): string | undefined => {
  if (!username?.trim()) return 'Name is required'
  return undefined
}

export const validateEmail = (email?: string): string | undefined => {
  if (!email?.trim()) return 'Email is required'
  const isValid = /\S+@\S+\.\S+/.test(email)
  return isValid ? undefined : 'Enter a valid email address'
}

export const validatePassword = (password?: string): string | undefined => {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters'
  return undefined
}

export const validateConfirmPassword = (password?: string, confirmPassword?: string): string | undefined => {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return undefined
}

export const validateOTP = (otp?: string): string | undefined => {
  if (!otp) return 'Enter the OTP code'
  if (!/^\d{6}$/.test(otp)) return 'OTP must be a 6-digit number'
  return undefined
}

export const validateAuthForm = (values: AuthFormValues): AuthFormValues => {
  const errors: AuthFormValues = {}

  if (values.username !== undefined) {
    const usernameError = validateUsername(values.username)
    if (usernameError) errors.username = usernameError
  }

  if (values.email !== undefined) {
    const emailError = validateEmail(values.email)
    if (emailError) errors.email = emailError
  }

  if (values.password !== undefined) {
    const passwordError = validatePassword(values.password)
    if (passwordError) errors.password = passwordError
  }

  if (values.confirmPassword !== undefined) {
    const confirmError = validateConfirmPassword(values.password, values.confirmPassword)
    if (confirmError) errors.confirmPassword = confirmError
  }

  if (values.otp !== undefined) {
    const otpError = validateOTP(values.otp)
    if (otpError) errors.otp = otpError
  }

  return errors
}
