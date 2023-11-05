import { Seolgi } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/api/_base";
import { GetSeolgiResDTO } from "@/features/seolgi/types/getSeolgi.dto";

const { seolgi } = prisma;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const seolgiName = searchParams.get("seolgi-name");
  if (!seolgiName) {
    return NextResponse.json(
      { error: "Bad request: check your param" },
      { status: 400 },
    );
  }

  let seolgis: Seolgi[] | null;

  try {
    seolgis = await seolgi.findMany({
      where: {
        name: {
          startsWith: seolgiName,
        },
      },
    });

    if (!seolgis || seolgis.length === 0) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
  } catch (e) {
    console.error("/seolgi Error: ", e);
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json<GetSeolgiResDTO>({ data: seolgis });
}
