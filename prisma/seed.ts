import { PrismaClient } from '@prisma/client'
// const bcrypt = require('bcryptjs')
// import { PrismaClient } from '../prisma/generated/prisma-client-js'

const prisma = new PrismaClient({
  log: ['error', 'warn'],
})

async function main() {
  const user_0 = await prisma.user.create({
    data: {
      name: 'Jonny',
      email: 'Riches',
      artist: {
        create: {
          title: 'baby painter',
          pronouns: 'he/him',
          handle: 'bacheesos',
          bio: 'He is super funny and talented',
          location: 'Chicago',
          mediums: ['paint'],
          mediumsOfInterest: ['paint', 'sculpture'],
          work: {
            create: [
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/138399600-bronze-sculpture-of-children-in-the-square-eastern-europe-kiev.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/71w2KeTHRKL._AC_SL1200_.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/s-l1600.jpg',
              },
            ],
          },
          links: {
            create: [
              {
                title: 'web',
                url: 'https://art.com',
              },
              {
                title: 'ig',
                url: 'https://instagram.com',
              },
              {
                title: 'twitter',
                url: 'https://twitter.com',
              },
            ],
          },
        },
      },
    },
  })

  const user_1 = await prisma.user.create({
    data: {
      name: 'Ibrahim Hopkins',
      email: 'hopkins@email.com',
      nominatedBy: {
        connect: { id: user_0.id }
      },
      artist: {
        create: {
          pronouns: 'he/him',
          handle: 'hopkins_art',
          iconColor: '#ff00ff',
          title: 'sculptor',
          location: 'Chicago',
          bio: 'He is an artist who documents jovial expression of life with sculptures of babies, who inspire him into incorporating himself at a young age. A great sculptor, he is known to show great care and attention to detail from early childhood, and he is very willing and able to show his art and to create art he feels will benefit all. He also takes a hard look into his work and knows why it is so important.',
          mediums: ['tattoo'],
          mediumsOfInterest: ['tattoo', 'installation'],
          
          work: {
            create: [
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/138399600-bronze-sculpture-of-children-in-the-square-eastern-europe-kiev.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/71w2KeTHRKL._AC_SL1200_.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/s-l1600.jpg',
              },
            ],
          },
          links: {
            create: [
              {
                title: 'web',
                url: 'https://art.com',
              },
              {
                title: 'ig',
                url: 'https://instagram.com',
              },
              {
                title: 'twitter',
                url: 'https://twitter.com',
              },
            ],
          },
        },
      },
    },
  })

  const user_2 = await prisma.user.create({
    data: {
      name: 'Sofia Wheeler',
      email: 'wheelerS@email.com',
      nominatedBy: {
        connect: { id: user_1.id }
      },
      artist: {
        create: {
          pronouns: 'she/her',
          handle: 'sofiawheeler',
          iconColor: '#ff0000',
          title: 'filmmaker',
          location: 'New York',
          bio: 'When we have some moments in our lives, we want to show people how important those moments are to us in certain ways. For us to do that, we need to be clear about what our experience of death is and what those experiences mean but also about us as family members. Photography should be a place where we feel that we have that connection and respect for the places that were lost. It does not mean we feel bad for what we have lost. It means that we truly are grateful for those in our lives we choose not to see or know about and for how we have affected them. It also means that we feel sorry for how our actions and lives affected them and we may do things that hurt or hurt in ways that hurt those of us.',
          mediums: ['photo / film', 'sculpture'],
          mediumsOfInterest: ['performance', 'design'],
          work: {
            create: [
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/b77ae5e7-88e0-4b46-9baf-40998242c20f.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Chernobyl---The-Aftermath-015.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Untitled-3.png-1-520x400.jpg',
              },
            ],
          },
          links: {
            create: [
              {
                title: 'web',
                url: 'https://art.com',
              },
              {
                title: 'ig',
                url: 'https://instagram.com',
              },
              {
                title: 'twitter',
                url: 'https://twitter.com',
              },
            ],
          },
        },
      },
    },
  })

  const user_3 = await prisma.user.create({
    data: {
      name: 'Connor Garrison',
      email: 'conngar@email.com',
      nominatedBy: {
        connect: { id: user_2.id }
      },
      artist: {
        create: {
          pronouns: 'he/him',
          handle: 'cgarrison',
          iconColor: '#ffff00',
          title: 'designer',
          location: 'London',
          bio: 'My career for a few years spent designing for the web, but I have become more passionate since then. My recent projects included a simple 3D logo of The Ultimate Fizz, a simple 3D photo of a video game, a video that has been updated to the latest 2D rendering technology and a gorgeous 3D painting. These are just some of the great projects that I have worked with over the years. I have been lucky enough to play a great amount of role on one of my favorite websites, the one that takes me from being an awesome and creative.',
          mediums: ['design', '3d'],
          mediumsOfInterest: ['design', 'visual'],
          work: {
            create: [
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Shiny.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/attachment_89914782.png',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/50-incredible-3d-logo-design-examples-for-inspiration-cover.png',
              },
            ],
          },
          links: {
            create: [
              {
                title: 'web',
                url: 'https://art.com',
              },
              {
                title: 'ig',
                url: 'https://instagram.com',
              },
              {
                title: 'twitter',
                url: 'https://twitter.com',
              },
            ],
          },
        },
      },
    },
  })

  const user_4 = await prisma.user.create({
    data: {
      name: 'Selima Khalil',
      email: 'kelima@email.com',
      nominatedBy: {
        connect: { id: user_3.id }
      },
      artist: {
        create: {
          pronouns: 'she/they',
          handle: 'selkhal00',
          iconColor: '#00ffff',
          title: 'bruha',
          location: 'Manchester',
          bio: 'Selima Khalil is an artist and DIY designer working within the realm of contemporary embroidery. She creates of one of a kind hand stitched artworks thoughtfully freed from the expectations of traditional Fine Art. Her work is inspired by classical art works that are often considered decorative or ornamental. She started her career with an eye to create new artworks as part of her project artfully. The result are a range of beautiful handcrafted pieces of contemporary artistic art. She hopes to have them to display at festivals and in schools.',
          mediums: ['textile'],
          mediumsOfInterest: ['photo / film', 'performance'],
          work: {
            create: [
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/adipocere-03.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Trolleyed-525x525mm.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/50-incrhttps://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/960x0.jpg',
              },
            ],
          },
          links: {
            create: [
              {
                title: 'web',
                url: 'https://art.com',
              },
              {
                title: 'ig',
                url: 'https://instagram.com',
              },
              {
                title: 'twitter',
                url: 'https://twitter.com',
              },
            ],
          },
        },
      },
    },
  })

  const user_5 = await prisma.user.create({
    data: {
      name: 'Lily Liu',
      email: 'llll@email.com',
      nominatedBy: {
        connect: { id: user_4.id }
      },
      artist: {
        create: {
          pronouns: 'she/her',
          handle: 'llllllll',
          iconColor: '#990000',
          title: 'designer',
          location: 'Los Angeles',
          bio: 'Lily Liu creates vector designs associating loss and diaspora to the presence of the external environment, an element of which is a loss vector which is always negative. In the absence of further proof that this concept has any foundation there is no possible way of verifying it or any other aspects of its existence. The design uses a method consisting of a group of three nodes on a graph. The nodes connect the three-dimensional structure of one node by a means similar to the one on the right. These nodes are called nodes of the design, while the three-dimensional representation of that node can be used to visualize changes in the structure in the environment.',
          mediums: ['design', 'photo / film'],
          mediumsOfInterest: [
            'tattoo',
            'movement',
            'performance',
            '3d',
            'design',
            'sound',
          ],
          work: {
            create: [
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Backchannel-Uyghur-TikTok.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Hsu-AsianAmerican.jpg',
              },
              {
                title: 'image',
                url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/gettyimages-165904997-1024x1024.jpg',
              },
            ],
          },
          links: {
            create: [
              {
                title: 'web',
                url: 'https://art.com',
              },
              {
                title: 'ig',
                url: 'https://instagram.com',
              },
              {
                title: 'twitter',
                url: 'https://twitter.com',
              },
            ],
          },
        },
      },
    },
  })
}

main()
  .catch((event: Error) => {
    console.error(event)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export {}