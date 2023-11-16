import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { Prisma } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

import ProfileForm, { ISignUpInputs } from '../components/ProfileForm'
import { UserCreateInputWithArtist, UserWithArtist } from './api/signUp'
import { makeid, partition } from '../lib/utils'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getAllMediums } from './api/create-account'
import { MediumOptionT } from '../components/ProfileForm/MediumsCombobox'
import { URLPattern } from 'next/server'

export type Work = {
  title: string,
  url: string,
}

export async function getStaticProps() {  
  const mediumsRes = await getAllMediums()
  const mediums = JSON.parse(JSON.stringify(mediumsRes)).map((m:any) => ({id: m.id, label: m.name}))

  return {
    props: {
      mediums
    },
  }
}

interface Props {
  mediums: MediumOptionT[];
}

export default function CreateAccount({ mediums }: Props) {
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ message, setMessage ] = useState('')
  const router = useRouter()

  useEffect(() => {
    // TODO: show error if query params doesnt include email
  }, [])
  const pendingForms = new WeakMap()

  // - - - HELPER FNs - - -

  // 1. create user
  async function createUser(
    data: UserCreateInputWithArtist,
    controller: AbortController,
  ): Promise<UserWithArtist> {
    let newUser: UserWithArtist
    try {
      const res = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })
      newUser = await res.json()
      return newUser
    } catch (err) {
      throw new Error(`Failed to /signUp: ${err}`)
    }
  }

  // 2. Upload works to DO
  async function uploadWorks(
    files: FormData[], 
    handle: string,
    controller: AbortController
  ) {
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
            signal: controller.signal
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
  
    return works.map((w: {title: string, url: string }) => ({...w, type: 'WORK'}))
  }

  // 3. Update artist with added works
  async function updateArtistWithWorks(
    works: Work[], 
    handle: string, 
    controller: AbortController
  ) {
    try {
      await fetch('/api/addArtistWorks',
        {
          method: 'PUT',
          body: JSON.stringify({
            artistHandle: handle,
            works
          }),
          signal: controller.signal
        }
      )
      console.log('successfully updated artist with works!')
    } catch (error) {
      throw new Error(`Failed to update artist Works: ${error}`)
    }
  }

  // 4. Upload profileImg
  async function uploadFiles(
    file: FormData,
    handle: string,
    controller: AbortController
  ) {
    try {
      file.set('name', 'profileImg')
      file.append('artistHandle', handle)
      const res = await fetch(
        'api/uploadFile',
        {
          method: 'PUT',
          body: file,
          signal: controller.signal
        }
      )
      const uploadedProfileImg = await res.json()
      console.log(uploadedProfileImg)

      return uploadedProfileImg
    } catch (error) {
      throw new Error(`Failed to /uploadFile profileImg: ${error}`)
    }
  }

  // 3. Update user with profileImg
  async function updateUserWithProfileImg(
    url: URLPattern, 
    handle: string, 
    controller: AbortController
  ) {
    try {
      await fetch('/api/addArtistWorks',
        {
          method: 'PUT',
          body: JSON.stringify({
            artistHandle: handle,
            url
          }),
          signal: controller.signal
        }
      )
      console.log('successfully updated user with works!')
    } catch (error) {
      throw new Error(`Failed to update user Works: ${error}`)
    }
  }

  // 5. Revalidate Artist's page
  async function revalidateArtistPage(
    pathToRevalidate: string,
    controller: AbortController
  ) {
    try {
      const params =  {
        'secret': process.env.NEXT_PUBLIC_NEXT_REVALIDATION_TOKEN || 'no token found',
      }
      await fetch('/api/revalidate'+ '?' + new URLSearchParams(params),
        {
          method: 'PUT',
          body: JSON.stringify({
            pathToRevalidate
          }),
          signal: controller.signal
        }
      )
      console.log('successfully revalidated artist page!')
    } catch (error) {
      throw new Error(`Failed to revalidate: ${error}`)
    }
  }
  // - - - END HELPER FNs - - -

  // Pass submit handler fn into ProfileForm
  const handleSubmit = async (event: BaseSyntheticEvent, data: ISignUpInputs, files: FormData[]) => {
    const form = event.currentTarget
    const previousController = pendingForms.get(form)

    if (previousController) {
      previousController.abort()
    }

    const controller = new AbortController()
    pendingForms.set(form, controller)

    event.preventDefault()
    console.log('sign-up handleSubmit', data, files)
    setIsSubmitting(true)

    try {
      const params = new URLSearchParams(document.location.search)
      const _email = params.get('email') || `${makeid(6)}@gmail.com`
      const id = uuidv4()
      const newUser: UserWithArtist = await createUser(
        {
          ...data,
          id,
          name: data.name,
          handle: data.handle,
          mediums: data.mediums.map(({ label }) => label),
          mediumsOfInterest: data.mediumsOfInterest.map(({ label }) => label),
          links: data.links as Prisma.LinkCreateNestedManyWithoutArtistInput,
          email: _email,
        },
        controller
      )
      const userId = newUser.artist? newUser.artist.handle : `artist${newUser.id}`
      const works = await uploadWorks(files, userId, controller)
      await updateArtistWithWorks(
        works as Work[],
        userId,
        controller
      )

      // Trigger revalidation, on new artist's page only
      await revalidateArtistPage(`/artists/${newUser.artist?.handle}`, controller)

      pendingForms.delete(form)

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
        <h1 className='glow-black text-xl ml-4 mt-16'>
          New Profile
        </h1>
        {/* TODO: use this full width Divider Component everywhere*/}
        <div className='w-full mt-5 border-long-dashed-t'></div>
        <ProfileForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          mediums={mediums}
        />
        <div className="text-center text-sm text-blue">
          {message}
        </div>
      </main>
    </>
  )
}
