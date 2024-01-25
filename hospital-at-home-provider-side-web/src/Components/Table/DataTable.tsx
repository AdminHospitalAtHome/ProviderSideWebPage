import React from 'react';
import { useTable, Column, Cell, Row, HeaderGroup } from 'react-table';
import './DataTable.css';

interface DataTableProps {
  data: any[][] | null;
  columns: string[];
}

function DataTable({ data, columns }: DataTableProps) {

  const dataFormatted = React.useMemo(() => {
    if (!data) {
      return [];
    }

    return data.map(row => {
      let rowData: { [key: string]: string } = {};
      row.forEach((cell, index) => {
        // Convert every value to a string
        rowData[columns[index]] = typeof cell === 'boolean' ? (cell ? 'Yes' : 'No') : String(cell);
      });
      return rowData;
    });
  }, [data, columns]);

  const columnDefs: Column<any>[] = React.useMemo(() => {
    const columnHeaders: { [key: string]: string } = {
      'ifManualInput': 'If manual input',
    };
    
    return columns.map(col => ({
      Header: columnHeaders[col] || col,
      accessor: col,
    }));
  }, [columns]);

 

  const tableInstance = useTable<any>({ columns: columnDefs, data: dataFormatted });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<any>) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: HeaderGroup<any>) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: Row<any>) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: Cell<any>) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
