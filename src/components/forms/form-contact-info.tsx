"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Ref } from "react";
import { Facebook, Instagram, InstagramIcon } from "lucide-react";
import { User } from "@prisma/client";

export const FormContactInfoSchema = z.object({
  name: z.string().min(2, {
    message: "Ingresa un nombre valido.",
  }),
  phone: z.string({ message: "Ingresa un numero valido." }).min(10, {
    message: "Ingresa un numero valido.",
  }),
});

export function FormContactInfo({
  onSubmit,
  user,
  button
}: {
  button: string
  user: User | null;
  submitRef: Ref<HTMLButtonElement>;
  onSubmit: (data: z.infer<typeof FormContactInfoSchema>) => void;
}) {
  const form = useForm<z.infer<typeof FormContactInfoSchema>>({
    resolver: zodResolver(FormContactInfoSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col justify-center space-y-6 bg-background p-1"
      >
        <FormField
          disabled={user ? true : false}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text">Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={user ? true : false}
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text">Numero de telefono</FormLabel>
              <FormControl>
                <Input type="phone" placeholder="5490000000" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{button}</Button>
      </form>
    </Form>
  );
}
