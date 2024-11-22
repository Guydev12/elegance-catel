import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'

import React from 'react'

const page = () => {
  return (
    <div className="grid space-y-[16px]  items-center justify-center min-w-screen">
      <div>
        <h1>store front</h1>
      </div>
      <form
        action={async () => {
          'use server'
          await signOut()
          
        }}
      >
      <div>hello</div>
        <Button type="submit" className="mt-5 ml-[45px]">
          Sign out
        </Button>
      </form>
    </div>
  )
}

export default page
