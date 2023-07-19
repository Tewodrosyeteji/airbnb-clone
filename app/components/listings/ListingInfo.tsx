import useCountries from "@/app/hooks/useCountries";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

type ListingInfoProps = {
  discription: string;
  roomCount: number;
  guestCount: number;
  bathroomCout: number;
  locationValue: string;
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
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        {/* user and user avater mising missing  */}
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
