import type { Metadata } from 'next'

import './globals.css'
import { Poppins as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Elegance Catel',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased min-h-screen font-sans bg-background',
          fontSans.variable
        )}
      >
        <SessionProvider>
            {children}
            <Toaster/>            
         </SessionProvider>

      </body>
    </html>
  )
}
