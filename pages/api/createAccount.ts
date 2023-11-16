import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'

export type UserCreateInputWithArtist = Prisma.UserCreateInput & Prisma.ArtistCreateWithoutUserInput

function createUserAndIncludeArtist(d: UserCreateInputWithArtist) {
  return prisma.user.create({
    data: {
      id: d.id,
      name: d.name,
      email: d.email,
      artist: {
        create: {
          title: d.title,
          pronouns: d.pronouns,
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
        } as Prisma.ArtistCreateInput,
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
    try {
      const {
        id,
        name,
        title,
        handle,
        pronouns,
        location,
        mediums,
        mediumsOfInterest,
        links,
        bio,
        email,
      } = req.body
      const newUser: UserWithArtist = await createUserAndIncludeArtist({
        id,
        name,
        title,
        handle,
        pronouns,
        location,
        mediums,
        mediumsOfInterest,
        links,
        bio,
        email,
      })
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