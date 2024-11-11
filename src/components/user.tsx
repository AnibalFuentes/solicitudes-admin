import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { ChevronsUpDown } from 'lucide-react'
import { Card } from './ui/card'

type Props = {
    isCollapsed:boolean
    mobileWidth:boolean
}
const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg'
    }
  }
export default function UserSidebar({isCollapsed,mobileWidth}: Props) {
  return (
    <div className='mb-20'>

      {isCollapsed || mobileWidth ? (
          <Avatar className='h-8 w-8 rounded-lg'>
          {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
          <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
          </Avatar>
        ) : (
            <Card className='p-3'>
        <div className='flex '>
          <Avatar className='h-8 w-8 rounded-lg'>
            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
            <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className=' font-semibold'>{data.user.name}</span>
            <span className=' text-xs'>{data.user.email}</span>
          </div>
          <ChevronsUpDown className='ml-auto size-4' />
        </div>
        </Card>
      )}
      </div>
  )
}