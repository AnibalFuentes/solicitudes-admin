'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createUser,
  // getDocument,
  setDocument,
  signOutAccount,
  updateUser
} from '@/lib/firebase'
import { useState } from 'react'
import { LoaderCircle, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { User } from '@/interfaces/user.interface'
import { SelectRole, SelectUnidad } from './select-type'
// import { serverTimestamp } from 'firebase/firestore'
import { useUser } from '@/hooks/use-user'

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [unidad, setUnidad] = useState('')
  const [role, setRole] = useState('')

  const {users}=useUser()

  const formSchema = z.object({
    uid: z.string(),
    state: z.boolean(),
    name: z
      .string()
      .min(2, { message: 'Este campo es requerido, al menos 2 caracteres' }),
    phone: z
      .string()
      .regex(
        /^(\+?\d{1,3}[-\s]?)?(\(?\d{1,4}\)?[-\s]?)?(\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4})$/,
        {
          message: 'Número de teléfono inválido'
        }
      ),
      unidad: z.string( {
        required_error: 'Este campo es requerido'
      }),
      role: z.string( {
        required_error: 'Este campo es requerido'
      }),
    email: z
      .string()
      .email('El formato del email no es válido. Ejemplo: user@mail.com')
      .min(1, { message: 'Este campo es requerido' }),
    password: z.string().min(6, {
      message: 'La contraseña debe contener al menos 6 caracteres'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: '',
      state: true,
      name: '',
      email: '',
      password: '',
      // unidad: '',
      // role: ''
    }
  })

  const { register, handleSubmit, formState, setValue } = form

  const { errors } = formState

  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    // if (unidad==undefined) {
    //   toast.error('Selecciona una unidad', { duration: 2500 })
    //   return
    // }
    setIsLoading(true)

    try {
      const res = await createUser(user)
      await updateUser({ displayName: user.name })
      user.uid = res.user.uid

      await createUserInDB(user).then(async () => {
        await signOutAccount()
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { duration: 2500 })
      } else {
        toast.error('Ocurrió un error desconocido', { duration: 2500 })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const createUserInDB = async (user: User) => {
    const path = `users/users` // Usa un ID fijo para este documento (ej., 'uniqueDocumentId')
    setIsLoading(true)

    try {
      delete user.password
      user.createdAt = new Date().toLocaleString()

      // Obtén el documento existente para verificar si ya tiene un array de usuarios
      // const doc = await getDocument(path)
      const usersArray = users || [] // Si ya existe, usa el array de usuarios, si no, inicializa como []

      // Agrega el nuevo usuario al array
      usersArray.push(user)

      // Actualiza el documento con el array modificado
      await setDocument(path, { users: usersArray })
      toast.success('Usuario Creado Exitosamente', { duration: 2500 })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { duration: 2500 })
      } else {
        toast.error('Ocurrió un error desconocido', { duration: 2500 })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold'>Registrar Usuario</h1>
        <p className='text-sm text-muted-foreground'>
          Ingresa tu email y contraseña para acceder
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          {/* Nombre */}
          <div className='mb-3'>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              {...register('name')}
              id='name'
              placeholder='John Doe'
              type='text'
              autoComplete='name'
            />
            <p className='form-error'>{errors.name?.message}</p>
          </div>
          {/* Telefono */}
          <div className='mb-3'>
            <Label htmlFor='phone'>Telefono</Label>
            <Input
              {...register('phone')}
              id='phone'
              placeholder='1233456789'
              type='tel'
              autoComplete='phone'
            />
            <p className='form-error'>{errors.phone?.message}</p>
          </div>
          <div className='mb-3'>
            <Label htmlFor='unidad'>Unidad</Label>
            <SelectUnidad
              unidad={unidad}
              onUnidadChange={(value:string) => {
                setUnidad(value)
                setValue('unidad', value) // Actualiza el valor en el formulario
              }}
            />

            <p className='form-error'>{errors.unidad?.message}</p>
          </div>
          <div className='mb-3'>
            <Label htmlFor='role'>role</Label>
            <SelectRole
              role={role}
              onRoleChange={(value:string) => {
                setRole(value)
                setValue('role', value) // Actualiza el valor en el formulario
              }}
            />

            <p className='form-error'>{errors.unidad?.message}</p>
          </div>

          {/* Correo */}
          <div className='mb-3'>
            <Label htmlFor='email'>Correo</Label>
            <Input
              {...register('email')}
              id='email'
              placeholder='name@example.com'
              type='email'
              autoComplete='email'
            />
            <p className='form-error'>{errors.email?.message}</p>
          </div>

          {/* Contraseña */}
          <div className='mb-3 relative'>
            <Label htmlFor='password'>Contraseña</Label>
            <Input
              {...register('password')}
              id='password'
              placeholder='******'
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-2 top-9'
            >
              {showPassword ? (
                <EyeOff className='h-5 w-5' />
              ) : (
                <Eye className='h-5 w-5' />
              )}
            </button>
            <p className='form-error'>{errors.password?.message}</p>
          </div>

          <Link
            href='/forgot-password'
            className='underline text-muted-foreground underline-offset-4 hover:text-primary mb-6 text-sm text-end'
          >
            ¿Olvidaste la contraseña?
          </Link>

          {/* Botón de Registro */}
          <Button type='submit' disabled={isLoading}>
            {isLoading && <LoaderCircle className='mr-2 h-4 animate-spin' />}
            {!isLoading && 'Registrar'}
          </Button>
        </div>
      </form>
    </>
  )
}

export default SignUpForm
