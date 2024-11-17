import { APP_NAME } from '@/lib/constant'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const AppLogo = () => {
  return (
    <Link href='/'>
        <div className='flex flex-row items-center space-x-2'>
            <Image 
              src='/logo.jpg'
              width={32}
              height={32}
              alt={`${APP_NAME} logo`} 
              priority
            />
            <span className='text-xl text-brand-primary font-bold'>{APP_NAME}</span>
        </div>
    </Link>
  )
}
export default AppLogo