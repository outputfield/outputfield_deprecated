import Layout from '../components/layout';
import "../styles/globals.css"

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

//TODO: remove Layout from here, to be applied page by page.
// Pages without Layout: Contact, Artist Detail (?)