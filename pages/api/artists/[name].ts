import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

export const getArtistByHandle = (artistHandle: string) => {
  return prisma?.artist.findUnique({
    where: {
      handle: artistHandle
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
      invitedBy: {
        select: {
          profileType: true,
          profileId: true 
        }
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })
}

export type ArtistWithUser = Prisma.PromiseReturnType<typeof getArtistByHandle>

// type PrismaModel = Prisma.ArtistDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined> 
// | Prisma.VenueDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
export const getArtistInviter = (profileType: string | undefined, profileId: string) => {
  let profileTable = ''
  switch (profileType) {
  case 'ARTIST':
    profileTable = 'artist'
    break
    // ...
  default:
    break
  }

  console.log(profileType, profileId)

  if (!profileTable) {
    // throw new Error('profileType not recognized')
    return {}
  } else {
    return (prisma as Record<string, any>)[`${profileTable}`].findUnique({
      where: {
        id: profileId
      },
      select: {
        handle: true,
        user: {
          select: {
            name: true
          }
        }
      }
    })
  }
}
export type Inviter = Prisma.PromiseReturnType<typeof getArtistInviter>

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { handle='' }: { handle?: string } = req.query
  if (req.method === 'GET') {
    try {
      const artist = await getArtistByHandle(handle)
      // FIXME:
      const inviter = await getArtistInviter(artist?.invitedBy?.profileType, artist?.invitedBy?.profileId)
      if (!artist) {
        return res.status(404)
      } else {
        res.status(200).json({ artist, inviter })
      }
    } catch (err) {
      res.status(405)
      res.end()
    }
  }
}
