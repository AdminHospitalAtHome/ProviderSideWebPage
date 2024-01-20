import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

interface DoubleLineChartProps {
    data: any[][] | null;
    label1: string;
    label2: string;
}

const DoubleLineChart: React.FC<DoubleLineChartProps> = ({data, label1, label2}) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
            // Destroy the previous instance if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current?.getContext('2d');
        if (ctx && data) {
            chartInstance.current = new Chart(ctx!, {
                type: 'line',
                data: {
                    labels: data.map(d => d[0]),
                    datasets: [
                        {
                            label: label1,
                            data: data.map(d => d[1]),
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: label2,
                            data: data.map(d => d[2]),
                            fill: false,
                            borderColor: 'rgb(255, 99, 132)',
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default DoubleLineChart;
