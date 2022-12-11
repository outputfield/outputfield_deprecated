import React, { BaseSyntheticEvent, useState } from 'react'
import { Prisma } from '@prisma/client'

import ProfileForm, { ISignUpInputs } from '../components/ProfileForm'
import { UserCreateInputWithArtist, UserWithArtist } from './api/signUp'
import { partition } from '../lib/utils'

export type Work = {
  title: string,
  url: string,
}

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

function makeid(length: number) {
  let result           = ''
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength))
  }
  return result
}

export default function SignUp() {
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  // Pass submit handler fn into ProfileForm
  const handleSubmit = async (event: BaseSyntheticEvent, data: ISignUpInputs, files: FormData[]) => {
    event.preventDefault()
    console.log('sign-up handleSubmit', data, files)
    setIsSubmitting(true)

    try {
      // FIXME: Grab new user email from URL
      const _email = `${makeid(6)}@gmail.com`

      // FIXME: get nominatorId from URL
      const _nominatorId = 1
      const newUser: UserWithArtist = await createUser({
        ...data,
        name: data.Name,
        handle: data.Handle,
        links: data.links as Prisma.LinkCreateNestedManyWithoutArtistInput,
        email: _email,
        nominatorId: _nominatorId,
      })
      const userId = newUser.artist? newUser.artist.handle : `artist${newUser.id}`
      const works = await uploadFiles(files, userId)
      updateUserWithWorks(works as Work[], userId)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <ProfileForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
