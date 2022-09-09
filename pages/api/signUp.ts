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
    referrerId
  } = req.body
  try {
    // 1. Create user in DB (as an Artist), along with artist's Works, and Links. Return user's email
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
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
        id: true
      }
    })

    // 1.5. connect to referrerId 
    await prisma.user.update({
      where: {
        id: newUser.id
      },
      data: {
        artist: {
    |      connect: {
    |        id: referrerId
    |      },
        }
      }
    })
    
    
    // 2. (TODO:) Using, returned user obj, create connection to nominating user (referrerId)
    const { email: nomineeEmail } = user

    // TODO: THIS SHOULD RETURN userId as part of response
    return user

  } catch (error) {
    console.log(error)
    throw error
  }
}