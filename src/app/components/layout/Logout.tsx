'use client'
import { Button } from '@/lib/shadcn/components/ui/button'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const router = useRouter()

  const logout = async () => {
    let res
    try {
      res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Logout request failed:', error)
      return
    }

    if (!res.ok) {
      try {
        await fetch('/api/administrators/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        console.error('Admin logout request failed:', error)
      }
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <Button variant="ghost" onClick={logout}>
      Logout
    </Button>
  )
}

export default Logout
