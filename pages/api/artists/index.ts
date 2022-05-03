import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const FILTERABLE_ARTIST_FIELDS = ['name', 'medium', 'location', 'handle', 'bio']
export const getArtists = () => {
  return prisma?.artist.findMany({
    include: {
      work: true,
      links: true
    },
  })
}
// FIXME: This is being called by /artists/[name] page
export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log('hitting /api/artists with: ', req.query, req.params)
  const { _page, _limit, _cursor, search, filters } = req.query
  if (req.method === 'GET') {
    try {
      const take = _limit && parseInt(_limit)
      const skip = _page && _limit && parseInt(_limit) * (parseInt(_page) - 1)
      const prismsQuery = {
        take,
        skip,
        include: {
          work: true,
          links: true,
        },
        where: {
          mediums: filters && JSON.parse(filters).length ? { hasSome: JSON.parse(filters) } : undefined,
          OR: search
            ? FILTERABLE_ARTIST_FIELDS.map((a) => ({
              [a]: { contains: search, mode: 'insensitive' },
            }))
            : undefined,
        },
        orderBy: {
          name: 'asc', // TODO: sort title
        },
      }
      console.log(JSON.stringify(prismsQuery, null, 2))
      const data = await prisma.artist.findMany(prismsQuery)

      if (!data) {
        return res.status(404)
      } else {
        res.status(200).json(data)
      }
    } catch (err) {
      res.status(405)
      console.log(err)
      res.end()
    }
  }
}
