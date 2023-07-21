"use client";

import { useCallback, useState } from "react";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "../components/Container";

type ReservationClientProps = {
  currentUser: SafeUser | null;
  reservations: SafeReservation[];
};

const ReservationClient: React.FC<ReservationClientProps> = ({
  currentUser,
  reservations,
}) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("our reservaion is taken");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your reservations" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            actionLabel="Cancel guest reservaions"
            onAction={onCancel}
            currentUser={currentUser}
            disabled={deletingId === reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
