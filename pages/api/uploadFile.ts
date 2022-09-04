import { PutObjectCommand } from '@aws-sdk/client-s3'
import { NextApiRequest, NextApiResponse } from 'next'
import spaces from '../../lib/doSpaces'
import fs from 'fs'

export default async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  const { file } = req.body
  const json = fs.readFileSync(file.path)
  try {
    // TODO: Specify type here?
    // Specifies a path within your Space and the file to upload.
    const bucketParams = {
      Bucket: 'outputfieldartworks',
      Key: file.name,
      Body: JSON.stringify(json),
      ACL: 'public-read'
    }
    const data = await spaces.send(new PutObjectCommand(bucketParams))
    return data
  } catch (error) {
    // Unlink file
    fs.unlinkSync(file.path)
    console.log(error)
    throw error
  }
}