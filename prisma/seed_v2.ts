import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

const main = async () => {
  // create admin user
  // use admin id to generate invitation

  // create application x num of test users (using invitation id)

  // create application status row for each test user
  // create user row for each test user
  // create artist row for each test user
  // create work
  // create link

  const adminUser = await prisma.user.create({
    data: {
      name: "Ada Lovelace",
      email: "lacelove@gmaiil.com",
    },
  });
  console.log(
    `successfully created admin user: ${adminUser.name}, id: ${adminUser.id}`
  );

  const adminInvite = await prisma.invitation.create({
    data: {
      inviterId: {
        connect: { id: adminUser.id },
      },
    },
  });
  console.log(`successfully created admin invitation: ${adminInvite.id}`);

  const adminInviteId = adminInvite.id;

  // iterate over applications and create the test applications
  applications.forEach(async (application) => {
    console.log(`creating application: ${application}`);

    const app = await prisma.application.create({
      data: {
        ...application,
        invitationId: { connect: { id: adminInviteId } },
      },
    });

    console.log(`successfully created application: ${application.name}`);

    const user = await prisma.user.create({
      data: {
        name: application.name,
        email: application.email,
        applicationId: { connect: { id: app.id } },
      },
    });

    const artist = await prisma.artist.create({
      // TODO: add artist data
    });
  });
};

const applications = [
  {
    name: "Jonny Riches",
    email: "jr@gmail.com",
    statement: "He is super funny and talented",
    requiredLink: "johnnyriches.com",
  },
  {
    name: "Ibrahim Hopkins",
    email: "hopkins@email.com",
    statement:
      "He is an artist who documents jovial expression of life with sculptures of babies, who inspire him into incorporating himself at a young age.",
    requiredLink: "ibrahimhopkins.com",
  },
  {
    name: "Sofia Wheeler",
    email: "wheelerS@email.com",
    statement:
      "When we have some moments in our lives, we want to show people how important those moments are to us in certain ways.",
    requiredLink: "sofiawheeler.com",
  },
  {
    name: "Connor Garrison",
    email: "conngar@email.com",
    statement:
      "My career for a few years spent designing for the web, but I have become more passionate since then.",
    requiredLink: "conngarrison.com",
  },
  {
    name: "Selima Khalil",
    email: "kelima@email.com",
    statement:
      "Selima Khalil is an artist and DIY designer working within the realm of contemporary embroidery.",
    requiredLink: "selimakhalil.com",
  },
  {
    name: "Lily Liu",
    email: "llll@email.com",
    statement:
      "Lily Liu creates vector designs associating loss and diaspora to the presence of the external environment, an element of which is a loss vector which is always negative.",
    requiredLink: "lilyliu.com",
  },
];

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("seeding done");
  })
  .catch(async (e) => {
    console.log("an error occured while seeding the database");
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export {};
