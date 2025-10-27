"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState("")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "bac71e0a-1e9d-488a-a587-4759cc7e478c",
          name: values.name,
          email: values.email,
          company: values.company || "Not provided",
          message: values.message,
          subject: `New contact form submission from ${values.name}`,
        }),
      })

      const data = await response.json()

      if (response.status === 200) {
        toast.success("Message sent successfully! We'll be in touch soon.")
        form.reset()
      } else {
        console.error("Error submitting form:", data)
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900/60 border-white/10 border rounded-2xl p-6 md:p-8 hover-lift"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium tracking-tight">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    className="bg-zinc-800/60 border-white/10 text-white placeholder:text-zinc-500 focus:border-white/20 transition-colors"
                    {...field}
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
                <FormLabel className="text-white font-medium tracking-tight">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    className="bg-zinc-800/60 border-white/10 text-white placeholder:text-zinc-500 focus:border-white/20 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium tracking-tight">Company (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your company"
                    className="bg-zinc-800/60 border-white/10 text-white placeholder:text-zinc-500 focus:border-white/20 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium tracking-tight">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project"
                    className="min-h-32 bg-zinc-800/60 border-white/10 text-white placeholder:text-zinc-500 focus:border-white/20 transition-colors resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                alignItems: 'center',
                backgroundImage: 'linear-gradient(144deg, rgb(175, 64, 255), rgb(91, 66, 243) 50%, rgb(0, 221, 235))',
                border: '0px',
                borderRadius: '8px',
                boxShadow: 'rgba(151, 65, 252, 0.2) 0px 15px 30px -5px',
                color: 'rgb(255, 255, 255)',
                display: 'flex',
                fontSize: '14px',
                justifyContent: 'center',
                lineHeight: '1em',
                width: '100%',
                padding: '3px',
                textDecoration: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                height: '50px',
                transition: 'transform 0.1s ease, opacity 0.2s ease',
                opacity: isSubmitting ? 0.7 : 1,
              }}
              className="hover:scale-[0.98] active:scale-95"
            >
              <span style={{
                background: isSubmitting ? 'none' : 'rgb(5, 6, 45)',
                padding: '16px 24px',
                borderRadius: '6px',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease'
              }}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>
            </button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}