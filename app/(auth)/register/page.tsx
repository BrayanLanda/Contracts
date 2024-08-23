import FormRegister from '@/components/form-register'
import React from 'react'

const RegisterPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-4xl font-bold mb-8">Register Get Security</h1>
        <FormRegister />
      </div>
    </main>
  )
}

export default RegisterPage
