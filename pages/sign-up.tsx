import React, { BaseSyntheticEvent, useState } from 'react'
import ProfileForm from '../components/profileForm'

export default function SignUp() {
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  // Pass submit handler fn into ProfileForm
  const handleSubmit = async (event: BaseSyntheticEvent, data: any, files: any) => {
    // event.preventDefault()
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

      // 2. PUT request for each file
      files.forEach(async(f: File) => {
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

        // FIXME: failing here
        await fetch(signedUrl,  {
          method: 'PUT',
          body: f,
          headers: {
            'Origin': window.location.origin,
            'Content-Type': f.type,
            'x-amz-acl': 'public-read'
          }
        })
      })
    } catch (error) {
      console.log(error)
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
