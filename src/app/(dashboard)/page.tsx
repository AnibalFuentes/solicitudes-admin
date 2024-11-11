// import Card, { CardContent, CardProps } from '@/components/Card'
'use client'
import CardDash, { CardProps } from '@/components/CardDashboard'
import PageTitle from '@/components/PageTitle'
import { PieChartG } from '@/components/PieChart'
import { Card } from '@/components/ui/card'
import { useWindowWidth } from '@react-hook/window-size'

import { Speech } from 'lucide-react'

const cardData: CardProps[] = [
  {
    label: 'Total Solicitudes',
    amount: '100',
    description: 'total de solicitudes del mes',
    icon: Speech
  },
  {
    label: 'Total Solicitudes',
    amount: '100',
    description: 'total de solicitudes del mes',
    icon: Speech
  },
 
]
export default function Dashboard () {
  const onlyWidth = useWindowWidth()
  const mobileWidth = onlyWidth < 1020
  return (
    <div className='flex flex-col gap-5 w-full'>
      <PageTitle title='Dashboard' />
      {mobileWidth && (
        <section className='grid grid-cols-1 gap-4 transition-all lg:grid-cols-2'>
          <PieChartG />
          <Card>
            Usuarios
          </Card>
        </section>
      )}

      <section className='grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4'>
        {cardData.map((d, i) => (
          <CardDash
            key={i}
            label={d.label}
            amount={d.amount}
            description={d.description}
            icon={d.icon}
          />
        ))}
      </section>
      {!mobileWidth && (
        <section className='grid grid-cols-1 gap-4 transition-all lg:grid-cols-2'>
          <PieChartG />
          <Card>
            Usuarios
          </Card>
        </section>
      )}
    </div>
  )
}
