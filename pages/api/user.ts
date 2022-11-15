import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { getLoginSession } from '../../lib/auth'

export default async function user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // retrieve user from session
    try {
      let fetchedUser = null
      fetchedUser = await getLoginSession(req)
      if (!fetchedUser) {
        return res.status(404)
      } else {
        res.status(200).json({ user: fetchedUser })
      }
    } catch (error) {
      console.log(error)
    }
  }
  else if (req.method === 'POST') {
    console.log('user POST')
    // fetch user from db
    try {
      const { email } = req.body
      console.log('searching for user... ', email)
      const fetchedUser = await prisma.user.findUnique({
        where: { email },
      })
      res.send({
        'userExists': fetchedUser ? true : false
      })
    } catch (err) {
      console.log(err)
    }
  }
}
