import PageTitle from '@/components/PageTitle'
// import { TableView } from '@/components/table-request'
import { Card } from '@/components/ui/card'
import React from 'react'
import { Payment, columns } from './columns'
import { DataTable } from './data-table'

async function getData (): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    
    
    {
      id: '728ed52f',
      amount: 100,
      status: 'pendiente',
      email: 'juan@gmail.com'
    },
    {
      id: 'rty54tf',
      amount: 200,
      status: 'asignada',
      email: 'anibal@gmail.com'
    },
    {
      id: 'fre53t4t',
      amount: 200,
      status: 'finalizada',
      email: 'brayan@hotmail.com'
    },
    
   
    // ...
  ]
}

export default async function RequestsPage () {
  const data = await getData()

  return (
    <div>
      <PageTitle title='Solicitudes' />
      <Card>
        <DataTable columns={columns} data={data} />
      </Card>
    </div>
  )
}
