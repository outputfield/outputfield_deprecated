import Image from 'next/image'
import React, { useState, useEffect, ChangeEvent, useMemo } from 'react'

type Props = {
    handleDrop: (f: FormData) => void;
}

type FileWithPreview = File & {
    preview: string
}

function ProfileImgUpload({ handleDrop }: Props) {
  const [file, setFile] = useState<FileWithPreview | undefined>()

  const thumbNail = useMemo(() => {
    if (!file) return
    return (
      <Image
        src={file?.preview || ''}
        alt={file?.name || 'profile image preview'}
        height="100"
        width="100"
      />
    )
  }, [file])

  //   clean up
  useEffect(() => () => {
    URL.revokeObjectURL(file?.preview || '')
  }, [file])

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const el = e.target as HTMLInputElement
    if (el.files != null) {
      const file = el.files[0]
      
      // 1. set state locally, for fileWithPreview preview purposes.
      const fileWithPreview = {...file, preview: URL.createObjectURL(file)}
      setFile(fileWithPreview)
      console.log(fileWithPreview)

      // 2. set state in ProfileForm, for form data collection
      const formData = new FormData()
      formData.set('name', 'profileImg')
      formData.append('file', file)
      handleDrop(formData)
    }
  }

  return (
    <section>
      <label htmlFor="file-upload" className='cursor-pointer'>
        <div>
          {thumbNail}
          Upload 
        </div>
      </label>
      <input id="file-upload" type="file" accept='.png, .jpeg, .jpg' onChange={handleImageUpload} className='hidden'/>
    </section>
  )
}

export default ProfileImgUpload
