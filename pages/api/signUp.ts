import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'

export type UserCreateInputWithArtist = Prisma.UserCreateInput & Prisma.ArtistCreateWithoutUserInput & { nominatorId: number }

function createUserAndIncludeArtist(d: UserCreateInputWithArtist) {
  return prisma.user.create({
    data: {
      name: d.name,
      email: d.email,
      nominatedBy: {
        connect: { id: d.nominatorId }
      },
      artist: {
        create: {
          title: d.title,
          pronoun: d.pronoun,
          bio: d.bio,
          location: d.location,
          handle: d.handle,
          mediums: d.mediums,
          mediumsOfInterest: d.mediumsOfInterest,
          links: {
            createMany: {
              data: d.links as Prisma.LinkCreateManyArtistInput
            }
          },
        },
      },
    },
    select: {
      id: true,
      artist: {
        select: {
          id: true,
          handle: true
        }
      }
    }
  })
}

export type UserWithArtist = Prisma.PromiseReturnType<typeof createUserAndIncludeArtist>

// Create user in DB (as an Artist), along with artist's Works, and Links. Return artist handle
export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body)
    const userArgs = {
      name: req.body.name,
      Title: req.body.title,
      handle: req.body.handle,
      Pronouns: req.body.pronoun,
      Location: req.body.location,
      Mediums: req.body.mediums,
      'Mediums of Interest': req.body.mediumsOfInterest,
      links: req.body.links,
      Bio: req.body.bio,
      email: req.body.email,
      nominatorId: req.body.email,
    }
    try {
      const newUser: UserWithArtist = await createUserAndIncludeArtist(userArgs)        
      return res.status(200).json(newUser)
    } catch (error) {
      console.log(`/api failed to create user: ${error}`)
      throw error
    }
  } else {
    res.status(405)
    res.end()
  }
}