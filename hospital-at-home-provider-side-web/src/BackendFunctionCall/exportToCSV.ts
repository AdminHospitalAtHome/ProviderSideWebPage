export function exportToCsv(data: any[][] | null, columnHeaders: string[], filename = 'data.csv') {
    if (!data) {
        console.error('No data available for export.');
        return;
    }

    const csvHeader = columnHeaders.join(',') + '\r\n';

    const csvRows = data.map(row =>
        row.map(cell =>
            typeof cell === 'string' ? cell.replace(/\n/g, ' ') : cell
        ).join(',')
    ).join('\r\n');

    const csvString = csvHeader + csvRows;

    const blob = new Blob([csvString], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
