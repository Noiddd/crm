"use client";

import React, { useEffect } from "react";
import { useAtomValue } from "jotai";
import { sideBarNav } from "../../jotai/dashboard";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBarWeb({
  jotaiCurrentSideBarNav,
  setJotaiCurrentSideBarNav,
}) {
  const jotaiSideBarNav = useAtomValue(sideBarNav);

  console.log("INNN");
  console.log(jotaiSideBarNav);
  console.log(jotaiCurrentSideBarNav);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {jotaiSideBarNav.map((item) => (
                  <li
                    key={item.name}
                    onClick={() => {
                      if (item.name == jotaiCurrentSideBarNav) {
                        return;
                      }

                      setJotaiCurrentSideBarNav(item.name);
                    }}
                  >
                    <Link
                      href={item.href}
                      className={classNames(
                        item.name == jotaiCurrentSideBarNav
                          ? "bg-gray-50 text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 text-xs leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.name == jotaiCurrentSideBarNav
                            ? "text-indigo-600"
                            : "text-gray-400 group-hover:text-indigo-600",
                          "h-5 w-5 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name.charAt(0).toUpperCase() +
                        item.name.slice(1).toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="-mx-6 mt-auto">
              <a
                href="#"
                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
              >
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
