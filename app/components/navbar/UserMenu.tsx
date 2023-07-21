"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterationModal from "@/app/hooks/useRegisterationModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterationModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const toggled = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block py-3 px-4 rounded-full hover:bg-neutral-100 text-sm font-semibold transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          className="flex items-center gap-3 border-[1px] border-neutral-200 rounded-full md:py-1 md:px-2 p-2 hover:shadow-md transition cursor-pointer "
          onClick={toggled}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-12 right-0 text-sm rounded-xl shadow-md bg-white w-[40vw] md:w-3/4">
          <div className="flex flex-col">
            {currentUser ? (
              <>
                <MenuItem
                  lable="My trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  lable="My favorites"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  lable="My reservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem lable="My properites" onClick={() => {}} />
                <MenuItem lable="Airbnb my home" onClick={onRent} />
                <MenuItem lable="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem lable="Login" onClick={loginModal.onOpen} />
                <MenuItem lable="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
