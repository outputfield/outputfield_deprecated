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
    form.uploadDir = './'
    form.keepExtensions = true  
    form.parse(req, async (err:any, fields: any, files: any) => {
    // Account for parsing errors
      if (err) return res.status(500).send(`Error occured: ${err}`)

      try {
        // Read file
        const file = fs.readFileSync(files.file.path) // Buffer
        const bucketParams = {
          Bucket: 'outputfieldartworks',
          Key: `${fields.id}/${files.file.name}`, // Specify folder and file name
          Body: file,
          ACL: 'public-read'
        }
        const data = await spaces.send(new PutObjectCommand(bucketParams))
        console.log('after /uploadFile', data)

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'max-age=180000')
        return res.end(JSON.stringify(data))
      // res.send('data')
      } catch (error) {
        console.log('err', error)
        // Unlink file
        fs.unlinkSync(files.file.path)
        return res.status(500).send(`Error occured: ${error}`)
      }
    })
  } else {
    res.status(405)
    res.end()
  }
}
