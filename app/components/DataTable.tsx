import React from "react";

interface TableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
  actions?: (row: T) => React.ReactNode;
}

function DataTable<T>({ data, columns, actions }: TableProps<T>) {
  return (
    <table className="text-white border-collapse w-full mt-4">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.accessor as string}
              className="border-b border-white p-2 text-left"
            >
              {column.header}
            </th>
          ))}
          {actions && (
            <th className="border-b border-white p-2 text-left">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td
                key={column.accessor as string}
                className="border-b border-white p-2"
              >
                {String(row[column.accessor])}
              </td>
            ))}
            {actions && (
              <td className="border-b border-white p-2">{actions(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default DataTable;
