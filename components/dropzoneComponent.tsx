import Image from 'next/image'
import React, { useState, useCallback, useMemo, useEffect, ChangeEvent } from 'react'
import { useDropzone } from 'react-dropzone'

const baseStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

interface FilePlus extends File {
  preview: string
}

function DropzoneComponent({ handleDrop }: any) {
  const [file, setFile] = useState<FilePlus | undefined>()
  
  const onDrop = useCallback((acceptedFile) => {
    console.log('onDrop acceptedFiles', acceptedFile)

    // 1. set state locally, for fileWithPreview preview purposes.
    const fileWithPreview = {...acceptedFile, preview: URL.createObjectURL(acceptedFile)}
    setFile(fileWithPreview)
  
    // 2. set state in ProfileForm, for form data collection
    handleDrop(acceptedFile)
  }, [])

  // TODO: remove this & uninstall react-dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    noDragEventsBubbling: true 
  })

  // TODO: remove this & uninstall react-dropzone
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ])

  const thumbNail = (
    <div key={file?.name}>
      <Image
        src={file?.preview || ''}
        alt={file?.name}
        height="10"
        width="10"
      />
    </div>
  )

  // clean up
  useEffect(() => () => {
    URL.revokeObjectURL(file?.preview || '')
  }, [file])

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    console.log('handleImageUpload')
    const el = e.target as HTMLInputElement
    if (el.files != null) {
      const file = el.files[0]
      const formData = new FormData()
      formData.append('file', file)
      onDrop(formData)
    }
  }

  return (
    <section>
      <label htmlFor="file-upload">
        <div>
          {thumbNail}
          <div id="dashboard-image-hover" >Upload Image</div>
        </div>
      </label>
      <input id="file-upload" type="file" onChange={handleImageUpload}/>
    </section>
  )
}

export default DropzoneComponent