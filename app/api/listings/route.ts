import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    title,
    description,
    price,
    imageSrc,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      title,
      description,
      price: parseInt(price, 10),
      imageSrc,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
