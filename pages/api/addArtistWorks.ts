import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function addArtistWorks(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const {
      artistHandle, works
    } = JSON.parse(req.body)
    const result = await prisma.artist.update({
      where: {
        handle: artistHandle
      },
      data: {
        work: {
          create: works
        }
      }
    })
    return res.status(200).json(result)

  } else {
    res.status(405)
    res.end()
  }
}
