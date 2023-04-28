import React from 'react'
import Head from 'next/head'
import localFont from '@next/font/local'

import Header from './header'

const migra = localFont({ src: '../styles/fonts/MigraItalic-ExtralightItalic.woff2', variable: '--font-migra'})

const Layout = ({ children }: any) => (
  <>
    <Head>
      <title>Output Field</title>
    </Head>
    <Header />
    <main className={`${migra.variable} font-sans`} role="main">
      <div className="container">{children}</div>
    </main>
    <footer role="contentinfo">
      Footer Here
    </footer>

    <style jsx>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }
    `}</style>
  </>
)

export default Layout
