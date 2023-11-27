import { NextRequest, NextResponse } from "next/server";
import { Objective } from "@prisma/client";
import prisma from "@/app/api/_base";
import {
  UpdateObjectiveReqDTO,
  UpdateObjectiveResDTO,
} from "@/features/objective/types/updateObjective.dto";
import { DeleteObjectiveResDTO } from "@/features/objective/types/deleteObjective.dto";
const { objective } = prisma;
import { _GET } from "./get";

export const GET = _GET;

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json(
      { error: "Bad request: check your path param" },
      { status: 400 },
    );
  }

  const {
    title,
    createdAt,
    description,
    finishedAt,
    failedAt,
  }: UpdateObjectiveReqDTO = await request.json();

  let updated;

  try {
    updated = await objective.update({
      where: { id },
      data: {
        title,
        description,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        finishedAt,
        failedAt,
      },
    });
  } catch (e) {
    console.error("PUT /objective/{id} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  return NextResponse.json<UpdateObjectiveResDTO>({ data: updated });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json(
      { error: "Bad request: check your path param" },
      { status: 400 },
    );
  }

  let deleted: Objective;
  try {
    deleted = await objective.delete({
      where: { id },
    });
  } catch (e) {
    console.error("DELETE /objective/{id} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json<DeleteObjectiveResDTO>(
    { data: { id: deleted.id } },
    { status: 404 },
  );
}
