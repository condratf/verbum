'use client';
import { FC, PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'

import { Sidebar, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { Separator } from '@radix-ui/react-separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrump';
import { LanguagesIcon } from 'lucide-react';
import { Icon } from '../common';

interface AppSidebarProps {
  role?: 'student' | 'professor'
}

export const WithSidebar: FC<PropsWithChildren<AppSidebarProps>> = ({ children, role = 'student' }) => {
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <div className='w-full p-5 no-scrollbar'>
        <AppHeader />

        <div className='no-scrollbar'>
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

const AppSidebar: FC<AppSidebarProps> = ({ role = 'student' }) => {
  const professorItems = [
    { title: 'Home', url: '/', icon: () => <Icon icon="home" /> },
    { title: 'Credits', url: '/credits', icon: () => <Icon icon="account_balance" /> },
    { title: 'Profile', url: '/profile', icon: () => <Icon icon="account_box" /> },
    { title: 'Students', url: '/students', icon: () => <Icon icon="groups" /> },
    { title: 'Schedule', url: '/schedule', icon: () => <Icon icon="calendar_month" /> },
  ];
  const studentItems = [
    { title: 'Home', url: '/', icon: () => <Icon icon="home" /> },
    { title: 'Lessons', url: '/lessons', icon: () => <Icon icon="book" /> },
    { title: 'Credits', url: '/credits', icon: () => <Icon icon="account_balance" /> },
    { title: 'Schedule a lesson', url: '/schedule', icon: () => <Icon icon="calendar_month" /> },
  ];

  return (
    <Sidebar collapsible='icon' >
      <SidebarHeader >
        <LanguagesIcon />
      </SidebarHeader>

      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {(role === 'professor' ? professorItems : studentItems).map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  )
}

const AppHeader: FC = ({ }) => {
  const pathname = usePathname()
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {pathname.split('/').filter(Boolean).map((segment, index, array) => (
              <BreadcrumbItem key={index}>
                {index < array.length - 1 ? (
                  <>
                    <BreadcrumbLink href={'/' + array.slice(0, index + 1).join('/')}>
                      {segment}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}