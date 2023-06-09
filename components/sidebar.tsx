import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

const links = [
  {
    label: "ホーム",
    href: "/",
  },
  {
    label: "検索",
    href: "/search",
  },
  {
    label: "このサイトについて",
    href: "/about",
  },
];

const subItems = [
  {
    label: "会社概要",
    href: "/company",
  },
  {
    label: "利用規約",
    href: "/terms",
  },
  {
    label: "プライバシー",
    href: "/privacy",
  },
  {
    label: "サポート",
    href: "/support",
  },
  {
    label: "お問い合わせ",
    href: "/contact",
  },
  {
    label: "ヘルプ",
    href: "/help",
  },
];

const Sidebar = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: VoidFunction;
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
          >
            <Dialog.Panel className="w-80 overflow-y-auto fixed left-0 inset-y-0 bg-white p-6 z-20">
              <Link legacyBehavior href="/">
                <a className="flex mb-6">
                  <Image
                    src="/logoipsum-265.svg"
                    width={168}
                    height={41}
                    alt="Logoipsum"
                  />
                </a>
              </Link>
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item.label}>
                    <Link legacyBehavior href={item.href}>
                      <a className="py-1 block hover:text-blue-500">
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className="my-6" />
              <ul className="space-y-2">
                {subItems.map((item) => (
                  <li key={item.label}>
                    <Link legacyBehavior href={item.href}>
                      <a className="text-slate-600">{item.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-slate-400">© 2023 nino.</p>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default Sidebar;
