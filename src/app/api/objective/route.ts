import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/_base";
const { objective } = prisma;

export async function POST(request: NextRequest) {
  // TODO: need type
  const { userId, title, createdAt, description, finishedAt, failedAt } =
    (await request.json()) as {
      userId: number;
      objectiveId: number;
      title: string;
      description?: string;
      createdAt: string;
      finishedAt?: string;
      failedAt?: string;
    };

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

  return NextResponse.json({ data: created }, { status: 201 });
}
