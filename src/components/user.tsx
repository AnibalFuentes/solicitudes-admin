import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Card } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  FileText,
  LifeBuoy,
  LogOut,
  User
} from 'lucide-react'
import { signOutAccount } from '@/lib/firebase'
import { useUser } from '@/hooks/use-user'

type Props = {
  isCollapsed: boolean
  mobileWidth: boolean
}

// Función para obtener las iniciales del nombre
const getInitials = (name: string) => {
  const nameParts = name.split(' ')
  const initials = nameParts
    .map(part => part[0].toUpperCase()) // Obtiene la primera letra de cada palabra
    .join('')
  return initials
}
const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, char => char.toUpperCase())
}


export default function UserSidebar({ isCollapsed, mobileWidth }: Props) {
  const {user} = useUser()

  return (
    <div className='mb-20 cursor-pointer'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isCollapsed || mobileWidth ? (
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarFallback className='rounded-lg'>
                {user?.name ? getInitials(user.name) : 'NN'} {/* 'NN' es un valor predeterminado */}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Card className='p-3'>
              <div className='flex '>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarFallback className='rounded-lg'>
                    {user?.name ? getInitials(user.name) : 'NN'} {/* 'NN' es un valor predeterminado */}
                  </AvatarFallback>
                </Avatar>
                <div className='grid text-left text-sm leading-tight'>
                  <span className='font-semibold'>{user?.name ? capitalizeWords(user.name) : ''}</span>
                  <span className='text-xs'>{user?.email}</span>
                </div>
                {/* <ChevronsUpDown className='ml-auto size-4' /> */}
              </div>
            </Card>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel className='text-center flex items-center'>
            <Avatar className='h-8 w-8 rounded-lg text-center mr-3'>
              <AvatarFallback className='rounded-lg'>
                {user?.name ? getInitials(user.name) : 'NN'} {/* 'NN' es un valor predeterminado */}
              </AvatarFallback>
            </Avatar>
            {user?.name ? capitalizeWords(user.name) : 'Sin nombre'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className='hover:bg-gray-200 cursor-pointer'>
              <User className='mr-2 h-4 w-4' />
              <span>Perfil</span>
            </DropdownMenuItem>

            <DropdownMenuItem className='hover:bg-gray-200 cursor-pointer'>
              <FileText className='mr-2 h-4 w-4' />
              <span>Terminos y Condiciones</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='hover:bg-gray-200 cursor-pointer'>
              <LifeBuoy className='mr-2 h-4 w-4' />
              <span>Soporte</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOutAccount()}
            className='hover:bg-gray-200 cursor-pointer'
          >
            <LogOut className='mr-2 h-4 w-4' />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
