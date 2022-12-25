import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

export const getArtistWithUserAndWorkAndLinks = (artistName: any) => {
  return prisma?.artist.findUnique({
    where: {
      handle: artistName
    },
    select: {
      user: {
        select: {
          name: true,
          email: true,
        }
      },
      pronouns: true,
      handle: true,
      title: true,
      mediums: true,
      mediumsOfInterest: true,
      location: true,
      work: true,
      links: true,
    },
  })
}

export type ArtistWithUserAndWorkAndLinks = Prisma.PromiseReturnType<typeof getArtistWithUserAndWorkAndLinks>

export const getArtistWithUserAndNominatedByAndWorkAndLinks = (name: string) => {
  return prisma?.artist.findUnique({
    where: {
      handle: name,
    },
    include: {
      user: {
        include: {
          nominatedBy: {
            include: {
              artist: {
                select: {
                  handle: true
                }
              }
            }
          },
        }
      },
      work: true,
      links: true,
    },
  })
}

export type ArtistWithUserAndNominatedByAndWorkAndLinks = Prisma.PromiseReturnType<typeof getArtistWithUserAndNominatedByAndWorkAndLinks>

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
){
  // if (req.method === 'POST') {
  // }
  const { name }: { name?: string } = req.query
  if (req.method === 'GET') {
    try {
      const artist = await getArtistWithUserAndWorkAndLinks(name)
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
