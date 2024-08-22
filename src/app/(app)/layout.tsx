import '@/globals.css'

import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
