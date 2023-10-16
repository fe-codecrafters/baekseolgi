import { DailyAttendance, PrismaClient } from "@prisma/client";
import {
  endOfWeek,
  isValid,
  parse,
  parseISO,
  setISOWeek,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { NextRequest, NextResponse } from "next/server";
const { dailyAttendance } = new PrismaClient();

/**
 * @swagger
 * /attendance/week/{year}/{weekNumber}:
 *   get:
 *     summary: Get attendance for a specific week
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         schema:
 *          type: integer
 *       - name: weekNumber
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { year: string; weekNumber: string } },
) {
  // TODO: 진행중..
  console.log(params.year, params.weekNumber);
  const { year, weekNumber } = params;
  console.log(year, weekNumber);

  if (
    !isValid(parse(year, "yyyy", new Date())) &&
    !isValid(parse(weekNumber, "ww", new Date()))
  ) {
    return NextResponse.json(
      { error: "Bad request: check your param" },
      { status: 400 },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const userId =
    searchParams.get("userId") !== null
      ? Number(searchParams.get("userId"))
      : undefined;
  const objectiveId = searchParams.get("objectiveId")
    ? Number(searchParams.get("objectiveId"))
    : undefined;

  // Construct an ISO date string for the start of the year and set the time to noon to avoid time zone issues
  const startOfYearString = `${year}-01-01T12:00:00`;

  // Parse this date string into a Date object
  const dateAtNoon = parseISO(startOfYearString);

  console.log(dateAtNoon);
  // Set the ISO week to get a date within the desired week
  const dateInDesiredWeek = setISOWeek(dateAtNoon, parseInt(weekNumber, 10));
  console.log(dateInDesiredWeek);
  const startDate = startOfWeek(dateInDesiredWeek, { weekStartsOn: 1 }); // weekStartsOn: 월요일 시작
  const endDate = endOfWeek(dateInDesiredWeek, { weekStartsOn: 1 }); // weekStartsOn: 월요일 시작
  console.log(startDate, endDate);

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
    });
  } catch (e) {
    console.error("/attendance/week/{year}/{weekNumber} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  if (attendances.length === 0) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json({ data: "TODO" });
}
