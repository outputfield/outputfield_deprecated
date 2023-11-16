import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

const FILTERABLE_ARTIST_FIELDS = ['title', 'location', 'handle', 'bio']

export const getArtistsWithUserAndWorkAndLinks = () => {
  return prisma?.artist.findMany({
    include: {
      mediums: true,
      mediumsOfInterest: true,
      user: true,
      links: true,
    },
  })
}

export type ArtistsWithUserAndWorkAndLinks = Prisma.PromiseReturnType<typeof getArtistsWithUserAndWorkAndLinks>

const findArtists = (page: string, limit: string, search: string, filters: string) => {
  const take: number = limit ? parseInt(limit) : 0
  const skip: number = (page && limit) ? parseInt(limit) * (parseInt(page) - 1) : 0
  const filtersParsed: string[] = JSON.parse(filters)
  return prisma.artist.findMany({
    take,
    skip,
    include: {
      mediums: true,
      mediumsOfInterest: true,
      user: true,
      links: true,
    },
    where: {
      mediums: filtersParsed && filtersParsed.length ?
        { some: { mediumName: { in: filtersParsed } } }
        : undefined,
      OR: search
        ? [
          ...FILTERABLE_ARTIST_FIELDS.map((a) => ({
            [a]: { contains: search, mode: 'insensitive' },
          })),
          {mediums: {
            some: { 
              mediumName: { contains: search }
            }
          }},
          {user: {
            name: { contains: search, mode: 'insensitive' }
          }}
        ]
        : undefined,
    },
    orderBy: {
      title: 'asc',
    },
  })
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { _page, _limit, search, filters } = req.query
  if (req.method === 'GET') {
    try {
      const data = await findArtists(
        Array.isArray(_page) ? _page.join('') : _page as string,
        Array.isArray(_limit) ? _limit.join('') : _limit as string,
        Array.isArray(search) ? search.join('') : search as string,
        filters as string
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
