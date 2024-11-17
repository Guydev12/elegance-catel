'use client'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,

  CardFooter,
  CardHeader,

} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginUser } from '@/lib/actions/user.actions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import Link from 'next/link'

import { loginSchema, User} from'@/types'
import FormError from "./error-form"
import FormSuccess from "./success-form"

const CardWrapper = ({

}) => {
  
  const[isPending, startTransition]=React.useTransition()
  const[error, setError]=React.useState<string | undefined>('')
  const[success, setSuccess]=React.useState<string | undefined>('')
  //const router = useRouter()
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  // Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {

    
    startTransition(() => {
          setError(undefined); // Reset error state before login attempt
    setSuccess(undefined); // Reset success state
      loginUser(values)
        .then((data) => {
          if (data && data.error) {
            setError(data.error); // Set error state if login failed
          } else if (data && data.success) {
            setSuccess(data.success); // Set success message if login succeeded
            
          }
        })

    });
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
       
       
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="john@exemple.com" 
                      {...field} 
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                  
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="********" 
                      {...field} 
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormError message={error}/>
                  <FormSuccess message={success}/>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-brand-primary font-bold text-xl">
              {isPending?'Loging...':'Login'}
             </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between"> 
        <p className="text-[11px] font-light text-[#313131]">
          Dont have an account? <Link href='/register'>Signup &rarr;</Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default CardWrapper