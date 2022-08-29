import React, { useState } from 'react'
import ProfileForm from '../components/profileForm'

export default function SignUp() {
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  // Pass submit handler fn into ProfileForm
  const handleSubmit = async (data: any, files: any) => {
    console.log('sign-up handleSubmit', data, files)
    setIsSubmitting(true)

    // TODO: Grab new user email
    const _email = 'dummyemail@gmail.com'

    // TODO: get referrerId
    const _referrerId = '123456'

    // Returns name and UID (or url?) of each work, as a parameter to /api/signUp
    let workUIDs
    try {
      const uploadPromises = files.map((f: File) => fetch(
        'api/uploadFile', 
        {
          method: 'PUT',
          body: f,
        })
      )
      // TODO: get each Work { type: string?, link: string }
      workUIDs = await Promise.all(uploadPromises)
    } catch (error) {
      console.error(`Failed to fetch: ${error}`)
    }
    debugger

    // 2. create user
    try {
      await fetch('/api/signUp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          email: _email,
          links: workUIDs,
          referrerId: _referrerId,
        })
      })
    } catch (err) {
      console.log(err)
    }


    //     // const signedUrlRes = await fetch('/api/presignedUrl', {
    //     //   method: 'POST',
    //     //   body: JSON.stringify({
    //     //     fileName: f.name,
    //     //     fileType: f.type
    //     //   }),
    //     //   headers: {
    //     //     'Content-Type': 'application/json'
    //     //   },
    //     // })
    //     // const { signedUrl } = await signedUrlRes.json()

    //     // const res = await fetch(signedUrl,  {
    //     //   method: 'PUT',
    //     //   body: f,
    //     //   headers: {
    //     //     'Content-Type': f.type,
    //     //     'x-amz-acl': 'public-read'
    //     //   }
    //     // })        

    //     return data
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
