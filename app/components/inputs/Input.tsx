import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type InputProps = {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  type?: string;
  formatPrice?: boolean;
  errors: FieldErrors;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  type = "text",
  formatPrice,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute top-5 left-2 text-neutral-700"
        />
      )}
      <input
        id={id}
        {...register(id, { required })}
        disabled={disabled}
        type={type}
        placeholder=" "
        className={`peer w-full p-4 pt-6 bg-white border-2 rounded-md font-light transition disabled:cursor-not-allowed  disabled:opacity-70 outline-none
        ${formatPrice ? "py-9" : "py-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`}
      />
      <label
        className={`
            absolute
            top-5
            text-md
            duration-150
            transform
            -translate-y-3
            origin-[0]
            z-10
            ${formatPrice ? "left-9" : "left-4"}
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? "text-rose-500" : "text-znic-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
