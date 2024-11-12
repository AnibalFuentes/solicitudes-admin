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
import { useWindowWidth } from '@react-hook/window-size'


// type Props = {}

export default function SideNavbar (/* {}: Props */) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const onlyWidth = useWindowWidth()
  const mobileWidth = onlyWidth < 768

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div className='relative w-auto border-r px-3 pb-10 pt-20 '>
      {/* width-{onlyWidth} */}
      {!mobileWidth && (
        <div className='absolute right-[-20px] top-7 '>
          <Button
            variant={'secondary'}
            className='rounded-full p-2 w-8 h-8  '
            onClick={() => toggleSidebar()}
          >
            {mobileWidth || isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: 'Dashboard',

            icon: LayoutDashboard,
            variant: 'default',
            href: '/'
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
  )
}
