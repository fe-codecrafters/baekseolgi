import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/_base";
const { dailyAttendance } = prisma;

export async function POST(request: NextRequest) {
  // userId, objectiveId, seogiId, title, createdAt
  // TODO: need type
  const { userId, objectiveId, seolgiId, title, createdAt } =
    (await request.json()) as {
      userId: number;
      objectiveId: number;
      seolgiId: number;
      title: string;
      createdAt: string;
    };

  let created;
  try {
    created = await dailyAttendance.create({
      data: {
        userId,
        objectiveId,
        seolgiId,
        status: "PRESENT",
        title,
        createdAt: new Date(createdAt),
      },
    });
  } catch (e) {
    console.error("POST /attendance/{id} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({ data: created }, { status: 201 });
}
