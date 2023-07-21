"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

type ReservationClientProps = {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
};

const ReservationsClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeleteingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("reservation taken");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeleteingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your reservations" />

      <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            actionLabel="Cancel reservations"
            onAction={onCancel}
            disabled={deletingId === reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
