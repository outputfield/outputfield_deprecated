import React, { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/useUser'
import Form from '../components/form'

import { Magic, RPCError } from 'magic-sdk'

const Login = () => {
  const user = useUser({ redirectTo: '/', redirectIfFound: true })
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    const { currentTarget: { email: { value: email } } }  = e

    // TODO: write these try/catches as separate async functions, and call them from a main try catch
    // Query db for user on submit. If user not found, redirect to "sign-up" flow.
    try {
      const { currentTarget: { email: { value: email } } }  = e
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
      const didToken = await magic.auth.loginWithMagicLink({ email: user.email })
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
        <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}

export default Login
