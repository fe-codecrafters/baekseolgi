import { NextRequest, NextResponse } from "next/server";
import { Objective } from "@prisma/client";
import prisma from "@/app/api/_base";
const { objective } = prisma;

/**
 * @swagger
 * /attendance/{id}:
 *  get:
 *    summary: Get attendance for a specific id
 *    parameters:
 *      - name: date
 *        in: path
 *        description: attendance ID
 *        required: true
 *        schema:
 *          type: int64
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
  { params }: { params: { id: string } },
) {
  console.log(params);
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
  } catch (e) {
    console.error("/objective/{id} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({ data: newObjective });
}

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

  const { title, createdAt, description, finishedAt, failedAt } =
    (await request.json()) as {
      title: string;
      description?: string;
      createdAt: string;
      finishedAt?: string;
      failedAt?: string;
    };

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
  return NextResponse.json({ data: updated });
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

  try {
    await objective.delete({
      where: { id },
    });
  } catch (e) {
    console.error("DELETE /objective/{id} Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
