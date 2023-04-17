import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

export const getArtistWithUserAndInviterAndLinks = (artistName: string) => {
  return prisma?.artist.findUnique({
    where: {
      handle: artistName
    },
    select: {
      bio: true,
      pronouns: true,
      handle: true,
      title: true,
      mediums: true,
      mediumsOfInterest: true,
      location: true,
      links: true,
      user: {
        select: {
          name: true,
          email: true,
          application: {
            select: {
              invitation: {
                select: {
                  inviter: {
                    select: {
                      name: true,
                      artist: {
                        select: {
                          handle: true
                        }
                      } 
                    }
                  }
                }
              }
            }
          },
        },
      },
    },
  })
}

export type ArtistWithInviterAndUserAndLinks = Prisma.PromiseReturnType<typeof getArtistWithUserAndInviterAndLinks>

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name }: { name?: string } = req.query
  if (req.method === 'GET') {
    try {
      const artist = await getArtistWithUserAndInviterAndLinks(name)
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
