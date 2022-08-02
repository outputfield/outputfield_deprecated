import { prisma } from '@prisma/client'

export async function signUp({
  data: {
    name, email, title, pronoun, bio, location, handle, mediums, mediumsOfInterest
  }, referrerId }) 
{
  try {
    // 1. Create user in DB (as an Artist), along with artist's Works, and Links. Return user's email
    const user = await prisma.user.create({
      data: {
        name,
        email,
        artist: prisma.artist.create({
          title, pronoun, bio, location, handle, mediums, mediumsOfInterest,
          work: {
            createMany: {
              data: [{}]
            }
          },
          links: {
            createMany: {
              data: [{}]
            }
          },
          referredBy: { connect: { referrerId } }
        }),
      },
      select: {
        email: true
      }
    })
    
    // 2. (TODO:) Using, returned user obj, create connection to nominating user (referrerId)
    const { email: nomineeEmail } = user

    return user

  } catch (error) {
    console.log(error)
  }
}