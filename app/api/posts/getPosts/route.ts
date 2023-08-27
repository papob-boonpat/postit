import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request: Request) {
  //fetch all posts

  try {
    const result = await prisma.post.findMany({
      include: { user: true, Comment: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 403 }
    );
  }
}
