import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
){
  // if (req.method === 'POST') {
  // }
  const { name }: { name?: string } = req.query
  if (req.method === 'GET') {
    try {
      const artist = await prisma?.artist.findUnique({
        where: {
          handle: name
        },
        include: {
          work: true,
          links: true
        },
      })
      if (!artist) {
        return res.status(404)
      } else {
        res.status(200).json(artist)
      }
    } catch (err) {
      res.status(405)
      res.end()
    }
  }
}
