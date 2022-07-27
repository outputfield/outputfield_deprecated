import React, { useState } from 'react'
import ProfileForm from '../components/profileForm'

export default function SignUp() {
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const handleSubmit = async (data: any, files: any) => {
    console.log('sign-up handleSubmit', data, files)
    // setIsSubmitting(true)
    try {
      // 1. create user
      await fetch('/api/signUp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      // 2. PUT each file
      files.forEach(async(f: File) => {
        console.log(f)
        const signedUrlRes = await fetch('/api/presignedUrl', {
          method: 'POST',
          body: JSON.stringify({
            fileName: f.name,
            fileType: f.type
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const { signedUrl } = await signedUrlRes.json()

        console.log(signedUrl)

        await fetch(signedUrl,  {
          method: 'PUT',
          body: f,
          headers: {
            'Content-Type': f.type,
            'x-amz-acl': 'public-read'
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
    setIsSubmitting(true)  
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
