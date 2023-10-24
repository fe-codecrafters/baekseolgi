import { DailyAttendance, Objective, PrismaClient } from "@prisma/client";
import {
  endOfMonth,
  endOfYear,
  isValid,
  parse,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/_base";
const { dailyAttendance, objective } = prisma;

/**
 * @swagger
 * /attendance/stat/year/{year}:
 *   get:
 *     summary: Get attendance stat for a specific year
 *     parameters:
 *       - name: year
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
  { params }: { params: { year: string; month: string } },
) {
  const { year, month } = params;
  console.log(year, month);

  if (!isValid(parse(year, "yyyy", new Date()))) {
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

  let uniqueObjective: Objective | null;
  let monthlyAttendanceCounts: number[];

  try {
    monthlyAttendanceCounts = await Promise.all(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
        const date = parse(`${year}-${month}`, "yyyy-MM", new Date());
        const startDate = startOfMonth(date);
        const endDate = endOfMonth(date);

        return dailyAttendance
          .aggregate({
            where: {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
              userId,
              objectiveId,
            },
            _count: true,
          })
          .then((res) => {
            return res._count;
          });
      }),
    );

    uniqueObjective = await objective.findUnique({
      where: {
        id: objectiveId,
      },
    });
  } catch (e) {
    console.error("/attendance/month/{year}/{month} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  if (!uniqueObjective || monthlyAttendanceCounts.length === 0) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      year: Number(year),
      objective: uniqueObjective.title,
      counts: monthlyAttendanceCounts,
    },
  });
}
