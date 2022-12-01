import React, { BaseSyntheticEvent, useState } from 'react'

import ProfileForm, { ISignUpInputs } from '../components/ProfileForm'

export default function SignUp() {
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  // Pass submit handler fn into ProfileForm
  const handleSubmit = async (event: BaseSyntheticEvent, data: ISignUpInputs, files: FormData[]) => {
    event.preventDefault()
    console.log('sign-up handleSubmit', data, files)
    setIsSubmitting(true)

    // TODO: Grab new user email
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
    const _email = `${makeid(6)}@gmail.com`

    // TODO: get nominatorId
    const _nominatorId = 1

    let newUser: any
    // 1. create user
    try {
      const res = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          email: _email,
          nominatorId: _nominatorId,
        })
      })
      newUser = await res.json()
    } catch (err) {
      console.error(`Failed to /signUp: ${err}`)
    }

    // 2. Upload files to DO
    let works
    try {
      const uploadPromises = files.map((f: FormData) => {
        console.log('inside of creating uploadPromises', f)
        f.append('artistHandle', newUser.artist.handle)
        return fetch(
          'api/uploadFile',
          {
            method: 'PUT',
            body: f,
          } 
        )
      })

      const res = await Promise.all(uploadPromises)
      works = await Promise.all(res.map(r => r.json()))
    } catch (error) {
      console.error(`Failed to /uploadFile: ${error}`)
    }

    try {
      await fetch('/api/addArtistWorks',
        {
          method: 'PUT',
          body: JSON.stringify({
            artistHandle: newUser.artist.handle,
            works
          })
        }
      )
      console.log('successfully updated user with works!')
    } catch (error) {
      console.error(`Failed to update user Works: ${error}`)
    }

    setIsSubmitting(false)  
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
