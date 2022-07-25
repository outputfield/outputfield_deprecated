import { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils'
import spaces from '../../lib/doSpaces'

export default async function presignedUrl(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body
      
    const params = {
      Bucket: 'outputfield',
      Key: body.fileName,
      Expires: 60 * 3, // Expires in 3 minutes
      ContentType: body.fileType,
      ACL: 'public-read', // Remove this to make the file private
    }
      
    const signedUrl = spaces.getSignedUrl('putObject', params)
      
    res.json({signedUrl})
      
  } catch (error) {
    let errorMessage = 'Failed to get presigned URL :('
    if (error instanceof Error) {
      errorMessage = error.message
      res.status(500).end(error.message)
    }
    console.log(errorMessage)
  }
}
