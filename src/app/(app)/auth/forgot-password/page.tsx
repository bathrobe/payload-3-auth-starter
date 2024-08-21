'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordFormSchema } from '../formSchemas'
import AuthCardWrapper from '../AuthCardWrapper'
import { Button } from '@/lib/shadcn/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/shadcn/components/ui/form'
import { Input } from '@/lib/shadcn/components/ui/input'
import { forgotPassword } from '@/lib/actions/auth'
import { Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: { email: string }) => {
    setLoading(true)
    setError('')
    const response = await forgotPassword(data)
    if (response.success) {
      setIsSubmitted(true)
    } else {
      setError(response.error)
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthCardWrapper
        title="Forgot your password?"
        description={
          isSubmitted
            ? ''
            : "Enter your email address and we'll send you a link to reset your password."
        }
        footerLinks={
          <div className="text-center">
            <a href="/auth/login" className="text-sm text-blue-600 hover:underline">
              Back to login
            </a>
          </div>
        }
      >
        {!isSubmitted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loading ? (
                <Button type="submit" className="w-full" disabled>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Resetting Password
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              )}
            </form>
          </Form>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            If there is an account with that email address, it should receive a message with a link
            to reset the password.
          </p>
        )}
      </AuthCardWrapper>
    </div>
  )
}
