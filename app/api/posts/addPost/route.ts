import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Please sign in to make posy" },
      { status: 401 }
    );
  const body = await request.json();
  const title: string = body.title;

  //Get User
  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user?.email || undefined },
  });

  if (title.length > 300)
    return NextResponse.json(
      { message: "Please write a shorter post" },
      { status: 403 }
    );
  if (!title.length)
    return NextResponse.json(
      { message: "Please do not leave this empty" },
      { status: 403 }
    );
  if (!prismaUser)
    return NextResponse.json(
      { message: "Could not get user" },
      { status: 403 }
    );
  //create post
  try {
    const result = await prisma.post.create({
      data: {
        title,
        userId: prismaUser.id,
      },
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Error has occured while making a post" },
      { status: 403 }
    );
  }
}
