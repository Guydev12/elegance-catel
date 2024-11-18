
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
     title={<p className='text-[19px]  md:leading-normal '>
      Welcome To The Elegance Dashboard
    </p>}
    description='Press Login to continue'
    >
      
      <div className='mt-4 flex grow flex-col gap-4  justify-center space-y-5'>
        
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
