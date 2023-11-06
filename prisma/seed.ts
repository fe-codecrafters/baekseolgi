import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const Seolgis = await prisma.seolgi.createMany({
    data: [
      {
        id: 1,
        name: "SeolgiIcon-test-white",
        color: "white",
        bgFill: "#F3F3F3",
        blushFill: "#F3F3F3",
      },
      {
        id: 2,
        name: "SeolgiIcon-test-blue",
        color: "blue",
        bgFill: "#D5FBF3",
        blushFill: "#fff",
      },
      {
        id: 3,
        name: "SeolgiIcon-test-pink",
        color: "pink",
        bgFill: "#FFE3E3",
        blushFill: "#FFF",
      },
      {
        id: 4,
        name: "SeolgiIcon-test-yellow",
        color: "yellow",
        bgFill: "#FEF2DA",
        blushFill: "#FFF",
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
        title: "100설기 들어옴 - 9월 - 1",
        status: "PRESENT",
        createdAt: new Date("2023-09-05T14:01:56"),
        updatedAt: new Date("2023-09-05T14:01:56"),
        seolgiId: 1,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 9월 - 2",
        status: "PRESENT",
        createdAt: new Date("2023-09-06T15:01:56"),
        updatedAt: new Date("2023-09-07T14:01:56"),
        seolgiId: 1,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 9월 - 3",
        status: "PRESENT",
        createdAt: new Date("2023-09-07T15:01:56"),
        updatedAt: new Date("2023-09-08T14:01:56"),
        seolgiId: 3,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 9월 - 4",
        status: "PRESENT",
        createdAt: new Date("2023-09-08T15:01:56"),
        updatedAt: new Date("2023-09-09T14:01:56"),
        seolgiId: 2,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 9월 - 5",
        status: "PRESENT",
        createdAt: new Date("2023-09-10T15:01:56"),
        updatedAt: new Date("2023-09-11T14:01:56"),
        seolgiId: 2,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
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
      {
        title: "100설기 들어옴 - 6",
        status: "PRESENT",
        createdAt: new Date("2023-10-22T15:01:56"),
        updatedAt: new Date("2023-10-23T14:01:56"),
        seolgiId: 2,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 11월 - 0",
        status: "PRESENT",
        createdAt: new Date("2023-11-03T09:01:56"),
        updatedAt: new Date("2023-11-04T14:01:56"),
        seolgiId: 1,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 11월 - 1",
        status: "PRESENT",
        createdAt: new Date("2023-11-05T14:01:56"),
        updatedAt: new Date("2023-11-05T14:01:56"),
        seolgiId: 1,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 11월 - 2",
        status: "PRESENT",
        createdAt: new Date("2023-11-06T15:01:56"),
        updatedAt: new Date("2023-11-07T14:01:56"),
        seolgiId: 1,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 11월 - 3",
        status: "PRESENT",
        createdAt: new Date("2023-11-07T15:01:56"),
        updatedAt: new Date("2023-11-08T14:01:56"),
        seolgiId: 3,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 11월 - 4",
        status: "PRESENT",
        createdAt: new Date("2023-11-08T15:01:56"),
        updatedAt: new Date("2023-11-09T14:01:56"),
        seolgiId: 2,
        objectiveId: 1,
        userId: testSeolgi.id,
      },
      {
        title: "100설기 들어옴 - 11월 - 5",
        status: "PRESENT",
        createdAt: new Date("2023-11-10T15:01:56"),
        updatedAt: new Date("2023-11-11T14:01:56"),
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
