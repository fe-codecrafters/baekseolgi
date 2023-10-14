import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { AttendanceWithSeolgi } from "@/types/response";
const { dailyAttendance } = new PrismaClient();

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
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log(params);
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

  return NextResponse.json({ data: attendance });
}

export async function POST() {
  return NextResponse.json({ data: "Health Check" });
}

export async function PUT() {
  return NextResponse.json({ data: "Health Check" });
}

export async function DELETE() {
  return NextResponse.json({ data: "Health Check" });
}
