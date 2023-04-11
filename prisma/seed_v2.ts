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

  const adminInvite = await prisma.invitation.create({
    data: {
      inviterId: {
        connect: { id: adminUser.id }, // TODO: continue here
      },
    },
  });

  // iterate over applications and create the test applications
};

const testInvitationId = "4de8cff0-3f05-4755-b4c9-64753507fe48";
const applications = [
  {
    name: "Jonny Riches",
    statement: "jr@gmail.com",
    email: "jr@gmail.com",
    requiredLink: "",
    invitationId: "",
  },
];
const generateApplications = () => {};

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
