import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
  console.log('/addUserWorks req.body... ', req.body)

  const {
    artistHandle, works
  } = JSON.parse(req.body)
  try {
    const result = await prisma.artist.update({
      where: {
        handle: artistHandle
      },
      data: {
        work: {
          create: works
        }
      }
    })
    return res.status(200).json(result)
  } catch (error) {
    console.log(`/api failed to create user: ${error}`)
    throw error
  }
}
