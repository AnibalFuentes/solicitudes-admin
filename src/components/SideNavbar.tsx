/** @format */
'use client'
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Speech,
  Users2
} from 'lucide-react'
import React, { useState } from 'react'
import { Nav } from '@/components/ui/nav'
import { Button } from './ui/button'
import { useIsMobile } from '@/hooks/use-mobile'

export default function SideNavbar () {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isMobile = useIsMobile()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Muestra navegación lateral en desktop */}
      {!isMobile ? (
        <div className='relative w-auto border-r px-3 pb-10 pt-20  bg-gray-50'>
          <div className='absolute right-[-20px] top-7 '>
            <Button
              variant={'secondary'}
              className='rounded-full p-2 w-8 h-8'
              onClick={() => toggleSidebar()}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>

          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'Dashboard',
                icon: LayoutDashboard,
                variant: 'default',
                href: '/dashboard'
              },
              {
                title: 'Solicitudes',
                icon: Speech,
                variant: 'ghost',
                href: '/dashboard/requests'
              },
              {
                title: 'Usuarios',
                icon: Users2,
                variant: 'ghost',
                href: '/dashboard/users'
              }
            ]}
          />
        </div>
      ) : (
        // Muestra navegación inferior en mobile
        <div className='fixed  left-0  border-r bg-gray-50 rounden-xl  dark:bg-gray-800'>
          <Nav
            isCollapsed={true}
            links={[
              {
                title: 'Dashboard',
                icon: LayoutDashboard,
                variant: 'default',
                href: '/dashboard'
              },
              {
                title: 'Solicitudes',
                icon: Speech,
                variant: 'ghost',
                href: '/dashboard/requests'
              },
              {
                title: 'Usuarios',
                icon: Users2,
                variant: 'ghost',
                href: '/dashboard/users'
              }
            ]}
          />
        </div>
      )}
    </>
  )
}
