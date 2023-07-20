import useCountries from "@/app/hooks/useCountries";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";

const Map = dynamic(() => import("../Map"), { ssr: false });

type ListingInfoProps = {
  discription: string;
  roomCount: number;
  guestCount: number;
  bathroomCout: number;
  locationValue: string;
  user: SafeUser | null;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
};

const ListingInfo: React.FC<ListingInfoProps> = ({
  discription,
  roomCount,
  bathroomCout,
  guestCount,
  locationValue,
  category,
  user,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500 ">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCout} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-ligth text-neutral-500">{discription}</div>
      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
