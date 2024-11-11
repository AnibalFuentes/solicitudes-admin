import PageTitle from '@/components/PageTitle'
import { TableView } from '@/components/table-request'
import { Card } from '@/components/ui/card'
import React from 'react'



export default function RequestsPage() {
  return (
    <div>
         <PageTitle title="Solicitudes"/>
         <Card>

         <TableView/>
         </Card>
    </div>
  )
}