import { PutObjectCommand } from '@aws-sdk/client-s3'
import { NextApiRequest, NextApiResponse } from 'next'
import spaces from '../../lib/doSpaces'

import fs from 'fs'
import formidable from 'formidable-serverless'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    // parse request to readable form
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err: any, fields: any, formData: any) => {
    // Account for parsing errors
      if (err) return res.status(500).send(`Error occured: ${err}`)

      try {
        const { artistHandle } = fields
        // Read file
        const file = fs.readFileSync(formData.file.path) // Buffer
        const bucketParams = {
          Bucket: 'outputfieldartworks',
          Key: `${artistHandle}/${formData.file.name}`, // Specify folder and file name
          Body: file,
          ACL: 'public-read'
        }
        const data = await spaces.send(new PutObjectCommand(bucketParams))
        // console.log('after /uploadFile', data)

        const work = {
          // FIXME: make url dynamic
          link: `https://outputfieldartworks.sfo3.digitaloceanspaces.com/${artistHandle}/${formData.file.name}`
        }

        return res.status(200).json(work)
      } catch (error) {
        console.log('err', error)
        // Unlink file
        fs.unlinkSync(formData.file.path)
        return res.status(500).send(`Error occured: ${error}`)
      }
    })
  } else {
    res.status(405)
    res.end()
  }
}
