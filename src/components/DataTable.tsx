import React from "react";
import type {ColumnDef,SortingState,} from "@tanstack/react-table";
import {
  
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  
  useReactTable,
} from "@tanstack/react-table";

export type DataTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  pageSize?: number;
  globalFilterPlaceholder?: string;
  className?: string;
};

export default function DataTable<T extends object>({
  data,
  columns,
  pageSize = 5,
  globalFilterPlaceholder = "Search...",
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
  });

  return (
    <div className={className}>
      
      <input
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder={globalFilterPlaceholder}
        style={{ border: "1px solid #ccc", padding: 8, marginBottom: 12, width: "100%" }}
      />

      
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      border: "1px solid #e5e7eb",
                      padding: "8px 10px",
                      background: "#52bbecff",
                      cursor: header.column.getCanSort() ? "pointer" : "default",
                      userSelect: "none",
                      textAlign: "left",
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}

                    <span style={{ marginLeft: 6 }}>
                      {header.column.getIsSorted() === "asc" ? "🔼" :
                       header.column.getIsSorted() === "desc" ? "🔽" : ""}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ border: "1px solid #e5e7eb", padding: "8px 10px" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={table.getAllColumns().length} style={{ padding: 12, textAlign: "center" }}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>⏮ First</button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>◀ Prev</button>
        <span>
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong>{table.getPageCount()}</strong>
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next ▶</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
          Last ⏭
        </button>

        <span style={{ marginLeft: "auto" }}>
          Rows per page:{" "}
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((ps) => (
              <option key={ps} value={ps}>{ps}</option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
}
