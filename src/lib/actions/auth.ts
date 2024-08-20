'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { headers as getHeaders } from 'next/headers'

export async function loginUser(formData: any) {
  const email = formData.email
  const password = formData.password

  try {
    const payload = await getPayloadHMR({
      config: configPromise,
    })

    const result = await payload.login({
      collection: 'users',
      data: {
        email: email,
        password: password,
      },
    })
    if (result.token) {
      cookies().set({
        name: 'payload-token',
        value: result.token,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      return { success: true }
    } else {
      return { success: false, error: 'Login failed. Please try again.' }
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Something went wrong.' }
  }
}

// export async function createUser(formData: FormData) {
//   try {
//     const email = formData.get('email') as string
//     const password = formData.get('password') as string
//     const payload = await getPayloadHMR({
//       config: configPromise,
//     })
//     const newUser = await payload.create({
//       collection: 'users',
//       data: {
//         email: email,
//         password: password,
//         role: 'user',
//       },
//     })
//     console.log('new user created:', newUser)

//     return 'User created! Check your email for a verification link.'
//   } catch (error: any) {
//     if (error.type) {
//       switch (error.type) {
//         case 'UserCreationFailed':
//           return 'Failed to create user'
//         default:
//           return 'Something went wrong during user creation.'
//       }
//     }
//     throw error
//   }
// }

// export async function forgotPassword(formData: FormData) {
//   const email = formData.get('email') as string
//   const payload = await getPayloadHMR({
//     config: configPromise,
//   })

//   await payload.forgotPassword({
//     collection: 'users',
//     data: {
//       email: email,
//     },
//     disableEmail: false,
//   })
//   return 'ok'
// }

// const getUser = async () => {
//   const headers = getHeaders()
//   const payload = await getPayloadHMR({
//     config: configPromise,
//   })

//   const { user } = await payload.auth({ headers })
//   return user
// }

// const authCheck = async () => {
//   const user = await getUser()
//   if (!user) {
//     redirect('/auth/login')
//   }
//   return user
// }

// export { getUser, authCheck }
