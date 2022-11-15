import { NextApiRequest, NextApiResponse } from 'next'
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
      
    const signedUrl = await spaces.getSignedUrl('putObject', params)
      
    res.json({signedUrl})
      
  } catch (error: any) {
    res.status(error?.status || 500).end(error?.message)
  }
}
