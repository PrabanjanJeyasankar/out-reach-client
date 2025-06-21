import AppLogo from '@/components/app-logo'
import { ThemeToggle } from '@/components/toggle-theme-button'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'

export default function LogoHeader() {
  const { state } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className='flex w-full items-center justify-between'>
          <SidebarMenuButton
            size='lg'
            className='flex items-center gap-3 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg'>
              <AppLogo />
            </div>
            <div className='grid text-left leading-tight'>
              <Link to='/' className='text-lg font-semibold tracking-normal'>
                Out Reach
              </Link>
              <span className='text-xs font-mono tracking-tight text-black/50 dark:text-white/50'>
                Cold Mailing App
              </span>
            </div>
          </SidebarMenuButton>
          {state === 'expanded' && (
            <div className='ml-auto pr-2'>
              <ThemeToggle />
            </div>
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
