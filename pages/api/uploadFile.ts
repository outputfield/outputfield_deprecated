import { ListObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextApiRequest, NextApiResponse } from 'next'
import spaces from '../../lib/doSpaces'

export default async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  const { file } = req.body
  try {
    // Specifies a path within your Space and the file to upload.
    const bucketParams = {
      Bucket: 'outputfieldartworks',
      Key: file.name,
      Body: file,
      ACL: 'public-read'
    }
    const data = await spaces.send(new PutObjectCommand(bucketParams))

    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}