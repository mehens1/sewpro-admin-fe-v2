import React, { useState } from "react";

const Table = ({
  loading = false,
  data = [],
  columns = [],
  rowsPerPage = 5,
  statusClasses = {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const renderCell = (row, col) => {
    if (col.render) return col.render(row[col.accessor], row);
    return row[col.accessor];
  };

  if (loading) return <div className="p-4 text-center text-gray-600">Loading data...</div>;
  if (!data.length) return <div className="p-4 text-center text-gray-600">No data available.</div>;

  return (
    <div className="w-full max-w-full shadow-md rounded-lg">
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full table-auto border-collapse bg-white">
          <thead className="bg-green-600 text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-6 py-3 text-left text-sm font-medium whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentRows.map((row, idx) => (
              <tr key={row.id || idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-6 py-3 text-sm text-gray-700 align-middle whitespace-nowrap"
                  >
                    {col.accessor === "status" && statusClasses[row.status] ? (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[row.status]}`}
                      >
                        {renderCell(row, col)}
                      </span>
                    ) : (
                      renderCell(row, col)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages >= 1 && (
        <div className="flex justify-between items-center mt-4 px-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className=" text-white px-3 py-1 mb-3 bg-green-600 rounded hover:bg-red-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className=" text-white px-3 py-1 mb-3 bg-green-600 rounded hover:bg-red-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
