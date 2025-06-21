import LogoDark from '@/assets/logo.png'
import LogoLight from '@/assets/logo_white.png'

export default function AppLogo() {
  return (
    <div className='flex items-center justify-center'>
      <img src={LogoDark} alt='Out Reach Logo' className='h-6 w-6 object-contain dark:hidden' />
      <img src={LogoLight} alt='Out Reach Logo' className='h-6 w-6 object-contain hidden dark:block' />
    </div>
  )
}
