import { Prisma } from '@prisma/client'
import prisma from '../../../lib/prisma'

export const getAllMediums = () => {
  return prisma?.medium.findMany({
    select: {
      id: true,
      name: true,
    },
  })
}

export type Mediums = Prisma.PromiseReturnType<typeof getAllMediums>