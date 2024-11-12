'use client'
import PageTitle from '@/components/PageTitle'
// import { TableView } from '@/components/table-request'
import { Card } from '@/components/ui/card'
import React from 'react'
import {  columns } from './columns'
import { UsersDataTable } from './table-user'
import { useUser } from '@/hooks/use-user'



export default  function UsersPage () {
  const {users} = useUser()
 

  return (
    <div>
      <PageTitle title='Usuarios' />
      <Card>
      <UsersDataTable columns={columns} data={users || []} />

      </Card>
    </div>
  )
}
