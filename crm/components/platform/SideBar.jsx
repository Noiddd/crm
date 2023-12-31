"use client";

import React, { useEffect } from "react";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useAtom } from "jotai";
import { currentSideBarNav, sideBarOpen } from "../../jotai/dashboard";

import SideBarWeb from "../../components/platform/SideBarWeb";
import SideBarMobile from "../../components/platform/SideBarMobile";
import SideBarMobileHeader from "../../components/platform/SideBarMobileHeader";
import { useParams } from "next/navigation";

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useAtom(sideBarOpen);

  const [jotaiCurrentSideBarNav, setJotaiCurrentSideBarNav] =
    useAtom(currentSideBarNav);

  const params = useParams();

  useEffect(() => {
    setJotaiCurrentSideBarNav(params.view);
  }, [params.view]);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-[224px] flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                {/* Sidebar component for mobile view */}
                <SideBarMobile
                  jotaiCurrentSideBarNav={jotaiCurrentSideBarNav}
                  setJotaiCurrentSideBarNav={setJotaiCurrentSideBarNav}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <SideBarWeb
        jotaiCurrentSideBarNav={jotaiCurrentSideBarNav}
        setJotaiCurrentSideBarNav={setJotaiCurrentSideBarNav}
      />

      {/* Header component for mobile view */}
      <SideBarMobileHeader />
    </>
  );
}
