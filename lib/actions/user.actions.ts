'use server'

import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'; // Import your Prisma instance
import {signIn }from '@/auth'; // Import your Prisma instance
import { redirect } from 'next/navigation'
import {z} from 'zod'
import {AuthError, User} from 'next-auth'
import { loginSchema, registerSchema } from '@/types';


export async function createUser(values:z.infer<typeof registerSchema>) {
   const validateFields= registerSchema.safeParse(values)
   if(!validateFields.success)return{error:'Invalid fields !'}
   try{
   const{email,password,username} = validateFields.data
  
    // Check if user already exists
    const emailExist = await prisma.user.findUnique({
      where: { email },
    });
    const usernameExist = await prisma.user.findUnique({
      where: { username },
    });
    
    
    if(emailExist && usernameExist){
      return {error:'Email and Username already taken !'};
    
    }
    if (emailExist) {
      return {error:'Email already taken !'};
    }
    
    if (usernameExist) {
      return {error:'Username already taken !'};
    }
    

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user in the SQLite database
     await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username
      },
    })

    redirect('/login')
   }catch(err){
     throw err
   }

}
export async function loginUser(values: z.infer<typeof loginSchema>) {
  const validateFields= loginSchema.safeParse(values)
  if(!validateFields.success){
    return{error:'Invalid fields !'}
  }

  try {
    const {email,password} = validateFields.data
    // Await the signIn result
     await signIn('credentials', {
      redirectTo:'/admin/dashboard',
      email,
      password,
    });
    // Redirect to the home page on successful login
    //if(result.ok){
     // return{success:'login successful!'}
   // }
  } catch (err) {
    console.log('instance of error',err instanceof AuthError)
    if(err instanceof AuthError){
      switch(err.type){
        case 'CredentialsSignin':
          return {error:'Invalid credentials!'}
        default:
          return {error:'Something went wrong!'}
      }
    }
    throw err
  }
}
export async function getUserById(userId:string): Promise<User | undefined> {
  const id = parseInt(userId)
  const user = await prisma.user.findUnique({
    where: { id},
    include: {
      projects: true, // Assuming 'projects' is the relation field for the user's projects
    },
  });
  
  if (!user) return undefined;
  return user;
}

export default function reset(){}