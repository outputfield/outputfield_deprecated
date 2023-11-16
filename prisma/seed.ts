import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['error', 'warn'],
})

const applications = [
  {
    user: {
      id: '46c3ab79-e381-4913-87d3-291c9e4e955e',
    },
    application: {
      id: 'c0b8cf4a-29f0-4af9-a296-fba8d641dfd8',
      name: 'Jonny Riches',
      email: 'jr@gmail.com',
      statement: 'He is super funny and talented',
      requiredLink: 'johnnyriches.com',
    },
    artist: {
      id: '3139c61f-b80c-421b-bf85-bd6c940f5f16',
      title: 'baby painter',
      pronouns: 'he/him',
      handle: 'bacheesos',
      bio: 'He is super funny and talented',
      location: 'Chicago',
      mediums: ['paint'],
      mediumsOfInterest: ['paint', 'sculpture'],
      invitedById: 'fab2771f-010a-4035-a0c8-923846e8fde4'
    },
    links: [
      {
        id: '63a53b5c-c7c9-4731-adc4-5536832d0872',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/138399600-bronze-sculpture-of-children-in-the-square-eastern-europe-kiev.jpg',
        type: 'WORK',
      },
      {
        id: '52cd040d-9fc0-4c5b-a617-b64f06f45996',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/71w2KeTHRKL._AC_SL1200_.jpg',
        type: 'WORK',
      },
      {
        id: '7240fe5e-9eb8-4a8f-8e37-11d620b497c0',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/s-l1600.jpg',
        type: 'WORK',
      },
      {
        id: '8f7cdb43-ffcb-48c7-9c83-ecaeaacf9d17',
        title: 'web',
        url: 'https://art.com',
        type: 'OTHER',
      },
      {
        id: '4a23767c-c5c7-471c-92f1-6f48e5442acc',
        title: 'ig',
        url: 'https://instagram.com',
        type: 'OTHER',
      },
      {
        id: 'c5dda8e2-fba4-4cf2-8f9a-2160ae64133a',
        title: 'twitter',
        url: 'https://twitter.com',
        type: 'OTHER',
      },
    ],
  },
  {
    user: {
      id: '6b210835-d2b6-428e-a491-35237d72597f',
    },
    application: {
      id: 'd85dfd04-44be-4ee8-8e14-03c13ba1e85f',
      name: 'Ibrahim Hopkins',
      email: 'hopkins@email.com',
      statement:
        'He is an artist who documents jovial expression of life with sculptures of babies, who inspire him into incorporating himself at a young age.',
      requiredLink: 'ibrahimhopkins.com',
    },
    artist: {
      id: 'd5e33baf-7dc2-413d-8047-eebcb447b06e',
      pronouns: 'he/him',
      handle: 'hopkins_art',
      iconColor: '#ff00ff',
      title: 'sculptor',
      location: 'Chicago',
      bio: 'He is an artist who documents jovial expression of life with sculptures of babies, who inspire him into incorporating himself at a young age. A great sculptor, he is known to show great care and attention to detail from early childhood, and he is very willing and able to show his art and to create art he feels will benefit all. He also takes a hard look into his work and knows why it is so important.',
      mediums: ['tattoo'],
      mediumsOfInterest: ['tattoo', 'installation'],
      invitedById: 'fab2771f-010a-4035-a0c8-923846e8fde4'
    },
    links: [
      {
        id: 'd4606391-d7f3-4338-9ba7-9e6b717c1aae',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/138399600-bronze-sculpture-of-children-in-the-square-eastern-europe-kiev.jpg',
        type: 'WORK',
      },
      {
        id: 'd95e4bd1-3620-41d4-97bb-4d4364437e03',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/71w2KeTHRKL._AC_SL1200_.jpg',
        type: 'WORK',
      },
      {
        id: '61bcee6d-ca57-49d5-af4b-70f114997792',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/s-l1600.jpg',
        type: 'WORK',
      },
      {
        id: '06b30e0a-9833-4f1f-9b4d-00abcd9e363c',
        title: 'web',
        url: 'https://art.com',
        type: 'OTHER',
      },
      {
        id: '4002dcfe-3812-4315-b00d-f8cebcebe344',
        title: 'ig',
        url: 'https://instagram.com',
        type: 'OTHER',
      },
      {
        id: '2887d64c-d50f-4915-a72b-af2b9150197a',
        title: 'twitter',
        url: 'https://twitter.com',
        type: 'OTHER',
      },
    ],
  },
  {
    user: {
      id: 'da696156-3a18-4eef-b57a-59a879cb8a54',
    },
    application: {
      id: '75ffe4a6-b04a-4469-a18d-adebf72140d4',
      name: 'Sofia Wheeler',
      email: 'wheelerS@email.com',
      statement:
        'When we have some moments in our lives, we want to show people how important those moments are to us in certain ways.',
      requiredLink: 'sofiawheeler.com',
    },
    artist: {
      id: '9686185d-9aec-47b6-8266-b36515a08fbf',
      pronouns: 'she/her',
      handle: 'sofiawheeler',
      iconColor: '#ff0000',
      title: 'filmmaker',
      location: 'New York',
      bio: 'When we have some moments in our lives, we want to show people how important those moments are to us in certain ways. For us to do that, we need to be clear about what our experience of death is and what those experiences mean but also about us as family members. Photography should be a place where we feel that we have that connection and respect for the places that were lost. It does not mean we feel bad for what we have lost. It means that we truly are grateful for those in our lives we choose not to see or know about and for how we have affected them. It also means that we feel sorry for how our actions and lives affected them and we may do things that hurt or hurt in ways that hurt those of us.',
      mediums: ['photo / film', 'sculpture'],
      mediumsOfInterest: ['performance', 'design'],
      invitedById: 'fab2771f-010a-4035-a0c8-923846e8fde4'
    },
    links: [
      {
        id: 'ebd9c293-0b92-49f8-baee-b668b605353d',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/b77ae5e7-88e0-4b46-9baf-40998242c20f.jpg',
        type: 'WORK',
      },
      {
        id: 'a9fb3726-499f-43e9-8855-0b5055156c01',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Chernobyl---The-Aftermath-015.jpg',
        type: 'WORK',
      },
      {
        id: '963332fc-4a54-41eb-9f22-ba2526638031',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Untitled-3.png-1-520x400.jpg',
        type: 'WORK',
      },
      {
        id: '46c83eb8-c795-419b-8c7f-c6825b29e3e4',
        title: 'web',
        url: 'https://art.com',
        type: 'OTHER',
      },
      {
        id: 'f7373f2f-e32b-40f3-acb4-019ebc4bfa06',
        title: 'ig',
        url: 'https://instagram.com',
        type: 'OTHER',
      },
      {
        id: 'af61aef4-a118-4c7f-9d08-1db4361d605e',
        title: 'twitter',
        url: 'https://twitter.com',
        type: 'OTHER',
      },
    ],
  },
  {
    user: {
      id: '948445c6-4ae4-44d8-92a0-dd49939959b5'
    },
    application: {
      id: '07d35fd8-10ed-40ba-b723-d4603f129a82',
      name: 'Connor Garrison',
      email: 'conngar@email.com',
      statement:
        'My career for a few years spent designing for the web, but I have become more passionate since then.',
      requiredLink: 'conngarrison.com',
    },
    artist: {
      id: 'b7d20ddf-c975-437a-86f8-cf0f23242d42',
      pronouns: 'he/him',
      handle: 'cgarrison',
      iconColor: '#ffff00',
      title: 'designer',
      location: 'London',
      bio: 'My career for a few years spent designing for the web, but I have become more passionate since then. My recent projects included a simple 3D logo of The Ultimate Fizz, a simple 3D photo of a video game, a video that has been updated to the latest 2D rendering technology and a gorgeous 3D painting. These are just some of the great projects that I have worked with over the years. I have been lucky enough to play a great amount of role on one of my favorite websites, the one that takes me from being an awesome and creative.',
      mediums: ['design', '3d'],
      mediumsOfInterest: ['design', 'visual'],
      invitedById: 'fab2771f-010a-4035-a0c8-923846e8fde4'
    },
    links: [
      {
        id: 'ff5d5c7b-9560-47a3-8ea4-c7cc7a747803',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Shiny.jpg',
        type: 'WORK',
      },
      {
        id: '2dc47b9a-1736-470d-9d74-e430673183de',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/attachment_89914782.png',
        type: 'WORK',
      },
      {
        id: 'da0648cc-4b19-4ce2-8f31-126cdf4e320a',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/50-incredible-3d-logo-design-examples-for-inspiration-cover.png',
        type: 'WORK',
      },
      {
        id: 'f0b59f3c-c63b-46a4-867f-3a8123f70844',
        title: 'web',
        url: 'https://art.com',
        type: 'OTHER',
      },
      {
        id: '48f0c04c-f305-4f15-959d-1642573d0479',
        title: 'ig',
        url: 'https://instagram.com',
        type: 'OTHER',
      },
      {
        id: 'f9fa486a-d97e-4279-9a67-d7eb28d37224',
        title: 'twitter',
        url: 'https://twitter.com',
        type: 'OTHER',
      },
    ],
  },
  {
    user: {
      id: '37f29fe5-1b40-4cb3-b64e-c5791cdc0ef1'
    },
    application: {
      id: '6bda8da3-f019-4fd0-98e1-2253fbe34488',
      name: 'Selima Khalil',
      email: 'kelima@email.com',
      statement:
        'Selima Khalil is an artist and DIY designer working within the realm of contemporary embroidery.',
      requiredLink: 'selimakhalil.com',
    },
    artist: {
      id: 'a3d36665-150e-4a14-84a4-97595c6a3f50',
      pronouns: 'she/they',
      handle: 'selkhal00',
      iconColor: '#00ffff',
      title: 'bruha',
      location: 'Manchester',
      bio: 'Selima Khalil is an artist and DIY designer working within the realm of contemporary embroidery. She creates of one of a kind hand stitched artworks thoughtfully freed from the expectations of traditional Fine Art. Her work is inspired by classical art works that are often considered decorative or ornamental. She started her career with an eye to create new artworks as part of her project artfully. The result are a range of beautiful handcrafted pieces of contemporary artistic art. She hopes to have them to display at festivals and in schools.',
      mediums: ['textile'],
      mediumsOfInterest: ['photo / film', 'performance'],
      invitedById: 'fab2771f-010a-4035-a0c8-923846e8fde4'
    },
    links: [
      {
        id: '7e8e9cf0-a482-411d-9c19-e11394e31746',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/adipocere-03.jpg',
        type: 'WORK',
      },
      {
        id: 'f3554024-58ec-484d-8768-0fc044817ea5',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Trolleyed-525x525mm.jpg',
        type: 'WORK',
      },
      {
        id: 'a68c5cb5-6e57-4001-8abe-b9f75b958d16',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/50-incrhttps://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/960x0.jpg',
        type: 'WORK',
      },
      {
        id: '9c800ded-2ef5-4637-90f9-7fcc6bc015b6',
        title: 'web',
        url: 'https://art.com',
        type: 'OTHER',
      },
      {
        id: '23ceefc3-11d6-420f-8024-bde4fda9bda5',
        title: 'ig',
        url: 'https://instagram.com',
        type: 'OTHER',
      },
      {
        id: '0c52f139-f315-40e0-b821-f8aa287833f7',
        title: 'twitter',
        url: 'https://twitter.com',
        type: 'OTHER',
      },
    ],
  },
  {
    user: {
      id: 'a62cae2d-e3ae-4399-a647-f3386fd18c87'
    },
    application: {
      id: '258f58fd-60ca-4282-919f-e558bb343b24',
      name: 'Lily Liu',
      email: 'llll@email.com',
      statement:
        'Lily Liu creates vector designs associating loss and diaspora to the presence of the external environment, an element of which is a loss vector which is always negative.',
      requiredLink: 'lilyliu.com',
    },
    artist: {
      id: '544a16e5-fa93-479b-8c6d-cdcf49979916',
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
      invitedById: 'fab2771f-010a-4035-a0c8-923846e8fde4'
    },
    links: [
      {
        id: 'd1f3f288-040c-45d2-908a-41be52fc088e',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Backchannel-Uyghur-TikTok.jpg',
        type: 'WORK',
      },
      {
        id: '15df6874-4ab6-43c4-8346-65b00cce44a1',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/Hsu-AsianAmerican.jpg',
        type: 'WORK',
      },
      {
        id: 'f4233030-e07e-40b9-bd6b-e0e8429f8079',
        title: 'image',
        url: 'https://outputfieldartworks.sfo3.digitaloceanspaces.com/testing/gettyimages-165904997-1024x1024.jpg',
        type: 'WORK',
      },
      {
        id: '4386b809-b4fc-43da-a13d-2386994a086a',
        title: 'web',
        url: 'https://art.com',
        type: 'OTHER',
      },
      {
        id: 'd8caae7c-8d77-4167-b170-39ae3cddef28',
        title: 'ig',
        url: 'https://instagram.com',
        type: 'OTHER',
      },
      {
        id: '5ba7ba70-8cc2-4725-be12-aa5dc9414004',
        title: 'twitter',
        url: 'https://twitter.com',
        type: 'OTHER',
      },
    ],
  },
]
const main = async () => {
  const adminUser = await prisma.user.create({
    data: {
      id: '57f89cef-ffa4-41bb-a44a-0b7a06cf98b2',
      name: 'Ada Lovelace',
      email: 'lacelove@gmail.com',
    },
  })

  console.log(
    `successfully created admin user: ${adminUser.name}, id: ${adminUser.id}`
  )

  const adminArtist =  await prisma.artist.create({
    data: {
      id: '7f561890-9336-41e3-bb8b-73f4e518c9ae',
      title: 'admin artist',
      pronouns: 'she/her',
      handle: 'admin_artist',
      bio: 'I am an admin artist',
      location: 'Los Angeles, CA',
      mediums: {
        create: [
          {
            medium: {
              connectOrCreate: {
                where: {
                  name: 'paint',
                },
                create: {
                  name: 'paint',
                },
              }
            },
          }
        ]
      },
      mediumsOfInterest: {
        create: [
          {
            medium: {
              connectOrCreate: {
                where: {
                  name: 'paint',
                },
                create: {
                  name: 'paint',
                },
              }
            },
          },
          {
            medium: {
              connectOrCreate: {
                where: {
                  name: 'sculpture'
                },
                create: {
                  name: 'sculpture',
                },
              }
            },
          }
        ]
      },
      userId: adminUser.id,
    }
  })

  console.log(
    `successfully created admin artist: ${adminArtist.title}, id: ${adminArtist.id}`
  )

  const adminInvitable = await prisma.invitable.create({
    data: {
      id: 'fab2771f-010a-4035-a0c8-923846e8fde4',
      profileId: adminArtist.id,
      profileType: 'ARTIST',
    }
  })

  console.log(
    `successfully created admin invitable: ${adminInvitable.profileType}, id: ${adminInvitable.profileId}`
  )

  const adminInvite = await prisma.invitation.create({
    data: {
      id: '57dcc37a-41de-4b4c-9df0-b5dd3e971cdf',
      inviterUserId: adminUser.id,
      invitableId: adminInvitable.id,
    },
  })

  console.log(
    `successfully created admin invitation: ${adminInvite.id} for ${adminUser.id}`
  )

  // iterate over applications and create the test applications
  for (const applicant of applications) {
  // applications.forEach(async (applicant) => {
    console.log(`creating application: ${applicant.application.name}`)

    const app = await prisma.application.create({
      data: {
        ...applicant.application,
        invitationId: adminInvite.id,
      },
    })

    console.log(`successfully created application: ${app.name}`)

    const user = await prisma.user.create({
      data: {
        id: applicant.user.id,
        name: applicant.application.name,
        email: applicant.application.email,
        applicationId: app.id,
      },
    })

    console.log(`successfully created user: ${user.name}`)

    const artist = await prisma.artist.create({
      data: {
        ...applicant.artist,
        userId: user.id,
        links: {
          create: applicant.links,
        },
        mediums: {
          create: applicant.artist.mediums.map(m => (
            {
              medium: {
                connectOrCreate: {
                  where: {
                    name: m,
                  },
                  create: {
                    name: m,
                  },
                }
              },
            }
          ))
        },
        mediumsOfInterest: {
          create: applicant.artist.mediumsOfInterest.map(m => (
            {
              medium: {
                connectOrCreate: {
                  where: {
                    name: m,
                  },
                  create: {
                    name: m,
                  },
                }
              },
            }
          ))
        },
      },
    })

    console.log(`successfully created artist: ${artist.handle}`)
  // })
  }
}


main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('seeding done')
  })
  .catch(async (e) => {
    console.log('an error occured while seeding the database')
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

export {}
