import Image from "next/image";
import Link from "next/link";
import React from "react";

const links = [
  {
    label: "ホーム",
    path: "/",
  },
  {
    label: "記事検索",
    path: "/search",
  },
  {
    label: "設定",
    path: "/settings",
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-100 border-t py-10 mt-10">
      <div className="container">
        <div className="mb-6">
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
        </div>
        <div>
          <h2 className="mb-3 text-slate-600">メニュー</h2>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link legacyBehavior href={link.path}>
                  <a className="hover:text-blue-500">{link.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-slate-500">© 2023 nino.</p>
      </div>
    </footer>
  );
};

export default Footer;
