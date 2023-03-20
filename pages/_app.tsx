import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'

const migra = localFont({ src: './MigraItalic-ExtralightItalic.woff2', variable: '--font-migra'})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${migra.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}
