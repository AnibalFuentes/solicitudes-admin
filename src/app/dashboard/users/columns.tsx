'use client'

import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { User } from '@/interfaces/user.interface'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },

  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'desc')}
        >
          Nombre
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  // {
  //   accessorKey: 'amount',
  //   header: () => <div className='text-right'>Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue('amount'))
  //     const formatted = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD'
  //     }).format(amount)

  //     return <div className='text-right font-medium'>{formatted}</div>
  //   }
  // },
  {
    accessorKey: 'state',
    header: 'Estado',
    cell: ({ row }) => {
      return (
        <Badge
          className={cn('font-medium w-fit px-4 py-2 rounded-lg text-black', {
            'bg-red-200': row.getValue('state') == false,
            
            'bg-green-200': row.getValue('state') == true
          })}
        >
          {row.getValue('state')?'Activo':'Inactivo'}
        </Badge>
      )
    }
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const user = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant='ghost' className='h-8 w-8 p-0'>
  //             <span className='sr-only'>Open menu</span>
  //             <MoreHorizontal className='h-4 w-4' />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align='end'>
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(user.uid)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   }
  // }
]
