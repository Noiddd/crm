"use client";

import { Input } from "@/components/ui/input";

export function FilterDataTable({ table }) {
  return (
    <Input
      placeholder="Filter emails..."
      value={table.getColumn("email")?.getFilterValue() ?? ""}
      onChange={(event) =>
        table.getColumn("email")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );
}
