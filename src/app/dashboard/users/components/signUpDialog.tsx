'use client'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import SignUpForm from '@/app/dashboard/users/components/sign-up.form'

const SignUpFormDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='px-6'>
          Crear
          <CirclePlus className='ml-2 w-[20px]' />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrar Usuario</DialogTitle>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  )
}

export default SignUpFormDialog
