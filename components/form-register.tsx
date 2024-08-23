"use client";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { registerAction } from "@/actions/auth-action";
import { useRouter } from "next/navigation";

const FormRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name:"",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null);
      startTransition(async () => {
        const response = await registerAction(values); 
        if(response.error){
          setError(response.error);
        }else{
          router.push("/dasboard")
        }
      }); 
  }

  return (
    <div className="container mx-auto p-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                  placeholder="Name" 
                  type="text"
                  className="w-full p-2 border rounded"
                  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  placeholder="Email" 
                  type="email"
                  className="w-full p-2 border rounded"
                  {...field} />
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
                  placeholder="Password" 
                  type="password"
                  className="w-full p-2 border rounded"
                  {...field} /> 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            error && <FormMessage>{error}</FormMessage>
          }
          <Button 
            className="w-full p-2 text-white rounded" 
            type="submit"
            disabled={isPending}
          >Login</Button>
        </form>
      </Form>
    </div>
  );
};
export default FormRegister;
