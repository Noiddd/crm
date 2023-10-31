"use client";

import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import DataTable from "@/components/client/DataTable";

import { useState } from "react";

import Pagination from "@/components/client/Pagination";
import { FilterDataTable } from "@/components/client/FilterDataTable";
import VisibilityDataTable from "@/components/client/VisibilityDataTable";
import SelectedDataTable from "@/components/client/SelectedDataTable";

import { clientData } from "./clientData";
import { columnData } from "./collumnData";

export default function ClientView() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  // remove when working on fetchig data
  const [data, setData] = useState(clientData);
  const [columns, setColumns] = useState(columnData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // pagination
    onSortingChange: setSorting, // sorting
    getSortedRowModel: getSortedRowModel(), // sorting
    onColumnFiltersChange: setColumnFilters, // filter
    getFilteredRowModel: getFilteredRowModel(), // filter
    onColumnVisibilityChange: setColumnVisibility, // visibility
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
      <div className="flex items-center py-2">
        <FilterDataTable table={table} />
        <VisibilityDataTable table={table} />
      </div>

      <DataTable table={table} columns={columns} />

      <div className="flex items-start pt-2">
        <SelectedDataTable table={table} />
        <Pagination table={table} />
      </div>
    </div>
  );
}
