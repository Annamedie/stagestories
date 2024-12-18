"use client";

import { useState } from "react";

interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  isLongText?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: (row: T) => React.ReactNode;
}

function DataTable<T>({ data, columns, actions }: TableProps<T>) {
  const [modalContent, setModalContent] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="text-gray-800 bg-white border-collapse w-full mt-4 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={String(column.accessor)}
                className="border-b border-gray-300 p-2 md:p-4 text-left text-xs md:text-sm font-bold"
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th className="border-b border-gray-300 p-2 md:p-4 text-left text-xs md:text-sm font-bold">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {columns.map((column) => {
                  const cellValue = String(row[column.accessor]);
                  const isLongText = column.isLongText;

                  return (
                    <td
                      key={String(column.accessor)}
                      className="border-b border-gray-300 p-2 md:p-4 text-xs md:text-base font-medium"
                    >
                      {isLongText ? (
                        <>
                          {/* On small screens: Hide the text completely and only show the "Read" button */}
                          <div className="block md:hidden">
                            <button
                              onClick={() => setModalContent(cellValue)}
                              className="text-footerHeader underline text-sm mt-1 self-start"
                            >
                              Read
                            </button>
                          </div>

                          {/* On larger screens (md and above): Show full text (no button) */}
                          <div className="hidden md:block whitespace-normal">
                            {cellValue}
                          </div>
                        </>
                      ) : (
                        cellValue
                      )}
                    </td>
                  );
                })}
                {actions && (
                  <td className="border-b border-gray-300 p-2 md:p-4 text-xs">
                    {actions(row)}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Full Description</h2>
            <p className="text-sm whitespace-pre-wrap">{modalContent}</p>
            <button
              onClick={() => setModalContent(null)}
              className="mt-4 bg-footerHeader text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
