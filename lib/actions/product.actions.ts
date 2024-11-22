'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '../prisma'
import supabase from '../supabase'
import { formSchema } from '@/components/shared/products/general-product-form'

// Initialize Supabase client

export async function createProduct(data: z.infer<typeof formSchema>) {
  try {
    // Validate the input data
    const validatedData = formSchema.parse(data)

    // Handle image uploads
    const imageUrls: string[] = []
    if (validatedData.images && validatedData.images.length > 0) {
      for (const image of validatedData.images) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, image)

        if (uploadError) {
          throw new Error(`Failed to upload image: ${uploadError.message}`)
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from('products').getPublicUrl(fileName)

        imageUrls.push(publicUrl)
      }
    }

    // Create the product in the database
    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        stock: validatedData.stock,
        isFeatured: validatedData.isFeatured,
        categoryId: validatedData.category, // Assuming category is the ID
        // sizes: validatedData.sizes,
        images: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    })

    revalidatePath('/products') // Revalidate the products page

    return { success: true, data: product }
  } catch (error) {
    console.error('Error creating product:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Invalid product data',
        details: error.errors,
      }
    }
    return { success: false, error: 'Failed to create product' }
  }
}
