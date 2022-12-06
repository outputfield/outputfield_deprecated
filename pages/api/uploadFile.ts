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
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    // parse request to readable form
    form.parse(req, async (err: any, fields: any, formData: any) => {
      // Account for parsing errors
      if (err) return res.status(500).send(`Error occured: ${err}`)

      try {
        const { artistHandle } = fields
        const work = {
          title: formData.file.name,
          // TODO: make url dynamic, or retrieve from api call
          url: `https://outputfieldartworks.sfo3.digitaloceanspaces.com/${artistHandle}/${formData.file.name}`
        }

        spaces.putObject({
          Bucket: 'outputfieldartworks',
          Key: `${artistHandle}/${formData.file.name}`, // Specify folder and file name
          Body: fs.createReadStream(formData.file.path),
          ACL: 'public-read'
        }, async() => res.status(201).send(work))
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
