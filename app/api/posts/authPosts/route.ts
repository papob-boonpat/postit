import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Please sign in" }, { status: 401 });

  try {
    const data = await prisma.user.findUnique({
      where: {
        email: session.user?.email || undefined,
      },
      include: {
        Post: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            Comment: true,
          },
        },
      },
    });

    return NextResponse.json(data);
  } catch (err) {}
}
