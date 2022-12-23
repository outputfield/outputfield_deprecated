import { NextApiRequest, NextApiResponse } from 'next'
import spaces from '../../lib/doSpaces'

import fs from 'fs'
import formidable from 'formidable-serverless'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface FileWithPath extends File { path: string; }

export default async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    // parse request to readable form
    form.parse(req, async (err: any, fields: any, files: any) => {
      const { artistHandle } = fields
      const file = files.file as FileWithPath

      // Account for parsing errors
      if (err) return res.status(500).send(`Error occured: ${err}`)

      try {
        const work = {
          title: file.name,
          // TODO: Put bucket name in .env, and make it dynamic
          url: `https://outputfieldartworks.sfo3.digitaloceanspaces.com/${artistHandle}/${file.name}`
        }

        spaces.putObject({
          Bucket: 'outputfieldartworks',
          Key: `${artistHandle}/${file.name}`, // Specify folder and file name
          Body: fs.createReadStream(file.path),
          ACL: 'public-read',
          Metadata: {
            'x-amz-acl': 'public-read'
          }
        }, async (err, data) => {
          if (err) {
            console.log(err, err.stack)
            throw err
          } else {
            console.log('Successful upload to DigitalOcean! Data: ', data)
            res.status(201).send(work)
          }
        })
      } catch (error) {
        // Unlink file
        fs.unlinkSync(file?.path)

        console.log(`/api failed to upload file: ${error}`)
        throw error
      }
    })
  } else {
    res.status(405)
    res.end()
  }
}
