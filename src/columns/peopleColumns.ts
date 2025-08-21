import type { ColumnDef}  from "@tanstack/react-table";

import type { Person } from "../data/people";

export const peopleColumns: ColumnDef<Person>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "city", header: "City" },
];



