import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Please sign in" }, { status: 401 });

  try {
    const body = await request.json();
    const postId: string = body.id;
    const result = await prisma.post.delete({
      where: {
        id: postId,
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
