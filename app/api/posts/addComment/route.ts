import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Please sign in to make posy" },
      { status: 401 }
    );

  const prismaUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email || undefined,
    },
  });

  const { title, postId }: { title: string; postId: string } =
    await request.json();

  if (title.length > 300)
    return NextResponse.json(
      { message: "Please write a shorter post" },
      { status: 403 }
    );
  console.log("enter here");
  if (!title.length)
    return NextResponse.json(
      { message: "Please enter something" },
      { status: 401 }
    );

  if (!prismaUser)
    return NextResponse.json(
      { message: "Could not get user" },
      { status: 403 }
    );

  try {
    console.log("enter here");

    const result = await prisma.comment.create({
      data: {
        message: title,
        userId: prismaUser.id,
        postId,
      },
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Error has occured while add a comment" },
      { status: 403 }
    );
  }
}
