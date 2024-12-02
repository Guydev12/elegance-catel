"use client";

import { FC, useState, useTransition } from "react";
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
import { editProfile } from "@/lib/actions/user.actions";
import { User } from "@prisma/client";
import { convertBlobUrlToFile } from "@/lib/supabase-client";
import { uploadImage } from "@/lib/actions/supabase.actions";
import toast from "react-hot-toast";
import Image from "next/image";

const editSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  avatar: z.string().optional(),
});

type FormValues = z.infer<typeof editSchema>;
type EditProfileFormProps = {
  user: User;
};

export const EditProfileForm: FC<EditProfileFormProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [url, setUrl] = useState<string>(user.avatar ?? "");
  const form = useForm<FormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      username: user.username,
      avatar: user.avatar ?? undefined,
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
          avatar: imageUrl,
        };

        const result = await editProfile(payload);

        if (result.success) {
          toast.success(result.message as string);
        } else {
          toast.error(result.error || "Failed to update profile.");
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Avatar Field */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <div className="relative flex items-center justify-center">
                  {/* Circular Image Preview */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                    {url && (
                      <Image
                        src={url}
                        alt="Avatar preview"
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
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};
