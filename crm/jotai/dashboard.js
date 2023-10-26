import { atom } from "jotai";
import { CalendarIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

export const sideBarNav = atom([
  {
    name: "dashboard",
    href: "/platform/dashboard",
    icon: HomeIcon,
    current: true,
  },
  { name: "client", href: "/platform/client", icon: UsersIcon, current: false },
  {
    name: "calender",
    href: "/platform/calender",
    icon: CalendarIcon,
    current: false,
  },
]);

export const currentSideBarNav = atom("");

export const sideBarOpen = atom(false);
