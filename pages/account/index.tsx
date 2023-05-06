import React from 'react'

import Layout from '../../components/layout'
import Head from 'next/head'
import { useUser } from '../../lib/useUser'
import Link from 'next/link'
import Image from 'next/image'
import DashedDivider from '../../components/dashedDivider'
import { useRouter } from 'next/router'

const ACCOUNT_LINKS = [
  { title: 'Invitations', href: '/account/invitation' }
]

/**
 *  Account
 */
const Account = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>My Account | Output Field</title>
      </Head>
      <div className="p-4">
        <button onClick={() => router.back()}>
          <Image src='/arrowCircleLg.svg' width='38' height='6' alt='back' />
        </button>
        <h1 className={`
          text-xl 
          glow-black 
          mt-12 
          `}>
        Account Overview
        </h1>
      </div>
      <ul>
        {ACCOUNT_LINKS.map(({ title, href }) => (
          <li key={href}>
            <DashedDivider />
            <Link href={href}  className="flex py-8 w-full justify-between">
              <span className='flex pl-4'>
                <Image
                  src='/fourpointstar.svg'
                  width='16'
                  height='16'
                  alt=''
                  className='mr-1'
                />
                <h3 className="text-md">
                  {title}
                </h3>
              </span>
              <Image
                src='/arrowCircle.svg'
                height='3'
                width='35'
                alt=''
                className='mr-8'
              />
            </Link>
          </li>
        ))}
      </ul>
      <DashedDivider />

    </Layout>
  )
}

export default Account
