import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserMenu from "./user-menu";
import { useAuth } from "../context/auth";
import Button from "./button";
import { login } from "../lib/auth";
import Sidebar from "./sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  if (isLoading) {
    return null;
  }

  const closeModal = () => {
    setSidebarOpen(false);
  };

  const openModal = () => {
    setSidebarOpen(true);
  };

  return (
    <>
      <header>
        <div className="flex items-center h-14 border-b container">
          <button className="p-2 mr-1" onClick={openModal}>
            <Bars3Icon className="w-6 h-6" />
          </button>
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
          )}
        </div>
        <Sidebar isOpen={isSidebarOpen} closeModal={closeModal} />
      </header>
    </>
  );
};

export default Header;
