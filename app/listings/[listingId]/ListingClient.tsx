"use client";

import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useMemo } from "react";

type ListingClientProps = {
  listing: Listing;
  currentUser?: User | null;
  reservation?: Reservation[];
};

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservation,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="grid grid-col-1 md:grid-col-7 md:gap-10 mt-6">
          <ListingInfo
            category={category}
            discription={listing.description}
            roomCount={listing.roomCount}
            bathroomCout={listing.bathroomCount}
            guestCount={listing.guestCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
