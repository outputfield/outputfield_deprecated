import React from 'react'
import Head from 'next/head'
import Header from './header'

const Layout = ({ children }: any) => (
  <>
    <Head>
      <title>Output Field</title>
    </Head>
    <Header />

    <main>
      <div className="container">{children}</div>
    </main>

    <footer>
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
