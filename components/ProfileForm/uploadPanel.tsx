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
    <div className="h-full text-center flex-col items-center justify-center">
      <p>
        We support:
      </p>
      <br /><br />
      <ul>
        <li>images (jpg, png, gif, tiff)</li>
        <li>video (mp4, mov)</li>
        <li>audio (mp3)</li>
        <li>documents (pdf)</li>
      </ul>
      <br /><br /><br />
      <MemoDropzoneComponent uploadNum={uploadNum} />
    </div>
  )
}
