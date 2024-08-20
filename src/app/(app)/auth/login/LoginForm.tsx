'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema } from '../formSchemas'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '@/lib/shadcn/components/ui/button'
import { loginUser } from '@/lib/actions/auth'
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
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    setError(null)
    setLoading(true)
    const result = await loginUser(values)
    console.log(result)
    if (result.success) {
      router.push('/')
    } else {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <>
      {error && <AuthError error={error} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" className="w-full" {...field} />
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
                    type="password"
                    placeholder="Enter your password"
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
              Submit
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </>
  )
}
