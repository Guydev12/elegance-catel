
import AppLogo from '@/components/shared/AppLogo'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className='flex min-h-screen flex-col'>
      <div className='flex h-20 shrink-0 items-center rounded-lg p-4 md:h-40 bg-secondary'>
        <AppLogo/>
      </div>
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <p className='text-xl md:text-3xl md:leading-normal '>
          <strong>Welcome To The Elegance Dashboard</strong>
        </p>
        <Link href='/login'>
          <span> Log In</span> <ArrowRightIcon className='w-6'/>
        </Link>
      </div>
    
    </main>
  )
}

export default page
