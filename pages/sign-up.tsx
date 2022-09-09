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
  const handleSubmit = async (data: ISignUpInputs, files: File[]) => {
    console.log('sign-up handleSubmit', data, files)
    setIsSubmitting(true)

    // TODO: Grab new user email
    const _email = 'dummyemail@gmail.com'

    // TODO: get referrerId
    const _referrerId = 1

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
          referrerId: _referrerId,
        })
      })
      const userID = await res.json()
      console.log(userID)
    } catch (err) {
      console.error(`Failed to /uploadFile: ${err}`)
    }

    // 2. Upload files to DO
    try {
      const uploadPromises = files.map((f: File) => {
        return fetch(
          'api/uploadFile',
          {
            method: 'PUT',
            body: f,
          } )}
      )
      // TODO: get each Work { type: string?, link: string }
      await Promise.all(uploadPromises)
      // console.log('uploadResObject', uploadResObject)
    } catch (error) {
      console.error(`Failed to /uploadFile: ${error}`)
      console.log(files.map((f: File) => JSON.stringify(f)))
    }

    try {
      // TODO: now update user with Works
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
