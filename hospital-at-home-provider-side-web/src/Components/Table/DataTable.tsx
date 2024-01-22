// DataTable.tsx
import React from 'react';

type DataTableProps = {
    columns: string[];
    data: any[][] | null;
};

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
    // Check if data is null or empty
    const isDataEmpty = !data || data.length === 0;

    return (
        <table>
            <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {isDataEmpty ? (
                <tr>
                    <td colSpan={columns.length}>No data available</td>
                </tr>
            ) : (
                data!.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))
            )}
            </tbody>
        </table>
    );
};

export default DataTable;
