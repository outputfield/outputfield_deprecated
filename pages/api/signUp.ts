import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)

  const {
    Name: name,
    Title: title,
    Handle: handle,
    Pronouns: pronoun,
    Location: location,
    Mediums: mediums,
    'Mediums of Interest': mediumsOfInterest,
    links,
    Bio: bio, 
    email,
    nominatorId,
  } = req.body
  try {
    // 1. Create user in DB (as an Artist), along with artist's Works, and Links. Return user's email
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        nominatedBy: {
          connect: { id: nominatorId }
        },
        artist: {
          create: {
            title,
            pronoun,
            bio,
            location,
            handle,
            mediums,
            mediumsOfInterest,
            links: {
              createMany: {
                data: links
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
    
    return res.status(200).json(newUser)
  } catch (error) {
    console.log(`/api failed to create user: ${error}`)
    throw error
  }
}