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

export async function createUser(formData: any) {
  try {
    const name = formData.name
    const email = formData.email
    const password = formData.password
    const payload = await getPayloadHMR({
      config: configPromise,
    })
    const newUser = await payload.create({
      collection: 'users',
      data: {
        name: name,
        email: email,
        password: password,
        role: 'user',
      },
    })
    if (newUser) {
      return { success: true, message: 'User created successfully.' }
    } else {
      return { success: false, error: 'Failed to create user.' }
    }
  } catch (error: any) {
    console.error('Error creating user:', error)
    return {
      success: false,
      error: error.message || 'Something went wrong during user creation.',
    }
  }
}

export async function forgotPassword(formData: any) {
  const email = formData.email

  try {
    const payload = await getPayloadHMR({
      config: configPromise,
    })

    await payload.forgotPassword({
      collection: 'users',
      data: {
        email: email,
      },
      disableEmail: false,
    })

    return { success: true, message: 'Password reset email sent successfully.' }
  } catch (error: any) {
    console.error('Error in forgotPassword:', error)
    return {
      success: false,
      error: error.message || 'Failed to send password reset email. Please try again.',
    }
  }
}

export async function resetPassword(formData: any, token: string) {
  const password = formData.newPassword

  try {
    const payload = await getPayloadHMR({
      config: configPromise,
    })

    await payload.resetPassword({
      collection: 'users',
      data: {
        token: token,
        password: password,
      },
      overrideAccess: true,
    })

    return { success: true, message: 'Password reset successfully.' }
  } catch (error: any) {
    console.error('Error in resetPassword:', error)
    return {
      success: false,
      error: error.message || 'Failed to reset password. Please try again.',
    }
  }
}
const getUser = async () => {
  const headers = getHeaders()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const { user } = await payload.auth({ headers })
  return user
}

const authCheck = async () => {
  const user = await getUser()
  if (!user) {
    redirect('/auth/login')
  }
  return user
}

export { getUser, authCheck }
