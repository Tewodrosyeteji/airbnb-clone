"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
type Props = {};

const Logo = (props: Props) => {
  const router = useRouter();
  return (
    <Image
      onClick={() => {}}
      alt=" logo"
      src="/images/logo.png"
      height="100"
      width="100"
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;
