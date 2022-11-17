import Image from 'next/image'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { useUser } from '../lib/useUser'

interface FilePlus extends File {
  preview: string
}

function DropzoneComponent({ handleDrop }: any) {
  const [file, setFile] = useState<File | undefined>()

  // // FIXME: remove this 
  // const thumbNail = false && (
  //   <div key={file?.name}>
  //     <Image
  //       src={file?.preview || ''}
  //       alt={file?.name}
  //       height="10"
  //       width="10"
  //     />
  //   </div>
  // )

  // clean up
  // useEffect(() => () => {
  //   URL.revokeObjectURL(file?.preview || '')
  // }, [file])

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault() // need to stop default, which causes form submit
    console.log('handleImageUpload')
    const el = e.target as HTMLInputElement
    if (el.files != null) {
      const file = el.files[0]
      const formData = new FormData()
      formData.append('file', file)

      // 1. set state locally, for fileWithPreview preview purposes.
      // const fileWithPreview = {...file, preview: URL.createObjectURL(file)}
      setFile(file)

      // 2. set state in ProfileForm, for form data collection
      handleDrop(formData)
    }
  }

  return (
    <section>
      <label htmlFor="file-upload">
        <div>
          {/* {thumbNail} */}
          {file && (
            <p>{file.name} - {file.size}</p>
          )}
          <div id="dashboard-image-hover" >Upload Image</div>
        </div>
      </label>
      <input id="file-upload" type="file" onChange={handleImageUpload}/>
    </section>
  )
}

export default DropzoneComponent