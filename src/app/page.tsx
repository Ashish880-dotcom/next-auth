"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const page = () => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col gap-10 h-screen items-center justify-center">
      {session?.user?.image && (
        <Image
          alt="profile image"
          src={session.user.image!}
          height={100}
          width={100}
          className="h-10 w-10 object-contain rounded-sm"
        />
      )}
      {session?.user?.name} <br />
      {session?.user?.email}
      {status === "unauthenticated" && (
        <button
          className="bg-black text-white px-8 py-4 rounded-sm cursor-pointer"
          onClick={() => signIn("google")}
        >
          Login With Google
        </button>
      )}
      {status === "authenticated" && (
        <button
          className="bg-black text-white px-8 py-4 rounded-sm cursor-pointer"
          onClick={() => signOut()}
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default page;
