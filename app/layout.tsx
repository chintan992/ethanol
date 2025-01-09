import type { Metadata } from 'next'
import { GeistSans } from 'geist/font'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anime Streaming App',
  description: 'Watch your favorite anime online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`min-h-screen bg-background font-sans antialiased ${GeistSans.className}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
