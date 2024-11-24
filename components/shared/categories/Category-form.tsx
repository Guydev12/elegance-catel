"use client";
import { z } from "zod";
import CardWrapper from "../CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "react-hot-toast";
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
import { createCategorie } from "@/lib/actions/categorie.actians";
import { categoryFormSchema } from "@/types";
import { useRouter } from "next/navigation";

export function CategoryForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof categoryFormSchema>) => {
    startTransition(() => {
      console.log({ data: values });
      createCategorie(values).then((data) => {
        if (data && data.error) {
          console.log("error", data.error);
          toast.error(data.error);
        } else if (data && data.success) {
          console.log("success", data.success);
          toast.success(data.success);
          router.refresh();
        } else {
          console.log("You are not authorized to create a category");
        }
      });
    });
  };
  return (
    <main className="w-full mt-0 p-4">
      <CardWrapper description="create a new categorie for your products">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorie Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your categorie" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              className="w-full hover:bg-pink-500 hover:text-gray bg-brand-primary text-white font-bold"
            >
              {isPending ? "Create ..." : "Create Categorie"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </main>
  );
}
