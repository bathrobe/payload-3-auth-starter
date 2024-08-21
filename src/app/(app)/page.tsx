import { getUser } from '@/lib/actions/auth'
import Header from '@/app/components/layout/Header'

export default async function Home() {
  const user = await getUser()
  return <div className="">{user ? <Header /> : <p>Welcome</p>}</div>
}
