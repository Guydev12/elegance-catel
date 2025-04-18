import {v4 as uuidv4} from "uuid"
import imageCompression from "browser-image-compression"
import supabase, { supabaseUrl } from "../supabase";


//function getStorage(){
 // const { storage } = supabase
//}

type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
}
export const uploadImage = async ({ file, bucket, folder }: UploadProps)=>{
   const fileName = file.name 
   const fileExtension =  fileName.slice(fileName.indexOf('.') + 1)
   const path = `${folder ? folder + '/' : ''}${uuidv4()}.${fileExtension}`;
   

   try{
     file = await imageCompression(file,{
       maxSizeMB:1
     })
   }catch(error){
     console.log(error)
     return {imageUrl:"", error:"Image compression failed"}

   }
   
   const {storage} = supabase

   const { data, error}= await storage.from(bucket).upload(path,file)
   
   if(error){
     return{ imageUrl:"", error:"Image upload failed" }
   }

   const imageUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${data?.path}`
   
   return {imageUrl, error:""}
}
