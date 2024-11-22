'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProductHeader = () => {
  const pathname = usePathname()
  const currentPath = pathname.split('/').pop()
  const title = currentPath
    ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
    : ''
  const renderTitle = () => {
    if (title === 'Products') {
      return <h2 className="font-bold">All Products</h2>
    } else if (title === 'New') {
      return <h2 className="font-bold">Add New Product</h2>
    } else {
      return <h2 className="font-bold">{title}</h2>
    }
  }
  return (
    <header className="flex flex-row itmes-center justify-between m-4 p-4 w-full bg-background text-foreground gap-4 ">
      <div>{renderTitle()}</div>
      <div className="flex flex-row space-x-4 items-center ">
        {title === 'Products' && (
          <>
            <Button variant="outline">filter by</Button>
            <Button asChild className="bg-brand-primary font-bold">
              <Link href="/admin/products/new">
                <PlusIcon aria-label="add products" />
                Add
              </Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

export default ProductHeader
