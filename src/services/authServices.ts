import axiosInstance from '../utils/axiosInstance'

export type User = {
  username: string
  email: string
}

export type SignupPayload = {
  username: string
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type AuthResponse = {
  user: {
    username: string
    email: string
  }
}

export type ForgotPasswordPayload = {
  email: string
}

export type ChangePasswordPayload = {
  email: string
  password: string
}

export type VerifyOtpPayload = {
  email: string
  otp: string
}

export type ResendOtpPayload = {
  email: string
}

export type CheckUsernamePayload = {
  username: string
}

export type CheckUsernameResponse = {
  available: boolean
}

const authService = {
  signup: async (payload: SignupPayload): Promise<User> => {
    const { data } = await axiosInstance.post('/auth/signup', payload)
    const user = data.data
    return {
      username: user.username,
      email: user.email,
    }
  },

  login: async (payload: LoginPayload): Promise<User> => {
    const { data } = await axiosInstance.post('/auth/login', payload)
    const user = data.data
    return {
      username: user.username ?? user.name,
      email: user.email,
    }
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout')
  },

  forgotPassword: async ({ email }: ForgotPasswordPayload): Promise<void> => {
    await axiosInstance.post('/auth/forgetPassword', { email })
  },

  changePassword: async ({ email, password }: ChangePasswordPayload): Promise<void> => {
    await axiosInstance.post('/user/resetPassword', { email, password })
  },

  verifyOtp: async ({ email, otp }: VerifyOtpPayload): Promise<void> => {
    await axiosInstance.post('/auth/verifyOtp', { email, otp })
  },

  resendOtp: async ({ email }: ResendOtpPayload): Promise<void> => {
    await axiosInstance.post('/auth/resendOtp', { email })
  },

  checkUsername: async ({ username }: CheckUsernamePayload): Promise<CheckUsernameResponse> => {
    const response = await axiosInstance.post<CheckUsernameResponse>('/user/checkUsername', {
      username,
    })
    return response.data
  },

  githubAuthentication: async (): Promise<{ redirectUrl: string }> => {
    const response = await axiosInstance.get<{ redirectUrl: string }>('/auth/github/login')
    return response.data
  },
}

export default authService
