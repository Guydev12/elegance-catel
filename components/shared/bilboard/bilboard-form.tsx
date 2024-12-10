"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { convertBlobUrlToFile } from "@/lib/supabase-client";
import { uploadImage } from "@/lib/actions/supabase.actions";
import toast from "react-hot-toast";
import Image from "next/image";
import { bilboardFormSchema } from "@/types";
import { CameraIcon } from "lucide-react";
import { createBillboard } from "@/lib/actions/billboard.action";

type FormValues = z.infer<typeof bilboardFormSchema>;

export const BillboardForm = () => {
  const [isPending, startTransition] = useTransition();
  const [url, setUrl] = useState<string>("");
  const form = useForm<FormValues>({
    resolver: zodResolver(bilboardFormSchema),
    defaultValues: {
      text: "",
      image: undefined,
    },
  });

  // Handle image changes
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const imageBlobUrl = URL.createObjectURL(file);
      setUrl(imageBlobUrl);
      onChange(imageBlobUrl); // Update form value
    }
  };

  // Handle form submission

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
      try {
        let imageUrl = url;

        if (url.startsWith("blob:")) {
          const imageFile = await convertBlobUrlToFile(url);
          const { imageUrl: uploadedUrl, error } = await uploadImage({
            file: imageFile,
            bucket: "media",
          });

          if (error || !uploadedUrl) {
            toast.error("Failed to upload image.");
            return;
          }

          imageUrl = uploadedUrl;
          setUrl(uploadedUrl);
        }

        // Update the values with the final avatar URL
        const payload = {
          ...values,
          image: imageUrl,
        };

        const result = await createBillboard(payload);

        if (result.success) {
          toast.success(result.message as string);
        } else {
          toast.error(result.error || "Failed create billboard.");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("An error occurred while updating the profile.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Username Field */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="Enter your marketing text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Avatar Field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Billboard</FormLabel>
              <FormControl>
                <div className="relative flex items-center justify-center">
                  {/* Circular Image Preview */}
                  <div className="relative w-[100px] h-[50px] flex items-center justify-center rounded overflow-hidden border border-gray-300">
                    <CameraIcon />
                    {url && (
                      <Image
                        src={url}
                        alt="Billboard preview"
                        fill
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* File Input */}
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleImageChange(e, field.onChange)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};
