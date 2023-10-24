"use client";

import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import DataTable from "@/components/client/DataTable";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "@/components/client/Pagination";
import { useState } from "react";

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "netWorth",
    header: () => <div className="text-right">Net Worth</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("netWorth"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const data = [
  {
    name: "Dion Ang",
    status: "New Lead",
    email: "dionang@gmail.com",
    netWorth: 10000,
  },
  {
    name: "John Toh",
    status: "Attempted to contact",
    email: "johntoh@gmail.com",
    netWorth: 57000,
  },
  {
    name: "Steven Lim",
    status: "Contacted",
    email: "stevenlim@gmail.com",
    netWorth: 5400,
  },
  {
    name: "Ryan Soh",
    status: "Qualified",
    email: "ryansoh@gmail.com",
    netWorth: 20550,
  },
  {
    name: "Lucy Hoh",
    status: "Unqualified",
    email: "lucyhoh@gmail.com",
    netWorth: 11500,
  },
  {
    name: "Lucy Hoh",
    status: "Unqualified",
    email: "lucyhoh@gmail.com",
    netWorth: 11500,
  },
  {
    name: "Lucy Hoh",
    status: "Unqualified",
    email: "lucyhoh@gmail.com",
    netWorth: 11500,
  },
  {
    name: "Lucy Hoh",
    status: "Unqualified",
    email: "lucyhoh@gmail.com",
    netWorth: 11500,
  },
  {
    name: "Lucy Hoh",
    status: "Unqualified",
    email: "lucyhoh@gmail.com",
    netWorth: 11500,
  },
  {
    name: "Lucy Hoh",
    status: "Unqualified",
    email: "lucyhoh@gmail.com",
    netWorth: 11500,
  },
  {
    name: "Lucy Hoh",
    status: "Unqualified",
    email: "lucyhoh@gmail.com",
    netWorth: 11500,
  },
  {
    name: "Lucy Hoh",
    status: "Unqualified",
    email: "lucyhoh@gmail.com",
    netWorth: 11500,
  },
];

export default function Client() {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <DataTable table={table} columns={columns} />
      <Pagination table={table} />
    </div>
  );
}

// import { useLayoutEffect, useRef, useState } from "react";

// const people = [
//   {
//     name: "Lindsay Walton",
//     status: "Front-end Developer",
//     email: "lindsay.walton@example.com",
//     role: "Member",
//   },
//   // More people...
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Client() {
//   const checkbox = useRef();
//   const [checked, setChecked] = useState(false);
//   const [indeterminate, setIndeterminate] = useState(false);
//   const [selectedPeople, setSelectedPeople] = useState([]);

//   useLayoutEffect(() => {
//     const isIndeterminate =
//       selectedPeople.length > 0 && selectedPeople.length < people.length;
//     setChecked(selectedPeople.length === people.length);
//     setIndeterminate(isIndeterminate);
//     checkbox.current.indeterminate = isIndeterminate;
//   }, [selectedPeople]);

//   function toggleAll() {
//     setSelectedPeople(checked || indeterminate ? [] : people);
//     setChecked(!checked && !indeterminate);
//     setIndeterminate(false);
//   }

//   return (
//     <div className="px-4 sm:px-6 lg:px-100">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-base font-semibold leading-6 text-gray-900">
//             Users
//           </h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A list of all the users in your account including their name, title,
//             email and role.
//           </p>
//         </div>
//         <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
//           <button
//             type="button"
//             className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Add user
//           </button>
//         </div>
//       </div>
//       <div className="mt-8 flow-root">
//         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//             <div className="relative">
//               {selectedPeople.length > 0 && (
//                 <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
//                   <button
//                     type="button"
//                     className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
//                   >
//                     Bulk edit
//                   </button>
//                   <button
//                     type="button"
//                     className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
//                   >
//                     Delete all
//                   </button>
//                 </div>
//               )}
//               <table className="min-w-full table-fixed divide-y divide-gray-300">
//                 <thead>
//                   <tr>
//                     <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
//                       <input
//                         type="checkbox"
//                         className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                         ref={checkbox}
//                         checked={checked}
//                         onChange={toggleAll}
//                       />
//                     </th>
//                     <th
//                       scope="col"
//                       className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Name
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Title
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Email
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Role
//                     </th>
//                     <th
//                       scope="col"
//                       className="relative py-3.5 pl-3 pr-4 sm:pr-3"
//                     >
//                       <span className="sr-only">Edit</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-white">
//                   {people.map((person) => (
//                     <tr
//                       key={person.email}
//                       className={
//                         selectedPeople.includes(person)
//                           ? "bg-gray-50"
//                           : undefined
//                       }
//                     >
//                       <td className="relative px-7 sm:w-12 sm:px-6">
//                         {selectedPeople.includes(person) && (
//                           <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
//                         )}
//                         <input
//                           type="checkbox"
//                           className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                           value={person.email}
//                           checked={selectedPeople.includes(person)}
//                           onChange={(e) =>
//                             setSelectedPeople(
//                               e.target.checked
//                                 ? [...selectedPeople, person]
//                                 : selectedPeople.filter((p) => p !== person)
//                             )
//                           }
//                         />
//                       </td>
//                       <td
//                         className={classNames(
//                           "whitespace-nowrap py-4 pr-3 text-sm font-medium",
//                           selectedPeople.includes(person)
//                             ? "text-indigo-600"
//                             : "text-gray-900"
//                         )}
//                       >
//                         {person.name}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                         {person.title}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                         {person.email}
//                       </td>
//                       <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                         {person.role}
//                       </td>
//                       <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
//                         <a
//                           href="#"
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           Edit<span className="sr-only">, {person.name}</span>
//                         </a>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
