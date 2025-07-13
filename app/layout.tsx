// app/layout.tsx
import type { Metadata } from 'next'
// Importa as fontes do Google de forma otimizada
import { Inter, Great_Vibes } from 'next/font/google'
import './globals.css'
// Importa as animações
import 'animate.css'

// Configuração da fonte Inter
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Define como variável CSS
  weight: ['300', '400', '600', '700'],
})

// Configuração da fonte Great Vibes
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes', // Define como variável CSS
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Flávio & Brenda',
  description: 'Nosso site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${greatVibes.variable}`}>
      <body>{children}</body>
    </html>
  )
}