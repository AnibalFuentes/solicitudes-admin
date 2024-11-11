// 'use client'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger
// } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { LoaderCircle } from 'lucide-react'

// import * as z from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import { ItemImage } from '../../../interfaces/item-image.interface'
// import DragAndDropImage from '@/components/drag-and-drop-image'
// import { Category } from '@/interfaces/category.interface'
// import { SwitchStateItem } from './switch-state-item'
// import Image from 'next/image'

// interface CreateUpdateItemProps {
//   children: React.ReactNode
//   itemToUpdate?: Category
// }

// export function CreateUpdateItem ({
//   children,
//   itemToUpdate
// }: CreateUpdateItemProps) {
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
//   const [image, setImage] = useState<string>('')
//   const [state, setState] = useState<boolean>(itemToUpdate?.state || false)

//   const formSchema = z.object({
//     image: z.object({
//       path: z.string(),
//       url: z.string()
//     }),
//     state: z.boolean(),
//     name: z
//       .string()
//       .min(2, { message: 'Este campo es requerido, al menos 2 caracteres' })
//   })

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: itemToUpdate
//       ? itemToUpdate
//       : {
//           image: {} as ItemImage,
//           name: '',
//           state: false
//         }
//   })

//   const { register, handleSubmit, formState, setValue } = form
//   const { errors } = formState

//   const handleImage = (url: string) => {
//     const path = itemToUpdate
//       ? itemToUpdate.image.path
//       : `local-path/${Date.now()}`
//     setValue('image', { url, path })
//     setImage(url)
//   }

//   useEffect(() => {
//     if (itemToUpdate) {
//       setImage(itemToUpdate.image.url)
//       setState(itemToUpdate.state)
//     }
//   }, [itemToUpdate])

//   const onSubmit = (item: z.infer<typeof formSchema>) => {
//     item.state = state
//     if (itemToUpdate) updateCategoryInLocal(item)
//     else createCategoryInLocal(item)
//   }

//   // Función local para crear una categoría
//   const createCategoryInLocal = (item: Category) => {
//     setIsLoading(true)
//     try {
//       // Simulación de subida de imagen y creación de categoría
//       const newCategory = { ...item, id: `local-id-${Date.now()}` }
//       toast.success('Categoria Creada Exitosamente', { duration: 2500 })
//       console.log('Nueva Categoría:', newCategory) // Puedes revisar los datos aquí
//       setIsDialogOpen(false)
//       form.reset()
//       setImage('')
//     } catch (error: unknown) {
//       toast.error('Ocurrió un error desconocido', { duration: 2500 })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Función local para actualizar una categoría
//   const updateCategoryInLocal = (item: Category) => {
//     setIsLoading(true)
//     try {
//       // Simulación de actualización de categoría
//       const updatedCategory = { ...item, id: itemToUpdate?.id }
//       toast.success('Categoria Actualizada Exitosamente', { duration: 2500 })
//       console.log('Categoría Actualizada:', updatedCategory) // Puedes revisar los datos aquí
//       setIsDialogOpen(false)
//       form.reset()
//       setImage('')
//     } catch (error: unknown) {
//       toast.error('Ocurrió un error desconocido', { duration: 2500 })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className='sm:max-w-[425px]'>
//         <DialogHeader>
//           <DialogTitle>
//             {itemToUpdate ? 'Editar Categoria' : 'Crear Categoria'}
//           </DialogTitle>
//           <DialogDescription>
//             Gestiona tu Categoria con la siguiente información.
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className='grid gap-2'>
//             <div className='mb-3'>
//               <Label htmlFor='image'>Imagen</Label>
//               {image ? (
//                 <div className='text-center'>
//                   <Image
//                     width={1000}
//                     height={1000}
//                     src={image}
//                     alt='item-image'
//                     className='w-[50%] m-auto'
//                   />
//                   <Button
//                     className='mt-3'
//                     variant={'destructive'}
//                     type='button'
//                     onClick={() => handleImage('')}
//                     disabled={isLoading}
//                   >
//                     Remover Imagen
//                   </Button>
//                 </div>
//               ) : (
//                 <DragAndDropImage handleImage={handleImage} />
//               )}
//             </div>
//             <div className='mb-3'>
//               <Label htmlFor='name'>Nombre</Label>
//               <Input
//                 {...register('name')}
//                 id='name'
//                 placeholder='nombre categoria'
//                 type='text'
//                 autoComplete='name'
//               />
//               <p className='form-error'>{errors.name?.message}</p>
//             </div>
//             {itemToUpdate && (
//               <div className='mb-3'>
//                 <SwitchStateItem checked={state} onChange={setState} />
//               </div>
//             )}
//           </div>
//           <DialogFooter>
//             <Button type='submit' disabled={isLoading}>
//               {isLoading && <LoaderCircle className='mr-2 h-4 animate-spin' />}
//               {itemToUpdate ? 'Actualizar' : 'Crear'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }
