"use client";

import { IconType } from "react-icons/lib";

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 rounded-lg w-full transiton
      ${outline ? "bg-white" : "bg-rose-500"}
      ${outline ? "border-black" : "border-rose-500"}
      ${outline ? "text-black" : "text-white"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "py-1" : "py-3"}
      ${small ? "border-[1px]" : "border-[2px]"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={24} className="absolute top-3 left-10" />}
      {label}
    </button>
  );
};

export default Button;
