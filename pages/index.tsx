import { useRouter } from 'next/router'
import React, { useLayoutEffect } from 'react'
import { useUser } from '../lib/useUser'

const Home = () => {
  const user = useUser()
  const router = useRouter()

  useLayoutEffect(() => {
    router.replace('/artists'), []
  }, [])

  return (
    <div className='flex flex-col text-center'>

      Loading...

      {user && (
        <>
          <p>Currently logged in as:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  )
}

export default Home
