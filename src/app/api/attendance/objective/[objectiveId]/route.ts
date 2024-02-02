import { endOfMonth, isValid, parse, startOfMonth } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/_base";
import { GetMonthlyAttendanceResDTO } from "@/features/attendance/types/getAttendance.dto";
import { AttendanceWithSeolgi } from "@/types/dto";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
const { dailyAttendance, objective } = prisma;
const secret = process.env.NEXTAUTH_SECRET;

export async function GET(
  req: NextRequest,
  { params: { objectiveId } }: { params: { objectiveId: string } },
) {
  const session = await getServerSession();
  const token = await getToken({ req, secret });
  if (!session || !token) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  if (!Number(objectiveId)) {
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
  let objectiveIdNum = Number(objectiveId);
  // REF: https://docs.github.com/ko/rest/issues/issues?apiVersion=2022-11-28#list-issues-assigned-to-the-authenticated-user
  const sort = searchParams.get("sort")
    ? String(searchParams.get("sort"))
    : "id";
  const direction = searchParams.get("direction")
    ? String(searchParams.get("direction"))
    : "asc";

  if (!objectiveIdNum) {
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

      objectiveIdNum = current.id;
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

  let attendances: AttendanceWithSeolgi[];

  try {
    attendances = await dailyAttendance.findMany({
      where: {
        userId,
        objectiveId: objectiveIdNum,
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
        id: objectiveIdNum,
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
