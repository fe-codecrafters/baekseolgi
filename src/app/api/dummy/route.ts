import { AttendanceWithSeolgi } from "@/types/response";
import { NextResponse } from "next/server";

type dummyResponse = { 
  year: number, 
  month: number, 
  objective: string,
  attendance: AttendanceWithSeolgi[] }

export async function GET() {
  return NextResponse.json<{ data: dummyResponse[]
  }>({
    data: [
      {
        year: 2023,
        month: 6,
        objective: "100설기 Test",
        attendance: [],
      },
      {
        year: 2023,
        month: 7,
        objective: "100설기 Test",
        attendance: [],
      },
      {
        year: 2023,
        month: 8,
        objective: "100설기 Test",
        attendance: [],
      },
      {
        year: 2023,
        month: 10,
        objective: "100설기 Version 1 만들기",
        attendance: [
          {
            id: 1,
            title: "100설기 들어옴",
            status: "PRESENT",
            createdAt: new Date("2023-10-05T14:01:56"),
            updatedAt: new Date("2023-10-05T14:01:56"),
            objectiveId: 1,
            Seolgi: {
              id: 1,
              name: "SeolgiIcon",
              createdAt: new Date("2023-10-05T14:01:56"),
              color: "white",
            },
            userId: 1,
            seolgiId: 1
          },
          {
            id: 4,
            title: "100설기 들어옴",
            status: "PRESENT",
            createdAt: new Date("2023-10-05T15:01:56"),
            updatedAt: new Date("2023-10-06T14:01:56"),
            objectiveId: 1,
            Seolgi: {
              id: 1,
              name: "SeolgiIcon",
              createdAt: new Date("2023-10-05T14:01:56"),
              color: "white",
            },
            userId: 1,
            seolgiId: 1
          },
          {
            id: 7,
            title: "100설기 들어옴",
            status: "PRESENT",
            createdAt: new Date("2023-10-07T15:01:56"),
            updatedAt: new Date("2023-10-08T14:01:56"),
            objectiveId: 1,
            Seolgi: {
              id: 2,
              name: "SeolgiIcon",
              createdAt: new Date("2023-10-06T14:01:56"),
              color: "pink",
            },
            userId: 1,
            seolgiId: 2
          },
          {
            id: 20,
            title: "100설기 들어옴",
            status: "PRESENT",
            createdAt: new Date("2023-10-08T15:01:56"),
            updatedAt: new Date("2023-10-09T14:01:56"),
            objectiveId: 1,
            Seolgi: {
              id: 3,
              name: "SeolgiIcon",
              createdAt: new Date("2023-10-07T14:01:56"),
              color: "blue",
            },
            userId: 1,
            seolgiId: 3
          },
          {
            id: 25,
            title: "100설기 들어옴",
            status: "PRESENT",
            createdAt: new Date("2023-10-08T15:01:56"),
            updatedAt: new Date("2023-10-09T14:01:56"),
            objectiveId: 1,
            Seolgi: {
              id: 4,
              name: "SeolgiIcon",
              createdAt: new Date("2023-10-07T14:01:56"),
              color: "yellow",
            },
            userId: 1,
            seolgiId: 4
          },
        ],
      },
    ],
  });
}
