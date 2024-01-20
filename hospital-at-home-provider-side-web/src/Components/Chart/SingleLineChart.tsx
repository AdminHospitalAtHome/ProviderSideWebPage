import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

type SingleLineChartProps = {
    data: any[][] | null;
};

const SingleLineChart: React.FC<SingleLineChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current?.getContext('2d');
        if (ctx && data) {
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.map(d => d[0]),
                    datasets: [{
                        label: 'Heart Rate',
                        data: data.map(d => d[1]),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    // Add your options here
                }
            });
        }

        return () => {
            chartInstance.current?.destroy();
        };
    }, [data]);

    return (
        <canvas ref={chartRef}></canvas>
    );
};

export default SingleLineChart;
