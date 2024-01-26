import {
  UpdateUserReqDTO,
  UpdateUserResDTO,
} from "@/features/user/types/updateUser.dto";
import prisma from "@/app/api/_base";
import { NextRequest, NextResponse } from "next/server";
const { user } = prisma;

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { username }: UpdateUserReqDTO = await request.json();

  const updated = await user.update({
    where: {
      id: Number(params.id),
    },
    data: {
      username: username,
    },
  });

  if (!updated) {
    console.log("PUT /user Error: ");
  }

  return NextResponse.json<UpdateUserResDTO>({
    data: updated,
  });
}
