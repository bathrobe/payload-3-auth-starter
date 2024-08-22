import Link from 'next/link'
import Logout from './Logout'
import { getUser } from '@/lib/actions/auth'

export default async function Header() {
  const user = await getUser()

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm p-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold text-gray-800">
          Your Logo
        </Link>
        <div>
          {user ? (
            <Logout />
          ) : (
            <Link
              href="/auth/login"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
