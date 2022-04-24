import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export const getArtists = () => {
  return prisma?.artist.findMany({
    include: {
      work: true,
      links: true
    },
  })
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
){
  // if (req.method === 'POST') {
  // }
  if (req.method === 'GET') {
    try {
      const data = await prisma?.artist.findMany({
        include: {
          work: true,
          links: true
        },
      })
      if (!data) {
        return res.status(404)
      } else {
        res.status(200).json(data)
      }
    } catch (err) {
      res.status(405)
      res.end()
    }
  }
}
