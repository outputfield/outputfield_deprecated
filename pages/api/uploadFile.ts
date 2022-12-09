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
    form.parse(req, async (err: any, fields: any, formData: FormData) => {
      // Account for parsing errors
      if (err) return res.status(500).send(`Error occured: ${err}`)

      try {
        const { artistHandle } = fields
        const file = formData.get('file') as FileWithPath
        const work = {
          title: file.name,
          // TODO: Put bucket name in .env, and make it dynamic
          url: `https://outputfieldartworks.sfo3.digitaloceanspaces.com/${artistHandle}/${file.name}`
        }

        spaces.putObject({
          Bucket: 'outputfieldartworks',
          Key: `${artistHandle}/${file.name}`, // Specify folder and file name
          Body: fs.createReadStream(file.path),
          ACL: 'public-read'
        }, async () => res.status(201).send(work))
      } catch (error) {
        console.log('err', error)

        // Unlink file
        const file = formData.get('file') as FileWithPath
        fs.unlinkSync(file?.path)

        // FIXME: this should throw error
        return res.status(500).send(`Error occured: ${error}`)
      }
    })
  } else {
    res.status(405)
    res.end()
  }
}
