import prisma from "@/app/libs/prismadb";

interface IListingsParams {
  userId?: string;
  guestCount?: number;
  bathroomCount?: number;
  roomCount?: number;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}

export default async function getListing(params: IListingsParams) {
  try {
    const {
      locationValue,
      startDate,
      endDate,
      guestCount,
      bathroomCount,
      roomCount,
    } = params;
    const query: any = {};

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (bathroomCount) {
      query.bathroomCount = +bathroomCount;
    }
    if (roomCount) {
      query.roomCount = +roomCount;
    }

    if (guestCount) {
      query.guestCount = +guestCount;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservation: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
