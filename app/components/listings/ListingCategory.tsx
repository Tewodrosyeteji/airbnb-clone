import { IconType } from "react-icons";

type ListingCategoryProps = {
  label: string;
  icon: IconType;
  description: string;
};

const ListingCategory: React.FC<ListingCategoryProps> = ({
  label,
  icon: Icon,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="font-semibold text-lg"> {label}</div>
          <div className="font-light text-neutral-500">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
