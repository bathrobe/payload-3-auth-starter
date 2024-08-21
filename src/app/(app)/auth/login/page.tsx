import LoginForm from './LoginForm'
import AuthCardWrapper from '../AuthCardWrapper'
import Link from 'next/link'
const loginFooterLinks = (
  <>
    <div className="text-sm text-center my-2">
      <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
        Forgot your password?
      </Link>
    </div>
    <div className="text-sm text-center pb-2">
      Don't have an account?{' '}
      <Link href="/auth/create-user" className="text-blue-600 hover:underline">
        Sign up
      </Link>
    </div>
  </>
)
export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthCardWrapper
        title="Login"
        description="Login to your account"
        footerLinks={loginFooterLinks}
      >
        <LoginForm />
      </AuthCardWrapper>
    </div>
  )
}
