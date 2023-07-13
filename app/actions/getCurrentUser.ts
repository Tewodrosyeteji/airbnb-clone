import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currenUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currenUser) {
      return null;
    }
    return currenUser;
  } catch (error: any) {
    return null;
  }
}
