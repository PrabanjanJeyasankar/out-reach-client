'use client'

import * as React from 'react'
import { CalendarClock, HardDriveDownload, House, ScrollText, Settings2 } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'

import { NavUser } from './nav-user'
import LogoHeader from './logo-header'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/toggle-theme-button'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: House,
    },
    {
      title: 'Import Data',
      url: '/import',
      icon: HardDriveDownload,
    },
    {
      title: 'Templates',
      url: '/templates',
      icon: ScrollText,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
    },
    {
      title: 'History',
      url: '/history',
      icon: CalendarClock,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const { state } = useSidebar()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <LogoHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title} className='mb-1'>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={location.pathname === item.url ? 'bg-muted' : ''}>
                  <Link to={item.url} className='flex items-center gap-2'>
                    {item.icon && <item.icon className='h-4 w-4' />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='flex flex-col items-start gap-3 pb-4'>
        {state === 'collapsed' && (
          <div className='rounded-md hover:bg-muted transition-colors'>
            <ThemeToggle />
          </div>
        )}

        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
