"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type User = {
  image: string;
};
const Logged = ({ image }: User) => {
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={() => {
          signOut();
        }}
        className="text-white bg-gray-500 text-sm px-6 py-2 rounded-xl"
      >
        Sign out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={64}
          height={64}
          className="w-14 rounded-full"
          src={image}
          alt="user"
          priority
        ></Image>
      </Link>
    </li>
  );
};

export default Logged;
