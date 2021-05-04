import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
var bcrypt = require('bcryptjs');

// POST /api/user
export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
){
  const prisma = new PrismaClient()

  const emailExists = await prisma.user.findUnique({
    where: {email: req.body.email},
  })
  const usernameExists = await prisma.user.findUnique({
    where: {name: req.body.username},
  })
  if (usernameExists) {
    console.log('username exists.')
  } else if (emailExists) {
    console.log('email exists.')
  } else {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      const result = await prisma.user.create({
        data: {
          name: req.body.username,
          email: req.body.email,
          password: hash
        }})
    });
  }
}
