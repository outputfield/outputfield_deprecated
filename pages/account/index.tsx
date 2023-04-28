import React from 'react'

import Layout from '../../components/layout'
import Head from 'next/head'
import { useUser } from '../../lib/useUser'
import Link from 'next/link'

// - - - HELPER FNs - - -

// - - - - - - -

/**
 *  Account
 */
const Account = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })

  return (
    <Layout>
      <Head>
        <title>My Account | Output Field</title>
      </Head>
      <h1 className='glow-black text-[40px] ml-2'>
        Account
      </h1>
      <ul>
        <li><Link href="/account/invitation">Invitation</Link></li>
      </ul>
    </Layout>
  )
}

export default Account
