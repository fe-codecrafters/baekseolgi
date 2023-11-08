import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/_base";
import {
  CreateObjectiveReqDTO,
  CreateObjectiveResDTO,
} from "@/features/objective/types/createObjective.dto";
const { objective } = prisma;

export async function POST(request: NextRequest) {
  const {
    userId,
    title,
    createdAt,
    description,
    finishedAt,
    failedAt,
  }: CreateObjectiveReqDTO = await request.json();

  let created;
  try {
    created = await objective.create({
      data: {
        userId,
        title,
        description,
        createdAt: new Date(createdAt),
        finishedAt,
        failedAt,
      },
    });
  } catch (e) {
    console.error("POST /objective Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json<CreateObjectiveResDTO>(
    { data: created },
    { status: 201 },
  );
}
