"use client";

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type ListingCardProps = {
  data: Listing;
  currenUser?: User | null;
  reservation?: Reservation;
  actionLabel?: string;
  onAction?: (id: string) => void;
  actionId?: string;
  disabled?: boolean;
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currenUser,
  reservation,
  actionLabel,
  onAction,
  actionId = "",
  disabled,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, []);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")}-${format(end, "PP")}`;
  }, [reservation]);
  return (
    <div
      onClick={() => router.push(`/api/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full ">
        <div className="aspect-square  w-full  relative overflow-hidden rounded-xl">
          <Image
            height="150"
            width="150"
            src={data.imageSrc}
            alt="listing"
            className="object-cover group-hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
