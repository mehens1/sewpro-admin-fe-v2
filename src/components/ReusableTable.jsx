import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ReusableTable = ({
  columns,
  data = [],
  tableProps = {},
  defaultPage = 1,    // human-readable default page number
  defaultRows = 10    // default rows per page
}) => {
  // PrimeReact pagination is zero-based
  const [first, setFirst] = useState((defaultPage - 1) * defaultRows);
  const [rows, setRows] = useState(defaultRows);
  const [page, setPage] = useState(defaultPage);

  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
    setPage(e.page + 1);
  };

  return (
    <div>
      <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <DataTable
          value={data}
          emptyMessage="No records found"
          paginator
          rows={rows}
          first={first}
          onPage={onPageChange}
          rowsPerPageOptions={[10, 20, 25, 50]}   // 🔹 Dropdown options
          sortMode="multiple"
          showGridlines
          className="custom-table [&_.p-sortable-column-icon]:text-white  
           [&_.p-paginator_.p-dropdown]:align-middle 
           [&_.p-paginator_.p-dropdown]:h-9"
          {...tableProps}
        >
          {columns.map((col, i) => (
            <Column
              key={i}
              field={col.field}
              header={col.header}
              sortable={col.sortable}
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                ...(col.style || {}),
              }}
              headerClassName="text-white"
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default ReusableTable;
