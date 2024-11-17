

import { z } from "zod"

export const registerSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password:z.string().min(6)
})
export const loginSchema = z.object({
  email: z.string().email(),
  password:z.string().min(6)
})
export const todoSchema = z.object({
  title: z.string().min(3),
  description:z.string().min(6)
})

export type SideNavItem=
{
    title:string,
    url: string,
    icon?: string,
    submenu?:true,
    subMenuItems?:SideNavItem[]
}
export type CardWrapperOptions ={
    headerTitles:string
    description:string
    inputName:string
    errorsMessage:string
  }
  
  export type User={
    name:string
    id  :string  
    email: string
    username: string 
    password: string
    createdAt:Date
    updatedAt :Date
  }
  