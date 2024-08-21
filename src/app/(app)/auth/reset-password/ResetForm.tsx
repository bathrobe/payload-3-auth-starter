'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordFormSchema } from '../formSchemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '@/lib/shadcn/components/ui/button'
import { resetPassword } from '@/lib/actions/auth'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/shadcn/components/ui/form'
import { Input } from '@/lib/shadcn/components/ui/input'
import { AuthError } from '../AuthError'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AuthCardWrapper from '../AuthCardWrapper'

export default function ResetForm({ searchParams }: { searchParams: { token: string } }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const token = searchParams.token

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
    setError(null)
    setLoading(true)
    const result = await resetPassword(values, token)

    if (result.success) {
      router.push('/auth/login')
    } else {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthCardWrapper
        title="Reset Password"
        description="Enter your new password"
        footerLinks={<></>}
      >
        {error && <AuthError error={error} />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      className="w-full"
                      {...field}
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
                      type="password"
                      placeholder="Confirm your new password"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <Button type="submit" className="w-full" disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Reset Password
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            )}
          </form>
        </Form>
      </AuthCardWrapper>
    </div>
  )
}
