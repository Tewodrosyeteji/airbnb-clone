import { IconType } from "react-icons";

type CategoryInputProps = {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
};

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl p-4 border-2 hover:border-black flex flex-col gap-3 transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
