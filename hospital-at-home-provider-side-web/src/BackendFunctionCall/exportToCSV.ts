export function exportToCsv(data: any[][] | null, columnHeaders: string[], filename = 'data.csv') {
    // Check if data is null
    if (!data) {
        console.error('No data available for export.');
        // Optionally, handle this case with user feedback or other logic
        return;
    }

    // Convert array of column names to a CSV string
    const csvHeader = columnHeaders.join(',') + '\r\n';

    // Convert 2D array data to CSV string
    // Replace \n in each cell with a space
    const csvRows = data.map(row =>
        row.map(cell =>
            typeof cell === 'string' ? cell.replace(/\n/g, ' ') : cell
        ).join(',')
    ).join('\r\n');

    // Combine header and rows
    const csvString = csvHeader + csvRows;

    // Create a Blob from the CSV String
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Create an anchor element and trigger a download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); // Append the anchor to body
    a.click();
    document.body.removeChild(a); // Clean up
    window.URL.revokeObjectURL(url);
}
