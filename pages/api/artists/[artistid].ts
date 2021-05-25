import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
){
  // if (req.method === 'POST') {
  // }
  if (req.method === 'GET') {
    const artistid = parseInt(req.query.artistid)
    try {
      const artist = await prisma.artist.findUnique({
        where: {
          id: artistid
        },
      })
      if (!artist) {
        return res.status(404)
      } else {
        res.status(200).json(artist);
      }
    } catch (err) {
      res.status(405);
      res.end();
    }
  }
}
