import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'

export type UserCreateInputWithArtist = Prisma.UserCreateInput & Prisma.ArtistCreateWithoutUserInput & { nominatorId: number }

function createUserAndIncludeArtist(d: UserCreateInputWithArtist) {
  return prisma.user.create({
    data: {
      name: d.name,
      email: d.email,
      nominatorId: d.nominatorId,
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
    const userArgs = {
      name: req.body.Name,
      title: req.body.Title,
      handle: req.body.Handle,
      pronoun: req.body.Pronouns, // FIXME: should be 'pronouns' - fix in schema!
      location: req.body.Location,
      mediums: req.body.Mediums, // FIXME: parse this into String[]
      mediumsOfInterest: req.body['Mediums of Interest'], // FIXME: parse this into String[]
      links: req.body.links,
      bio: req.body.Bio, //FIXME: there's no field for this!
      email: req.body.email,
      nominatorId: req.body.nominatorId,
    }
    console.log(userArgs)
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