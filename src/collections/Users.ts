import type { CollectionConfig } from 'payload'
const rootUrl = process.env.PROJECT_URL
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  // auth: true,
  // {
  // verify: true,
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        const url = `${rootUrl}/auth/verify?token=${token}`
        return `<p>Welcome!</p>
      <p>Verify your email by clicking <a href="${url}">here</a>.</p>`
      },
    },
    forgotPassword: {
      // @ts-ignore
      generateEmailHTML: ({ token }) => {
        const url = `${rootUrl}/auth/reset-password?token=${token}`
        return `<p>Reset your password by clicking <a href="${url}">here</a>.</p>`
      },
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
    },
    { name: 'role', type: 'select', options: ['admin', 'user'] },
  ],
}
