import React, { BaseSyntheticEvent, useState } from 'react'
import Router from 'next/router'

import { Magic, RPCError } from 'magic-sdk'
import Layout from '../components/layout'
import Head from 'next/head'
import { Button } from '../components/Button'
import Spinner from '../components/spinner'
import { useUser } from '../lib/useUser'
// import { magicClient } from '../lib/magicClient'

// - - - HELPER FNs - - -
async function queryUserExists(email: string) {
  try {
    const result = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    const { userExists } = await result.json()
    console.log('user exists? ', userExists)
    return userExists
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function loginUser(email: string) {
  try {
    const magicClient = new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || '',
      { testMode: process.env.STAGING === '1' }
    )
    const didToken = await magicClient.auth.loginWithMagicLink({ email, showUI: true })
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      },
      body: JSON.stringify({ email }),
    })
    console.log('login RES ', res)
    if (res.status === 200) {
      Router.reload()
    } 
    // else {
    //   throw new Error(await res.text())
    // }
  } catch (error) {
    if (error instanceof RPCError) {
      // TODO: Redirect to /account-settings to update email.
    }
    console.error('An unexpected error happened occurred:', error)
  }
}

// - - - - - - -

/**
 *  On login submit, query the db for user.
 *     If user not found, set an error message
 *     else, continue to Magic login flow
 * @returns React.FC
 */
const Login = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    const { currentTarget: { email: { value: email } } } = e

    try {
      setLoading(true)
      const userExists = await queryUserExists(email)
      if (userExists) {
        await loginUser(email)
      } else {
        setErrorMsg('User not found.')
        console.log('user wasn not found in db')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Login | Output Field</title>
      </Head>
      <h1 className='glow-black text-[40px] ml-2'>
        Login
      </h1>
      <div className="h-3/5 py-8 my-4 border-long-dashed-y">
        <form onSubmit={handleSubmit}>
          <div className="flex py-4 w-full justify-center">
            <label>
              <span className='text-sm'>Login with Magic link:</span>
              <input
                className={`
                border-box
                rounded-none
                border
                border-solid
                invalid:border-red
                border-black
                w-full
                outline-0
                placeholder:text-slate-400
                disabled:text-slate-300
                disabled:placeholder:text-slate-300
                py-3.5
                text-base
                focus:outline-none
                focus:glow-blue
              `}
                name="email"
                type="text"
                placeholder="Your email address"
                id="contactSubject"
                autoComplete="off"
              />
            </label>
          </div>
          <div className="text-center relative">
            <Button type="submit">
              {loading ? '...' : 'Login'}
            </Button>
            <p className="py-4">{errorMsg}</p>
            {loading && <Spinner />}
            {loading && <div className='absolute h-screen w-full opacity-50 bg-gray-dark'></div>}
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Login
