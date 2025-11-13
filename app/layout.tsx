import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Game Character Showcase',
  description: 'Discover and learn about your favorite game characters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
