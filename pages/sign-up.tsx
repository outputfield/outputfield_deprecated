import React, { useState } from 'react'
import ProfileForm, { ISignUpInputs } from '../components/profileForm'

export default function SignUp() {
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  /**
   * 1. Create user /signUp. Get userId back
   * 2. Upload each file to DO, where key: `${userID}/${fileName}`
   * 3. Update user's Works, where {
   *      name: file.name,
   *      url: `https://outputfieldartworks.sfo3.digitaloceanspaces.com/${userID}/${fileName}`
   *    }
   * @param data 
   * @param files 
   */
  const handleSubmit = async (data: ISignUpInputs, files: FormData[]) => {
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
    const _nominatorId = 6

    let newUser: any
    // 1. create user
    try {
      const res = await fetch('/api/signUp', {
        method: 'PUT',
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
        f.append('artistHandle', newUser.artist.handle)
        return fetch(
          'api/uploadFile',
          {
            method: 'PUT',
            body: f,
          } )}
      )
      const res = await Promise.all(uploadPromises)
      works = await Promise.all(res.map(r => r.json()))
      // works = res.map(async (res) => {
      //   const work = await res.json()
      //   return work
      // })
      console.log('works', works) // TODO:
      debugger
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
