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
        f.append('userId', newUser.id)
        return fetch(
          'api/uploadFile',
          {
            method: 'PUT',
            body: f,
          } )}
      )
      const uploadResObject = await Promise.all(uploadPromises)
      console.log('uploadResObject', uploadResObject)
      works = files.map((f: FormData) => {
        const file = f.get('file') as File
        return {
          label: file.name,
          // FIXME: make url dynamic
          url: `https://outputfieldartworks.sfo3.digitaloceanspaces.com/${newUser.id}/${file.name}`
        }
      })
    } catch (error) {
      console.error(`Failed to /uploadFile: ${error}`)
      // console.log(files.map((f: File) => JSON.stringify(f)))
    }

    try {
      // TODO: Write an api route to handle updating User with Works
      // await prisma.user.update({
      // where: {
      //   id: newUser.id
      // },
      // works: {
      //   create: works
      // }
      // })
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
