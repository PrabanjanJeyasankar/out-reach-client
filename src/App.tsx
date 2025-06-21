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
import History from './pages/history/history'
import NewTemplatePage from './pages/templates/new'
import { Toaster } from 'sonner'
import EditTemplatePage from './pages/templates/edit-template-page'

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
            <Route path='template/new' element={<NewTemplatePage />} />
            <Route path='template/:id/edit' element={<EditTemplatePage />} />
            <Route path='settings' element={<Settings />} />
            <Route path='history' element={<History />} />
          </Route>

          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
