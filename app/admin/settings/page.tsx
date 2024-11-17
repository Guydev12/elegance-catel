import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'

import React from 'react'

const page = () => {
  return (
    <div>
          <form
        action={async () => {
          "use server"
          await signOut()
       
        }}
        
      >
        <Button type="submit" className="mt-5 ml-[45px]">Sign out</Button>
      </form>
    </div>
  )
}

export default page
