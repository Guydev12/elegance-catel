
import AppLogo from '@/components/shared/AppLogo'
import CardWrapper from '@/components/shared/CardWrapper'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <CardWrapper 
     logo={<AppLogo/>}//.
    >
      
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <p className='text-xl md:text-3xl md:leading-normal '>
          <strong>Welcome To The Elegance Dashboard</strong>
        </p>
    <Button asChild>

        <Link href='/login'>
          <span> Log In</span> <ArrowRightIcon className='w-6'/>
        </Link>
     
    
    </Button>
    </div>
    </CardWrapper>
  )
}

export default page
