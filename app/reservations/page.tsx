import { getCurrentUser } from "@/app/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";

const reservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="No resrvaiont found"
          subtitle="Looks like you've no reservation in your properties"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
};

export default reservationsPage;
