'use client'

import { useEffect, useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { CrossIcon, PlusCircleIcon, X } from 'lucide-react'
import { convertBlobUrlToFile } from"@/lib/supabase-client"
import { uploadImage } from "@/lib/actions/supabase.actions"

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createProduct } from '@/lib/actions/product.actions'
import { ProductSchema } from '@/types'

export const formSchema = ProductSchema

type FormValues = z.infer<typeof formSchema>

const sizeOptions = [
  { id: 'xs', label: 'XS' },
  { id: 's', label: 'S' },
  { id: 'm', label: 'M' },
  { id: 'l', label: 'L' },
  { id: 'xl', label: 'XL' },
  { id: 'xxl', label: 'XXL' },
]

const categoryOptions = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'sports', label: 'Sports & Outdoors' },
]

export default function GeneralProductForm() {
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [ imageUrls, setImageUrls] = useState<string[]>([]) 
  const [isPending, startTransition]=useTransition()
 const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      hasVariant:false,
      hasSize:false,
      isFeatured: false,
      images:[],
      category: '',
    },
  })

 const { 
   fields:variantsFields,
   replace: replaceVariants,
   append: appendVariants,
   remove: removeVariants,
 }=useFieldArray({
   control:form.control,
   name:'variants'
 })

 const hasVariant = useWatch({
   control:form.control,
   name:"hasVariant",
 })

 

 const hasSize = useWatch({
   control:form.control,
   name: "hasSize" 
 })

 useEffect(()=>{
   if(hasSize){
     form.setValue("sizes",[""])// initialise an empty size
   }else {
     form.setValue("sizes",[])// reset sizes when hasSize is false
   }
 },[hasVariant,form])

 useEffect(()=>{
   if(hasVariant){
     replaceVariants([
       {
         name:"",
         price:0,
         stock:0,
         color:""

     }
     ])
   }
 },[hasVariant,replaceVariants]);

 //fonction to handle on submited form
 function onSubmit(values: FormValues) {
    console.log("VALUES_ON_SUBMITS",values)
    startTransition(async () =>{
     // let urls= []
      /* for(const url of imageUrls){
         const imageFile =await convertBlobUrlToFile(url)

         const {imageUrl, error}= await uploadImage({
         file: imageFile,
         bucket:"media",

         })
         if(error) {
           console.log(error)
         }
         urls.push(imageUrl)
       } */
      // console.log({values,urls})
       setImageUrls([])
    })
    /*try {
//      const result = await createProduct(values)
//      if (result.success) {
  //      form.reset()
    //    setPreviewImages([])
      //  setImageUrls([])
        // Show success message
      } else {
        // Show error message
      }
    } catch (error) {
      console.error('Error creating product:', error)
      // Show error message
    }*/
  }


  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange:(value:string[])=>void
  ) => {
    const files = e.target.files
    console.log("IMAGR_CHANGE",files)
    if (files) {
      const fileArray = Array.from(files)
      console.log("FILES_ARRAY",fileArray)
      const newPreviewImages = fileArray.map((file) => URL.createObjectURL(file))
      console.log("IMAGES_URLs",newPreviewImages)
      setImageUrls((imageUrl)=> [...imageUrl, ...newPreviewImages])
      setPreviewImages((prevImages) => [...prevImages, ...newPreviewImages])
      const currentImages = form.getValues('images') || []
      console.log("FORM_images", currentImages)
      const newImageUrls = fileArray.map((file)=> file.name)
      onChange(newImageUrls)
      form.setValue('images', [...currentImages, ...newImageUrls])
      console.log({"Urls":newImageUrls, imageUrls})
    }
  }

  const removePreviewImage = (indexToRemove: number) => {
    setPreviewImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    )
    const currentImages = form.getValues('images') || []
    form.setValue(
      'images',
      currentImages.filter((_, index) => index !== indexToRemove)
    )
    setImageUrls((prevUrl)=>prevUrl.filter((_,index)=> index !== indexToRemove))
  }

  return (
    <Card className="w-full p-4">
      <CardHeader></CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 grid grid-cols-1 lg:grid-cols-2 w-full "
          >
            <Card className="p-4">
              <CardHeader>
                <CardDescription>General information</CardDescription>
              </CardHeader>
              <CardContent className="py-4 grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='hasSize'
                  render={({ field })=>(
                    <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                      <FormControl >
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                          <FormLabel>Enable Sizes</FormLabel>
                      </div>
                    </FormItem>

                  )}
                />
                {hasSize && (

                
                <FormField
                  control={form.control}
                  name="sizes"
                  render={() => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <div className="grid grid-cols-3 gap-2">
                        {sizeOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="sizes"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        const updatedSizes = checked
                                          ? [...(field.value || []), option.id]
                                          : (field.value || []).filter(
                                              (value) => value !== option.id
                                            )
                                        field.onChange(updatedSizes)
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                )}
                <FormField 
                 control={form.control}
                 name="hasVariant"
                 render={({ field })=>(
                   <FormItem className='flex flex-row items-center space-x-3 space-y-0  '>
                     <FormControl>
                       <Checkbox 
                         checked={field.value}
                         onCheckedChange={field.onChange}
                       />
                     </FormControl>
                     <div>
                       <FormLabel>
                          Add Variant
                       </FormLabel>
                     </div>
                   </FormItem>
               )}
              />
           
{hasVariant && (
  <div className="space-y-4">
    <h4 className="text-lg font-semibold">Variants</h4>
    {variantsFields.map((variant, index) => (
      <div key={variant.id} className="grid grid-cols-2 gap-4">
        {/* Variant Name */}
        <FormField
          control={form.control}
          name={`variants.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter variant name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Variant Price */}
        <FormField
          control={form.control}
          name={`variants.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter variant price"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Variant Stock */}
        <FormField
          control={form.control}
          name={`variants.${index}.stock`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter stock quantity"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Variant Color */}
        <FormField
          control={form.control}
          name={`variants.${index}.color`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Color</FormLabel>
              <FormControl>
                <Input placeholder="Enter color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Remove Variant Button */}
        <Button
          type="button"
          size="icon"
          variant="destructive"
          onClick={() => removeVariants(index)}
          className="mt-2"
        >
          < X/> 
        </Button>
      </div>
    ))}
    <Button
      type="button"
      size='icon'
      className='bg-green-500 rounded text-white text-center hover:bg-green-200 hover:text-gray-500'
      onClick={() =>
        appendVariants({
          name: '',
          price: 0,
          stock: 0,
          color: '',
        })
      }
    >
      <PlusCircleIcon />
    </Button>
  </div>
)}
              </CardContent>
            </Card>

            <Card className="p-4  border-none">
              <CardHeader>
                <CardDescription>Upload Images</CardDescription>
              </CardHeader>
              <CardContent className="grid space-y-4 gap-4 py-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Product</FormLabel>
                        <FormDescription>
                          This product will appear on the home page
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Images</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          className=" w-full   text-center "
                          onChange={(e) => {
                            
                            handleImageChange(e, field.onChange)// pass the field.onchange to sync the form 
                            
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-4">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-0 right-0 p-1  text-white rounded-full"
                        onClick={() => removePreviewImage(index)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div></div>
            <div className="flex w-full justify-end space-x-4 items-center gap-4">
              <Button variant='outline' className='text-black ' type="button" disabled={isPending}>Cancel</Button>
              <Button disabled={isPending} type="submit" className='bg-brand-primary text-md font-bold'>
              { isPending ? " Creating ... " : " Create Product"} 
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
