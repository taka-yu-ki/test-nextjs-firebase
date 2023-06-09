import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserMenu from "./user-menu";
import { useAuth } from "../context/auth";
import Button from "./button";
import { login } from "../lib/auth";

const Header = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <header>
      <div className="flex items-center h-14 border-b container">
        <Link legacyBehavior href="/">
          <a className="flex">
            <Image
              src="/logoipsum-265.svg"
              width={168}
              height={41}
              alt="Logoipsum"
            />
          </a>
        </Link>
        <span className="flex-1"></span>
        {user ? (
          <UserMenu />
        ) : (
          <Button type="button" onClick={login}>
            ログイン
          </Button>
          //   <Link legacyBehavior href="/login">
          //     <a>ログイン</a>
          //   </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
