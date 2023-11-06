import { Objective } from "@prisma/client";
import { endOfMonth, isValid, parse, startOfMonth } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/_base";
import { GetMonthlyAttendanceResDTO } from "@/features/attendance/types/getAttendance.dto";
import { AttendanceWithSeolgi } from "@/types/dto";
const { dailyAttendance, objective } = prisma;

/**
 * @swagger
 * /attendance/month/{year}/{month}:
 *   get:
 *     summary: Get attendance for a specific month
 *     parameters:
 *       - name: year
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: month
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
  { params: { year, month } }: { params: { year: string; month: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  console.log("api/month/[year]/[month]", year, month, searchParams);

  if (
    !isValid(parse(year, "yyyy", new Date())) &&
    !isValid(parse(month, "MM", new Date()))
  ) {
    return NextResponse.json(
      { error: "Bad request: check your param" },
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
  const date = parse(`${year}-${month}`, "yyyy-MM", new Date());
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);

  let attendances: AttendanceWithSeolgi[];
  let uniqueObjective: Objective | null;

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
      include: {
        Seolgi: true,
      },
    });

    uniqueObjective = await objective.findUnique({
      where: {
        id: objectiveId,
      },
    });
  } catch (e) {
    console.error("/attendance/month/{year}/{month} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  if (!uniqueObjective || attendances.length === 0) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json<GetMonthlyAttendanceResDTO>({
    data: {
      year: Number(year),
      month: Number(month),
      objective: uniqueObjective.title,
      attendance: attendances,
    },
  });
}
