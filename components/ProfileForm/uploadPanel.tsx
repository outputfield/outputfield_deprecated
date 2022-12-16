import React from 'react'
import DropzoneComponent from '../dropzoneComponent'

type UploadPanelProps = {
    handleUploadWork: (uploadNum: number) => (file: FormData) => void,
    uploadNum: number,
};

interface DropzoneProps {
    uploadNum: number,
  }

export default function UploadPanel({
  handleUploadWork,
  uploadNum
}: UploadPanelProps) {
  const MemoDropzoneComponent = React.memo(({ uploadNum }: DropzoneProps) => {
    return <DropzoneComponent handleDrop={handleUploadWork(uploadNum)} />
  })
  MemoDropzoneComponent.displayName = 'MemoDropzoneComponent'
  return (
    <div className="text-center">
                   We currently support:
      <br /><br />
      <ul>
        <li>images (jpg, png, gif, tiff)</li>
      </ul>
      <br />
      <MemoDropzoneComponent uploadNum={uploadNum} />
    </div>
  )
}
