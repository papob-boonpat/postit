import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { details: string } }
) {
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: context.params.details,
      },
      include: {
        user: true,
        Comment: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Error has occured while making a post" },
      { status: 403 }
    );
  }
}
