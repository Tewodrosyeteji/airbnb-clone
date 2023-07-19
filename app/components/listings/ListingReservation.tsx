import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

type ListingReservationProps = {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  disabled?: boolean;
  disabledDates: Date[];
  onSubmit: () => void;
};

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  disabledDates,
  disabled,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-lg border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="font-simbold text-2xl">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDates={disabledDates}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>{totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
