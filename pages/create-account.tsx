import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { Prisma } from '@prisma/client'

import ProfileForm, { ISignUpInputs } from '../components/ProfileForm'
import { UserCreateInputWithArtist, UserWithArtist } from './api/signUp'
import { makeid, partition } from '../lib/utils'
import { useRouter } from 'next/router'
import Head from 'next/head'

export type Work = {
  title: string,
  url: string,
}

// - - - HELPER FNs - - -

// 1. create user
async function createUser(data: UserCreateInputWithArtist): Promise<UserWithArtist> {
  let newUser: UserWithArtist
  try {
    const res = await fetch('/api/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    newUser = await res.json()
    return newUser
  } catch (err) {
    throw new Error(`Failed to /signUp: ${err}`)
  }
}

// 2. Upload files to DO
async function uploadFiles(files: FormData[], handle: string) {
  let works
  const [_embeddedWork, _uploadedWork] = partition(
    files,
    (f: FormData) => {
      const workType = f.get('workType')
      return workType === 'embeddedWork'
    }
  )
  const embeddedWork = _embeddedWork.map((f: FormData) => (
    {
      url: f.get('url') || '',
      title: f.get('title') || ''
    }
  ))

  console.log(embeddedWork)
 
  try {
    const uploadPromises = _uploadedWork.map((f: FormData) => {
      f.append('artistHandle', handle)
      return fetch(
        'api/uploadFile',
        {
          method: 'PUT',
          body: f,
        }
      )
    })

    const res = await Promise.all(uploadPromises)
    const uploadedWork = await Promise.all(res.map((r: Response) => r.json()))
    console.log(uploadedWork)
    works = embeddedWork.concat(uploadedWork)
    console.log(works)
  } catch (error) {
    throw new Error(`Failed to /uploadFile: ${error}`)
  } 
  
  return works
}

// 3. Update user with added works
async function updateUserWithWorks(works: Work[], handle: string) {
  try {
    await fetch('/api/addArtistWorks',
      {
        method: 'PUT',
        body: JSON.stringify({
          artistHandle: handle,
          works
        })
      }
    )
    console.log('successfully updated user with works!')
  } catch (error) {
    throw new Error(`Failed to update user Works: ${error}`)
  }
}

// 4. Revalidate Artist's page
async function revalidateArtistPage(pathToRevalidate: string) {
  try {
    const params =  {
      'secret': process.env.NEXT_PUBLIC_NEXT_REVALIDATION_TOKEN || 'no token found',
    }
    await fetch('/api/revalidate'+ '?' + new URLSearchParams(params),
      {
        method: 'PUT',
        body: JSON.stringify({
          pathToRevalidate
        })
      }
    )
    console.log('successfully revalidated artist page!')
  } catch (error) {
    throw new Error(`Failed to revalidate: ${error}`)
  }
}
// - - - END HELPER FNs - - -

export default function CreateAccount() {
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ message, setMessage ] = useState('')
  const router = useRouter()

  useEffect(() => {
    // TODO: show error if query params doesnt include email
  }, [])

  // Pass submit handler fn into ProfileForm
  const handleSubmit = async (event: BaseSyntheticEvent, data: ISignUpInputs, files: FormData[]) => {
    event.preventDefault()
    console.log('sign-up handleSubmit', data, files)
    setIsSubmitting(true)

    try {
      const params = new URLSearchParams(document.location.search)
      const _email = params.get('email') || `${makeid(6)}@gmail.com`
      const _nominatorId = params.get('nominatorId') || '1'
      const newUser: UserWithArtist = await createUser({
        ...data,
        mediums: data.mediums.map(({ label }) => label),
        mediumsOfInterest: data.mediumsOfInterest.map(({ label }) => label),
        name: data.name,
        handle: data.handle,
        links: data.links as Prisma.LinkCreateNestedManyWithoutArtistInput,
        email: _email,
        nominatorId: parseInt(_nominatorId),
      })
      const userId = newUser.artist? newUser.artist.handle : `artist${newUser.id}`
      const works = await uploadFiles(files, userId)
      await updateUserWithWorks(works as Work[], userId)

      // Trigger revalidation, on new artist's page only
      await revalidateArtistPage(`/artists/${newUser.artist?.handle}`)

      setMessage('Account successfully created! Redirecting to Login shortly...')
      setTimeout(() => {
        // Finally, redirect to /login, where user will login for the first time
        router.push('/login')
      }, 3000)
    } catch (error) {
      console.error(error)
      setMessage('Sorry, something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Create Account | Output Field</title>
      </Head>
      <main>
        <h1 className='glow-black text-[40px] ml-2'>
          New Profile
        </h1>
        <ProfileForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        <div className="text-center text-sm text-blue">
          {message}
        </div>
      </main>
    </>
  )
}
