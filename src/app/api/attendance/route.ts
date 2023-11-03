import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/_base";
import {
  CreateAttendanceReqDTO,
  CreateAttendanceResDTO,
} from "@/features/attendance/types/createAttendance.dto";
const { dailyAttendance } = prisma;

export async function POST(request: NextRequest) {
  const {
    userId,
    objectiveId,
    seolgiId,
    title,
    createdAt,
  }: CreateAttendanceReqDTO = await request.json();

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

  return NextResponse.json<CreateAttendanceResDTO>(
    { data: created },
    { status: 201 },
  );
}
