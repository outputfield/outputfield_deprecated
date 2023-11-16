import React from 'react'
import UploadButton from '../uploadButton'

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
  const MemoUploadButton = React.memo(({ uploadNum }: DropzoneProps) => {
    return <UploadButton handleDrop={handleUploadWork(uploadNum)} />
  })
  MemoUploadButton.displayName = 'MemoUploadButton'
  return (
    <div className="pt-24 text-center">
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
      <MemoUploadButton uploadNum={uploadNum} />
    </div>
  )
}
