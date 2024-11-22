import ProductHeader from '@/components/shared/products/product-header'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='w-full h-full p-4 mr-4'>
      <ProductHeader/>
      {children}
    </main>
  )
}

export default layout
