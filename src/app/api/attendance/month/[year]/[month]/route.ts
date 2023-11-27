import { Objective } from "@prisma/client";
import { endOfMonth, isValid, parse, startOfMonth } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/_base";
import { GetMonthlyAttendanceResDTO } from "@/features/attendance/types/getAttendance.dto";
import { AttendanceWithSeolgi } from "@/types/dto";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
const { dailyAttendance, objective } = prisma;
const secret = process.env.NEXTAUTH_SECRET;

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
  req: NextRequest,
  { params: { year, month } }: { params: { year: string; month: string } },
) {
  const session = await getServerSession();
  const token = await getToken({ req, secret });
  if (!session || !token) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  if (
    !isValid(parse(year, "yyyy", new Date())) &&
    !isValid(parse(month, "MM", new Date()))
  ) {
    return NextResponse.json(
      { error: "Bad request: check your param" },
      { status: 400 },
    );
  }

  // 파라미터가 있나? -> 토큰에 있나? -> falsy
  const searchParams = req.nextUrl.searchParams;
  const userId =
    searchParams.get("userId") !== null
      ? Number(searchParams.get("userId"))
      : Number(token.userId);
  let objectiveId = searchParams.get("objectiveId")
    ? Number(searchParams.get("objectiveId"))
    : Number(token.activeObjectiveId);
  // REF: https://docs.github.com/ko/rest/issues/issues?apiVersion=2022-11-28#list-issues-assigned-to-the-authenticated-user
  const sort = searchParams.get("sort")
    ? String(searchParams.get("sort"))
    : "id";
  const direction = searchParams.get("direction")
    ? String(searchParams.get("direction"))
    : "asc";

  if (!objectiveId) {
    try {
      const current = await objective.findFirstOrThrow({
        where: {
          userId,
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      objectiveId = current.id;
    } catch (e) {
      console.error(
        req.nextUrl.pathname,
        "currentObjective findFirst Error:",
        e,
      );
    }
  }

  if (!userId) {
    return NextResponse.json(
      { error: "Bad request: check your param" },
      { status: 400 },
    );
  }

  const date = parse(`${year}-${month}`, "yyyy-MM", new Date());
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);

  let attendances: AttendanceWithSeolgi[];

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
        [sort]: direction,
      },
      include: {
        Seolgi: true,
      },
    });
  } catch (e) {
    console.error("/attendance/month/{year}/{month} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  const uniqueObjective = await objective
    .findUnique({
      where: {
        id: objectiveId,
      },
    })
    .catch((e) => console.error(req.nextUrl.href, "No Unique Objective", e));

  // if (!uniqueObjective) {
  //   console.error("Objective Id를 확인해 주세요.");
  //   return NextResponse.json({ error: "Not Found" }, { status: 404 });
  // }

  return NextResponse.json<GetMonthlyAttendanceResDTO>({
    data: {
      year: Number(year),
      month: Number(month),
      objective: uniqueObjective?.title,
      objectiveId: uniqueObjective?.id,
      attendance: attendances,
    },
  });
}
