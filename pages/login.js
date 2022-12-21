import React, { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/useUser'
import Form from '../components/form'

import { Magic, RPCError } from 'magic-sdk'

/**
 *  On login submit, query the db for user.
 *     If user not found,  redirect to cheeky 404, NO ACCOUNT WITHOUT REFERRAL
 *     else, continue to Magic login flow
 * @returns React.FC
 */
const Login = () => {
  const user = useUser({ redirectTo: '/', redirectIfFound: true })
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    const { currentTarget: { email: { value: email } } }  = e

    // TODO: write these try/catches as separate async helper functions, and call them from a main try catch
    try {
      // const { currentTarget: { email: { value: email } } }  = e
      const result = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const { userExists } = await result.json()
      // console.log('user exists? ', user)
      if (!userExists) {
        Router.push('/sign-up')
      }
    } catch (error) {
      if (error instanceof ReferenceError) {
        // TODO: redirect to cheeky 404, NO ACCOUNT WITHOUT REFERRAL
        Router.push('/sign-up')
      } else {
        console.log(error)
        setErrorMsg(error.message)
      }
    }

    // Login flow
    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
      const didToken = await magic.auth.loginWithMagicLink({ email })
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify({ email: user.email }),
      })
      console.log('login RES ', res)
      if (res.status === 200) {
        Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      if (error instanceof RPCError) {
        // TODO: Redirect to /account-settings to update email.
      }
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <>
      <div className="login">
        {/* TODO: Write the form here instead of in a separate component */}
        <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      {/* <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style> */}
    </>
  )
}

export default Login
