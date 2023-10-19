import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const Seolgis = await prisma.seolgi.createMany({
    data: [
      {
        id: 1,
        name: "SeolgiIcon-test-white",
        color: "white",
      },
      {
        id: 2,
        name: "SeolgiIcon-test-blue",
        color: "blue",
      },
      {
        id: 3,
        name: "SeolgiIcon-test-pink",
        color: "pink",
      },
    ],
  });

  const testSeolgi = await prisma.user.upsert({
    where: { email: "kimploo@gmail.com" },
    update: {},
    create: {
      email: "kimploo@gmail.com",
      name: "테스트설기",
      Objective: {
        create: {
          id: 1,
          title: "100설기 매일 들어오기",
          description: "",
        },
      },
    },
  });

  const attendances = await prisma.dailyAttendance.createMany({
    data: [
      {
        title: "100설기 들어옴 - 1",
        status: "PRESENT",
        createdAt: new Date("2023-10-05T14:01:56"),
        updatedAt: new Date("2023-10-05T14:01:56"),
        seolgiId: 1,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 2",
        status: "PRESENT",
        createdAt: new Date("2023-10-06T15:01:56"),
        updatedAt: new Date("2023-10-07T14:01:56"),
        seolgiId: 1,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 3",
        status: "PRESENT",
        createdAt: new Date("2023-10-07T15:01:56"),
        updatedAt: new Date("2023-10-08T14:01:56"),
        seolgiId: 3,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 4",
        status: "PRESENT",
        createdAt: new Date("2023-10-08T15:01:56"),
        updatedAt: new Date("2023-10-09T14:01:56"),
        seolgiId: 2,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 5",
        status: "PRESENT",
        createdAt: new Date("2023-10-10T15:01:56"),
        updatedAt: new Date("2023-10-11T14:01:56"),
        seolgiId: 2,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
    ],
  });
  console.log({ Seolgis, testSeolgi, attendances });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });