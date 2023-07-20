import Heading from "../Heading";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { SafeUser } from "@/app/types";

type ListingHeadProps = {
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
  id: string;
};

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  currentUser,
  id,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region},${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          fill
          alt="image"
          src={imageSrc}
          className="object-cover w-fll "
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
