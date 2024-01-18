import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

interface DoubleLineChartProps {
    labels: string[];
    data1: number[];
    label1: string;
    data2: number[];
    label2: string;
}

const DoubleLineChart: React.FC<DoubleLineChartProps> = ({ labels, data1, label1, data2, label2 }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            // Destroy the previous instance if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx!, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: label1,
                            data: data1,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        },
                        {
                            label: label2,
                            data: data2,
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

        // Cleanup function to destroy chart instance on unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [labels, data1, label1, data2, label2]);

    return <canvas ref={chartRef} />;
};

export default DoubleLineChart;
