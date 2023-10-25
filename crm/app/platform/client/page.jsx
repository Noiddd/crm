"use client";

import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
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
import { Checkbox } from "@/components/ui/checkbox";

import Pagination from "@/components/client/Pagination";
import { useState } from "react";
import { FilterDataTable } from "@/components/client/FilterDataTable";
import VisibilityDataTable from "@/components/client/VisibilityDataTable";
import SelectedDataTable from "@/components/client/SelectedDataTable";

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <FilterDataTable table={table} />
        <VisibilityDataTable table={table} />
      </div>

      <DataTable table={table} columns={columns} />
      <div className="flex items-center py-4">
        <SelectedDataTable table={table} />
        <Pagination table={table} />
      </div>
    </div>
  );
}
