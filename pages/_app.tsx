import '../styles/globals.scss'

declare module 'csstype' {
  interface Properties {
    '--iconcolor'?: any;
    '--col'?: any;
  }
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
