import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

const FILTERABLE_ARTIST_FIELDS = ['title', 'location', 'handle', 'bio']
export const getArtists = () => {
  return prisma?.artist.findMany({
    include: {
      user: true,
      work: true,
      links: true
    },
  })
}

export type ArtistsWithWorksAndLinks = Prisma.PromiseReturnType<typeof getArtists>


const findArtists = (page: string, limit: string, search: string, filters: any) => {
  const take: number = limit ? parseInt(limit) : 0
  const skip: number = (page && limit) ? parseInt(limit) * (parseInt(page) - 1) : 0
  // console.log(JSON.stringify(prismaQuery, null, 2))
  return prisma.artist.findMany({
    take,
    skip,
    include: {
      user: true,
      work: true,
      links: true,
    },
    where: {
      mediums: filters && JSON.parse(filters).length ? { hasSome: JSON.parse(filters) } : undefined,
      OR: search
        ? [
          ...FILTERABLE_ARTIST_FIELDS.map((a) => ({
            [a]: { contains: search, mode: 'insensitive' },
          })),
          {mediums: {
            has: search
          }},
          {user: {
            name: { contains: search, mode: 'insensitive' }
          }}
        ]
        : undefined,
    },
    // orderBy: {
    //   name: 'asc', // TODO: sort title
    // },
  })
}
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { _page, _limit, search, filters } = req.query
  if (req.method === 'GET') {
    try {
      const data = await findArtists(
        Array.isArray(_page) ? _page.join('') : _page,
        Array.isArray(_limit) ? _limit.join('') : _limit,
        Array.isArray(search) ? search.join('') : search,
        filters
      )
     
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
