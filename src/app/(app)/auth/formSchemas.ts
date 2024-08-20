import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters.' })
  .max(20, { message: 'Password must be at most 20 characters.' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter.',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter.',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must contain at least one number.',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password must contain at least one special character.',
  })

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'This field has to be filled.',
    })
    .email('This is not a valid email.'),
  password: passwordSchema,
})
