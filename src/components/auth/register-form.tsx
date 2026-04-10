"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { registerUser } from "@/app/actions/auth";
import Image from "next/image";

const registerFormSchema = z
  .object({
    fullname: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);



    try {
      const result = await registerUser({
        fullname: data?.fullname,
        email: data?.email,
        password: data?.password,
        confirmPassword: data?.confirmPassword,
      });



      if (result.success) {
        toast("Please verify your email to continue.");
        router.push("/verify");
      }

      if (!result.success) {
        toast(result.message);
      }

    } catch (error) {
      toast("Something went wrong || " + error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="hidden lg:flex w-1/2 bg-[#0a1155] text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="border-[7px] border-[#212767] w-[592px] h-[455px] rounded-[400px] absolute lg:-top-[200px] xl:-bottom-[300px] -left-[500px] rotate-[-45deg]"></div>
        <div>
          <Link href="/">
            <Image
              src="/assets/lhasis-logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-[60px] h-[83px] mb-[101px] ml-[150px]"
            />
          </Link>
          <h1 className="mt-4 text-[74px] w-[485px] !text-bold mx-auto text-[#f3f3f3]">
            Secure Your Home with Clarity
          </h1>
          <p className="text-[19px] text-center text-[#F7E39F] font-semibold mt-[21px] ml-[-30px]">
            Monitor your property with ease and peace of mind.
          </p>
        </div>
        <div className="border-[7px] border-[white] w-[592px] h-[455px] rounded-[400px] absolute lg:-bottom-[200px] xl:-bottom-[300px] -right-[320px]"></div>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 py-12 sm:px-16 bg-white">
        <div className="space-y-2">
          <h1 className="text-4xl font-[600] text-center mb-5">
            Create Your Account
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your full name"
                      disabled={isLoading}
                      className="h-12 rounded-md"
                    />
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
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      disabled={isLoading}
                      className="h-12 rounded-md"
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
                      {...field}
                      type="password"
                      placeholder="Create a password"
                      disabled={isLoading}
                      className="h-12 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm your password"
                      disabled={isLoading}
                      className="h-12 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Terms & Conditions Acceptance
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-[110px] h-12 bg-[#0a1155] hover:bg-[#0a1155]/90 text-base font-bold text-white"
            >
              Sign Up
            </Button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#0a1155] hover:underline">
                Log In
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
