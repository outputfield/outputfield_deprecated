import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
){
  const prisma = new PrismaClient()
  const result = await prisma.user.create({
    data: {
      name: req.body.username,
      email: req.body.email,
      password: req.body.password
    },
  })
  res.json(result)
}
