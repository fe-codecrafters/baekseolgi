import { NextRequest, NextResponse } from "next/server";
import { DailyAttendance } from "@prisma/client";
import { AttendanceWithSeolgi } from "@/types/dto";
import prisma from "@/app/api/_base";
import {
  UpdateAttendanceReqDTO,
  UpdateAttendanceResDTO,
} from "@/features/attendance/types/updateAttendance.dto";
import { GetOneAttendanceResDTO } from "@/features/attendance/types/getAttendance.dto";
const { dailyAttendance } = prisma;

/**
 * @swagger
 * /attendance/{id}:
 *  get:
 *    summary: Get attendance for a specific id
 *    parameters:
 *      - name: date
 *        in: path
 *        description: attendance ID
 *        required: true
 *        schema:
 *          type: int64
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Attendance'
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Not found
 */
export async function GET(_: never, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json(
      { error: "Bad request: check your path param" },
      { status: 400 },
    );
  }

  let attendance: AttendanceWithSeolgi | null;

  try {
    attendance = await dailyAttendance.findUnique({
      where: {
        id,
      },
      include: { Seolgi: true },
    });

    if (!attendance) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (e) {
    console.error("/attendance/{id} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json<GetOneAttendanceResDTO>({ data: attendance });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json(
      { error: "Bad request: check your path param" },
      { status: 400 },
    );
  }

  const { seolgiId, title, createdAt, status }: UpdateAttendanceReqDTO =
    await request.json();

  let updated: DailyAttendance;

  try {
    updated = await dailyAttendance.update({
      where: { id },
      data: {
        seolgiId,
        status,
        title,
        createdAt: createdAt ? new Date(createdAt) : undefined,
      },
    });
  } catch (e) {
    console.error("PUT /attendance/{id} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json<UpdateAttendanceResDTO>({ data: updated });
}

export async function DELETE(_: never, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json(
      { error: "Bad request: check your path param" },
      { status: 400 },
    );
  }

  try {
    await dailyAttendance.delete({
      where: { id },
    });
  } catch (e) {
    console.error("DELETE /attendance/{id} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      data: {
        id,
      },
    },
    { status: 200 },
  );
}
