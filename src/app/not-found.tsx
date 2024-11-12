// pages/404.tsx
import React from 'react'
import Link from 'next/link'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4">Oops! La página que buscas no existe.</p>
      <p className="text-md mt-2 text-gray-600">Puede que hayas seguido un enlace roto o que la página haya sido movida.</p>
      <Link href="/" legacyBehavior>
  <a className="mt-4 text-blue-500 hover:underline">Regresar al inicio</a>
</Link>

    </div>
  )
}

export default PageNotFound
