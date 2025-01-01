"use client";

import { useEffect, useRef, useState } from "react";

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
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalContent) {
      // Flytta fokus till modalen
      modalRef.current?.focus();

      // Lyssna på `Esc` för att stänga modalen
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setModalContent(null);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [modalContent]);

  if (data.length === 0) {
    return (
      <p className="text-white text-center m-4 text-lg">No data available.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="text-gray-800 bg-white border-collapse w-full mt-4 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={String(column.accessor)}
                scope="col"
                className="border-b border-gray-300 p-2 md:p-4 text-left text-xs md:text-sm font-bold"
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <>
                <th
                  scope="col"
                  className="border-b border-gray-300 p-2 md:p-4 text-left text-xs md:text-sm font-bold"
                >
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                tabIndex={0}
              >
                {columns.map((column) => {
                  const cellValue = String(row[column.accessor]);
                  const isLongText = column.isLongText;

                  return (
                    <td
                      key={String(column.accessor)}
                      className="border-b border-gray-300 p-2 md:p-4 text-xs md:text-base font-medium"
                    >
                      {isLongText && cellValue ? (
                        <>
                          {/* On small screens: Hide the text completely and only show the "Read" button */}
                          <div className="block md:hidden">
                            <button
                              onClick={() => setModalContent(cellValue)}
                              className="text-footerHeader underline text-sm mt-1 self-start"
                              aria-label={`Read full content of ${column.header}`}
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
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full"
          >
            <h2 id="modal-title" className="text-lg font-bold mb-4">
              Full Description
            </h2>
            <p id="modal-description" className="text-sm whitespace-pre-wrap">
              {modalContent}
            </p>
            <button
              onClick={() => setModalContent(null)}
              className="mt-4 bg-footerHeader text-white px-4 py-2 rounded-md focus:outline focus:outline-4 focus:outline-rose-700"
              aria-label="Close modal"
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
