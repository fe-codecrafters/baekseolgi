import { NextRequest, NextResponse } from "next/server";
import { Objective } from "@prisma/client";
import prisma from "@/app/api/_base";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;
const { objective } = prisma;

export async function _GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession();
  const token = await getToken({ req, secret });
  if (!session || !token) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const id = Number(params.id);
  if (!id) {
    return NextResponse.json(
      { error: "Bad request: check your path param" },
      { status: 400 },
    );
  }

  let newObjective: Objective | null;

  try {
    newObjective = await objective.findUnique({
      where: {
        id,
      },
    });

    if (!newObjective) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    if (newObjective.userId !== Number(token.userId)) {
      console.log(newObjective.userId, Number(token.userId));
      console.error(
        req.nextUrl.pathname,
        "Objective가 User의 소유가 아닙니다.",
      );
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }
  } catch (e) {
    console.error("/objective/{id} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({ data: newObjective });
}
