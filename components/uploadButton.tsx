import React, { useState, ChangeEvent } from 'react'
import { Button } from './Button'

// TODO: Prop type
function UploadButton({ handleDrop }: any) {
  const [file, setFile] = useState<File | undefined>()

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const el = e.target as HTMLInputElement
    if (el.files != null) {
      const file = el.files[0]
      const formData = new FormData()
      formData.append('workType', 'uploadedWork')
      formData.append('file', file)

      // 1. set state locally, for fileWithPreview preview purposes.
      // TODO: const fileWithPreview = {...file, preview: URL.createObjectURL(file)}
      setFile(file)

      // 2. set state in ProfileForm, for form data collection
      handleDrop(formData)
    }
  }

  return (
    <section>
      <label htmlFor="file-upload" className='cursor-pointer'>
        <div>
          {file && (
            <p>{file.name} - {file.size}</p>
          )}
          <Button as="a">Upload</Button>
        </div>
      </label>
      <input id="file-upload" type="file" accept='.png, .jpeg, .jpg' onChange={handleImageUpload} className='hidden'/>
    </section>
  )
}

export default UploadButton
