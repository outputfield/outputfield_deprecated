import Image from 'next/image'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

// TODO: remove & uninstall react-dropzone

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
  const [file, setFile] = useState([])
  
  const onDrop = useCallback((acceptedFiles, event) => {
    console.log('onDrop acceptedFiles', acceptedFiles)
    const f = acceptedFiles
    // const fileWithPreview = Object.assign(f, {preview: URL.createObjectURL(f)})
    
    // 1. set state locally, for fileWithPreview preview purposes.
    // setFile(fileWithPreview)
  
    // 2. set state in ProfileForm, for form data collection
    handleDrop(f)
  }, [])

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

  // const thumbs = files.map((file: FilePlus) => (
  //   <div key={file.name}>
  //     <Image
  //       src={file.preview}
  //       alt={file.name}
  //       height="10"
  //       width="10"
  //     />
  //   </div>
  // ))

  // clean up
  useEffect(() => () => {
    URL.revokeObjectURL(file.preview)
  }, [file])

  async function handleProfileImageUpload(e) {
    console.log('handleProfileImageUpload')
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    onDrop(formData, e)
  }

  return (
    <section>
      <label htmlFor="file-upload">
        <div>
          {/* <img src={profileImage} className=""/> */}
          <div id="dashboard-image-hover" >Upload Image</div>
        </div>
      </label>
      <input id="file-upload" type="file" onChange={handleProfileImageUpload}/>
    </section>
  )
}

export default DropzoneComponent