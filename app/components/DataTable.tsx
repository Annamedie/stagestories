interface TableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
  actions?: (row: T) => React.ReactNode;
}

function DataTable<T>({ data, columns, actions }: TableProps<T>) {
  return (
    <table className="text-gray-800 bg-white border-collapse w-full mt-4  rounded-lg">
      <thead>
        <tr className="bg-card1">
          {columns.map((column) => (
            <th
              key={column.accessor as string}
              className="border-b border-gray-300 p-4 text-left text-sm font-bold"
            >
              {column.header}
            </th>
          ))}
          {actions && (
            <th className="border-b border-gray-300 p-4 text-left text-sm font-bold">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={rowIndex % 2 === 0 ? "bg-white" : "bg-primary"}
          >
            {columns.map((column) => (
              <td
                key={column.accessor as string}
                className="border-b border-gray-300 p-4 text-base font-medium"
              >
                {String(row[column.accessor])}
              </td>
            ))}
            {actions && (
              <td className="border-b border-gray-300 p-4 text-sm">
                {actions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default DataTable;
