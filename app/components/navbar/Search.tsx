"use client";

import { BiSearch } from "react-icons/bi";

type Props = {};

const Search = (props: Props) => {
  return (
    <div className="w-full border-[1px] py-2 rounded-full shadow-sm cursor-pointer transition hover:shadow-md md:w-auto ">
      <div className="flex items-center justify-between ">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center ">
          Any Week
        </div>
        <div className="text-sm text-gray-600 pl-6 pr-2 flex items-center gap-3">
          <div className="hidden sm:block">Add guest</div>
          <div className="p-2 rounded-full text-white bg-rose-500 ">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
