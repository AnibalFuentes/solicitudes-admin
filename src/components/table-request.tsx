'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Eye, EyeOff, LayoutList, SquarePen, Trash2 } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface Category {
  id: string
  name: string
  state: boolean
  image: { url: string }
}

export function TableView () {
  const [items, setItems] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Función local para simular la obtención de datos
  const getItems = async () => {
    setIsLoading(true)
    // Simulación de datos locales
    const localData: Category[] = [
      {
        id: '1',
        name: 'Categoría 1',
        state: true,
        image: { url: '/path/to/image1.jpg' }
      },
      {
        id: '2',
        name: 'Categoría 2',
        state: false,
        image: { url: '/path/to/image2.jpg' }
      }
    ]
    // Simulamos una carga asincrónica
    setTimeout(() => {
      setItems(localData)
      setIsLoading(false)
    }, 1000)
  }

  // Función local para eliminar una categoría
//   const deleteCategoryInDB = async (item: Category) => {
//     setItems(prevItems => prevItems.filter(i => i.id !== item.id))
//   }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div className='hidden md:block '>
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead className='text-center w-[100px]'>Imagen</TableHead>
            <TableHead className='text-center'>Nombre</TableHead>
            <TableHead className='text-center'>Estado</TableHead>
            <TableHead className='text-center w-[250px]'>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <Image
                    className='object-cover w-16 h-16 rounded-full'
                    alt={item.name}
                    src={item.image.url}
                    width={1000}
                    height={1000}
                  />
                </TableCell>
                <TableCell className='font-semibold text-center'>{item.name}</TableCell>
                <TableCell className='text-center'>
                  {item.state ? (
                    <Badge className='border border-solid border-green-600 bg-green-50' variant='outline'>
                      <Eye color='green' className='mr-1' /> visible
                    </Badge>
                  ) : (
                    <Badge className='border border-solid border-red-600 bg-red-50' variant='outline'>
                      <EyeOff color='red' className='mr-1' /> oculto
                    </Badge>
                  )}
                </TableCell>
                <TableCell className='text-center'>
                  {/* <CreateUpdateItem getItems={getItems} itemToUpdate={item}>
                  </CreateUpdateItem>
                  <ConfirmDeletion deleteCategoryInDB={deleteCategoryInDB} item={item}>
                  </ConfirmDeletion> */}
                    <Button>
                      <SquarePen />
                    </Button>
                    <Button className='ml-4' variant='destructive'>
                      <Trash2 />
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className='h-16 rounded-xl' /></TableCell>
                <TableCell><Skeleton className='h-4 w-full' /></TableCell>
                <TableCell><Skeleton className='h-4 w-full' /></TableCell>
                <TableCell><Skeleton className='h-4 w-full' /></TableCell>
              </TableRow>
            ))}
        </TableBody>
        {!isLoading && items.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className='text-right'>{items.length}</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
      {!isLoading && items.length === 0 && (
        <div className='text-gray-200 my-20'>
          <div className='flex justify-center'>
            <LayoutList className='no-data' />
          </div>
          <h2 className='text-center'>No hay categorías disponibles</h2>
        </div>
      )}
    </div>
  )
}
