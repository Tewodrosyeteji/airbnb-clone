"use client";
import useCountries from "@/app/hooks/useCountries";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

type ListingCardProps = {
  data: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation;
  actionLabel?: string;
  onAction?: (id: string) => void;
  actionId?: string;
  disabled?: boolean;
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
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
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col w-full gap-2  ">
        <div className="aspect-square  w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="listing"
            className="object-cover w-full h-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="font-semibold ">
          $ {price} {!reservation && <span className="font-light"> night</span>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
