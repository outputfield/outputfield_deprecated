import React, { BaseSyntheticEvent, useState } from 'react'
import Router from 'next/router'

import { Magic, RPCError } from 'magic-sdk'
import Layout from '../components/layout'

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
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || '')
    const didToken = await magic.auth.loginWithMagicLink({ email })
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
      Router.push('/')
    } else {
      throw new Error(await res.text())
    }
  } catch (error) {
    if (error instanceof RPCError) {
      // TODO: Redirect to /account-settings to update email.
    }
    console.error('An unexpected error happened occurred:', error)
    // setErrorMsg(error.message)
  }
}

// - - - - - - -

/**
 *  On login submit, query the db for user.
 *     If user not found,  redirect to cheeky 404, NO ACCOUNT WITHOUT REFERRAL
 *     else, continue to Magic login flow
 * @returns React.FC
 */
const Login = () => {
  // const user = useUser({ redirectTo: '/', redirectIfFound: true })
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault()
    // if (errorMsg) setErrorMsg('')
    const { currentTarget: { email: { value: email } } } = e

    try {
      const userExists = await queryUserExists(email)
      if (userExists) {
        await loginUser(email)
      } else {
        // handle user doesn't exist
        // TODO: redirect to cheeky 404, NO ACCOUNT WITHOUT REFERRAL
        setErrorMsg('User not found.')
        console.log('user wasn not found in db')
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Layout>
      <div className="">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>

          <div className="">
            <button type="submit">Login</button>
          </div>

          {errorMsg && <p className="error">{errorMsg}</p>}

        </form>
      </div>
    </Layout>
  )
}

export default Login
