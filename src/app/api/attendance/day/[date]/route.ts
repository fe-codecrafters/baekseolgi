import isValidDateString from "@/util/isValidDateString";
import { endOfDay, parse, startOfDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { DailyAttendance } from "@prisma/client";
import prisma from "@/app/api/_base";
import { GetDailyAttendanceResDTO } from "@/features/attendance/types/getAttendance.dto";
const { dailyAttendance } = prisma;

/**
 * @swagger
 * /attendance/day/{date}:
 *  get:
 *    summary: Get attendance for a specific day
 *    parameters:
 *      - name: date
 *        in: path
 *        description: Date in the format YYYY-MM-DD
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *      - name: userId
 *        in: query
 *        description: Optional user ID to filter by
 *        required: false
 *        schema:
 *          type: integer
 *      - name: objectiveId
 *        in: query
 *        description: Optional objectiveId ID to filter by
 *        required: false
 *        schema:
 *          type: integer
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
  { params }: { params: { date: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  console.log(params, searchParams);
  if (!isValidDateString(params.date)) {
    return NextResponse.json(
      { error: "Bad request: check your query param" },
      { status: 400 },
    );
  }

  const userId =
    searchParams.get("userId") !== null
      ? Number(searchParams.get("userId"))
      : undefined;
  const objectiveId = searchParams.get("objectiveId")
    ? Number(searchParams.get("objectiveId"))
    : undefined;
  const date = parse(params.date, "yyyy-MM-dd", new Date());
  const startDate = startOfDay(date);
  const endDate = endOfDay(date);
  console.log(date, startDate, endDate);

  let attendances: DailyAttendance[];

  try {
    attendances = await dailyAttendance.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        userId,
        objectiveId,
      },
      orderBy: {
        id: "asc",
      },
    });
  } catch (e) {
    console.error("/attendance/day/{date} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  console.log(attendances);

  if (attendances.length === 0) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json<GetDailyAttendanceResDTO>({ data: attendances });
}
