import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/authentication/Login'

import Dashboard from './pages/dashboard/dashboard'
import SignUp from './pages/authentication/Signup'
import ForgotPassword from './pages/authentication/ForgotPassword'
import ResetPassword from './pages/authentication/ResetPassword'
import VerifyOtp from './pages/authentication/VerifyOtp'
import ImportContact from './pages/import-contact/ImportContact'
import Layout from './components/Layout'
import Templates from './pages/templates/templates'
import Settings from './pages/settings/settings'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />

          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='import' element={<ImportContact />} />
            <Route path='templates' element={<Templates />} />
            <Route path='settings' element={<Settings />} />
          </Route>

          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
