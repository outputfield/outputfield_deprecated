import Image from 'next/image'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
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

// FIXME: this should only store ONE file, not 'files'
// TODO: pass function which puts uploaded file to allFiles[props.key] in ProfileForm state
function DropzoneComponent({ handleDrop }: any) {
  // TODO: Hoist this 'files' state to where it's being duplicated, higher up
  const [files, setFiles] = useState([])
  console.log('files', files)
  
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map((file: File) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
    
    acceptedFiles.forEach((f: File) => handleDrop(f))
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
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

  const thumbs = files.map((file: FilePlus) => (
    <div key={file.name}>
      <Image
        src={file.preview}
        alt={file.name}
        height="10"
        width={"10"}
      />
    </div>
  ))

  // clean up
  useEffect(() => () => {
    files.forEach((file: FilePlus) => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <section>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div>+</div>
      </div>
      <aside>
        {thumbs}
      </aside>
    </section>
  )
}

export default DropzoneComponent