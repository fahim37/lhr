"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import ContactInformation from "./contact-information"
import {toast} from "sonner"

const formSchema = z.object({
  inquiryType: z.string().min(1, { message: "Please select an inquiry type" }),
  fullName: z.string().min(1, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(1, { message: "Please enter a phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
})

export default function ContactSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inquiryType: "general",
      fullName: "",
      email: "",
      phone: "",
      message: "",
      privacyPolicy: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contactus/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inquiryType: values.inquiryType,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          message: values.message,
        }),
      })

      if (response.ok) {
        form.reset()
        toast.success("Message submitted successfully",{position:"top-right"})
       
      } else {
        toast.error("Form submission failed",{position:"top-right"})
       
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Contact Form */}

        <div className="p-4 bg-[#FFFFFF]/10 rounded-xl">
          <div className="text-[28px] md:text-[40px] text-white font-[700] mb-5">Get in Touch</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
              <FormField
                control={form.control}
                name="inquiryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-[14px] font-[600]">Prioty*</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full h-12 border-gray-200 rounded-md bg-white text-black">
                          <SelectValue placeholder="Select Inquiry Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-[14px] font-[600]">Full Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your full name"
                        {...field}
                        className="h-12 border-gray-200 rounded-md bg-white text-black"
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
                    <FormLabel className="text-white text-[14px] font-[600]">Email*</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        {...field}
                        className="h-12 border-gray-200 rounded-md bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-white text-[14px] font-[600]">Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 000-0000"
                          {...field}
                          className="h-12 border-gray-200 rounded-r-md bg-white text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-[14px] font-[600]">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little about the project..."
                        {...field}
                        className="min-h-[120px] border-gray-200 rounded-md bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="privacyPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-gray-300 rounded"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <span className="text-white">I agree to </span>
                      <span className="text-amber-300 text-sm font-normal">Privacy Policy</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="text-[#091057] w-full h-[51px]">
                Send Message
              </Button>
            </form>
          </Form>
        </div>

        {/* Contact Information */}
        <ContactInformation />
      </div>
    </div>
  )
}
